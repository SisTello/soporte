import { useMemo, useState, type FormEvent } from 'react';
import { strToU8, zipSync } from 'fflate';

import { activos } from '../../datos/activos';
import type { AssetFormState, AssetRecord, AssetState, AssetStatus } from '../../types/activos';
import AssetDetailModal from './AssetDetailModal';

import './TablaActivos.scss';

const normalizeText = (value: string | number | null | undefined, fallback = ''): string =>
  String(value ?? fallback).trim();

type AssetExportKey =
  | 'codigo'
  | 'numeroInventarioContable'
  | 'categoria'
  | 'fabricante'
  | 'sucursal'
  | 'departamento'
  | 'ubicacion'
  | 'estado';

interface AssetExportColumn {
  header: string;
  key: AssetExportKey;
  width: number;
}

const escapeXml = (value: string): string =>
  value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const excelColumnName = (columnIndex: number): string => {
  let index = columnIndex + 1;
  let name = '';

  while (index > 0) {
    const remainder = (index - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    index = Math.floor((index - 1) / 26);
  }

  return name;
};

const createExcelWorkbook = (
  columns: AssetExportColumn[],
  rows: Array<Record<AssetExportKey, string>>
): Uint8Array => {
  const worksheetRows = [columns.map((column) => column.header), ...rows.map((row) =>
    columns.map((column) => row[column.key])
  )];
  const lastCell = `${excelColumnName(columns.length - 1)}${worksheetRows.length}`;
  const rowXml = worksheetRows.map((cells, rowIndex) => {
    const rowNumber = rowIndex + 1;
    const cellsXml = cells.map((value, columnIndex) => {
      const reference = `${excelColumnName(columnIndex)}${rowNumber}`;
      const headerStyle = rowNumber === 1 ? ' s="1"' : '';
      return `<c r="${reference}"${headerStyle} t="inlineStr"><is><t xml:space="preserve">${escapeXml(value)}</t></is></c>`;
    }).join('');

    return `<row r="${rowNumber}">${cellsXml}</row>`;
  }).join('');
  const columnXml = columns.map((column, index) =>
    `<col min="${index + 1}" max="${index + 1}" width="${column.width}" customWidth="1"/>`
  ).join('');

  const files = {
    '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`,
    '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
    'xl/workbook.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Inventario" sheetId="1" r:id="rId1"/></sheets></workbook>`,
    'xl/_rels/workbook.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
    'xl/styles.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF073B5C"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`,
    'xl/worksheets/sheet1.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="A1:${lastCell}"/><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="18"/><cols>${columnXml}</cols><sheetData>${rowXml}</sheetData><autoFilter ref="A1:${excelColumnName(columns.length - 1)}1"/></worksheet>`,
  };

  return zipSync(
    Object.fromEntries(Object.entries(files).map(([path, content]) => [path, strToU8(content)]))
  );
};

const createDefaultAssetForm = (categoria: string): AssetFormState => ({
  codigo: '',
  numeroInventarioContable: '',
  categoria,
  fabricante: '',
  marca: '',
  serie: '',
  sucursal: 'Sucursal Central',
  departamento: 'Tecnología',
  ubicacion: '',
  detalle: '',
  estado: 'Operativo',
  observacion: '',
});

const normalizeAssetState = (value: string | undefined): AssetState => {
  if (value === 'En mantenimiento' || value === 'Fuera de servicio') {
    return value;
  }

  return 'Operativo';
};

const toAssetRecord = (item: Partial<AssetRecord> | undefined, index: number): AssetRecord => ({
  id: Number(item?.id ?? index + 1),
  codigo: normalizeText(item?.codigo, `ACT-${index + 1}`),
  numeroInventarioContable: normalizeText(item?.numeroInventarioContable, `INV-${String(index + 1).padStart(4, '0')}`),
  nombre: normalizeText(item?.nombre, 'Activo sin nombre'),
  categoria: normalizeText(item?.categoria, 'Sin categoría'),
  fabricante: normalizeText(item?.fabricante, 'Sin fabricante'),
  marca: normalizeText(item?.marca, 'Sin marca'),
  serie: normalizeText(item?.serie, 'Sin serie'),
  estado: normalizeAssetState(item?.estado),
  responsable: normalizeText(item?.responsable, 'Sin responsable'),
  departamento: normalizeText(item?.departamento, 'Tecnología'),
  sucursal: normalizeText(item?.sucursal, 'Sucursal Central'),
  ubicacion: normalizeText(item?.ubicacion, 'No especificado'),
  detalle: normalizeText(item?.detalle, 'Detalle no registrado'),
  observacion: normalizeText(item?.observacion, 'Sin observación'),
  fechaAdquisicion: normalizeText(item?.fechaAdquisicion, new Date().toLocaleDateString('es-MX')),
});

interface TablaActivosProps {
  titulo: string;
  descripcion: string;
  categoria?: string | null;
  datos?: AssetRecord[];
}

const TablaActivos = ({
  titulo,
  descripcion,
  categoria = null,
  datos = activos as AssetRecord[],
}: TablaActivosProps) => {
  const [busqueda, setBusqueda] = useState('');
  const [estado, setEstado] = useState<AssetStatus>('Todos');
  const [sucursal, setSucursal] = useState('Todas');
  const [categoriaFiltro, setCategoriaFiltro] = useState(categoria ?? 'Todas');
  const [selectedAsset, setSelectedAsset] = useState<AssetRecord | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [exportError, setExportError] = useState('');
  const [localAssets, setLocalAssets] = useState<AssetRecord[]>([]);
  const [form, setForm] = useState<AssetFormState>(() => createDefaultAssetForm(categoria ?? 'Computadora'));

  const normalizedDatos = useMemo(
    () => (Array.isArray(datos) ? datos.map((item, index) => toAssetRecord(item, index)) : []),
    [datos]
  );

  const allAssets = useMemo(
    () => [...localAssets, ...normalizedDatos],
    [localAssets, normalizedDatos]
  );

  const categoryOptions = useMemo(() => {
    const availableCategories = new Set([
      'Computadora',
      'Equipo biomédico',
      'Cámara',
      'Impresora',
      'Equipo de red',
      ...allAssets.map((asset) => asset.categoria),
    ]);

    return ['Todas', ...Array.from(availableCategories).filter(Boolean).sort((left, right) => left.localeCompare(right))];
  }, [allAssets]);

  const branchOptions = useMemo(() => {
    const availableBranches = new Set([
      'Sucursal Central',
      'Sucursal Norte',
      'Sucursal Sur',
      ...allAssets.map((asset) => asset.sucursal),
    ]);

    return ['Todas', ...Array.from(availableBranches).filter(Boolean).sort((left, right) => left.localeCompare(right))];
  }, [allAssets]);

  const registros = useMemo(() => {
    const texto = normalizeText(busqueda).toLowerCase();

    return allAssets.filter((activo) => {
      const codigo = normalizeText(activo.codigo).toLowerCase();
      const nombre = normalizeText(activo.nombre).toLowerCase();
      const fabricante = normalizeText(activo.fabricante).toLowerCase();
      const estadoActivo = normalizeText(activo.estado, 'Operativo');
      const categoriaActual = normalizeText(activo.categoria, 'Sin categoría');
      const sucursalActual = normalizeText(activo.sucursal, 'Sucursal Central');

      const coincideCategoria = categoriaFiltro === 'Todas' || categoriaActual === categoriaFiltro;

      const coincideEstado = estado === 'Todos' || estadoActivo === estado;
      const coincideSucursal = sucursal === 'Todas' || sucursalActual === sucursal;

      const coincideBusqueda =
        !texto ||
        codigo.includes(texto) ||
        nombre.includes(texto) ||
        fabricante.includes(texto) ||
        normalizeText(activo.numeroInventarioContable).toLowerCase().includes(texto);

      return coincideCategoria && coincideEstado && coincideSucursal && coincideBusqueda;
    });
  }, [allAssets, busqueda, categoriaFiltro, estado, sucursal]);

  const total = registros.length;
  const operativos = registros.filter((activo) => activo.estado === 'Operativo').length;
  const mantenimiento = registros.filter((activo) => activo.estado === 'En mantenimiento').length;
  const fueraServicio = registros.filter((activo) => activo.estado === 'Fuera de servicio').length;

  const exportColumns: AssetExportColumn[] = [
    { header: 'Código Activo', key: 'codigo', width: 18 },
    { header: 'Número de Inventario Contable', key: 'numeroInventarioContable', width: 30 },
    { header: 'Categoría', key: 'categoria', width: 20 },
    { header: 'Fabricante', key: 'fabricante', width: 20 },
    { header: 'Sucursal', key: 'sucursal', width: 22 },
    { header: 'Departamento', key: 'departamento', width: 22 },
    { header: 'Localización', key: 'ubicacion', width: 22 },
    { header: 'Estado', key: 'estado', width: 20 },
  ];

  const getExportRows = (): Array<Record<AssetExportKey, string>> =>
    registros.map(({
      codigo,
      numeroInventarioContable,
      categoria,
      fabricante,
      sucursal,
      departamento,
      ubicacion,
      estado,
    }) => ({
      codigo,
      numeroInventarioContable,
      categoria,
      fabricante,
      sucursal,
      departamento,
      ubicacion,
      estado,
    }));

  const downloadExport = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleExportExcel = async () => {
    setExportError('');

    try {
      const workbook = createExcelWorkbook(exportColumns, getExportRows());
      const workbookBytes = new Uint8Array(workbook).buffer;
      downloadExport(
        new Blob([workbookBytes], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
        `inventario-${new Date().toISOString().slice(0, 10)}.xlsx`
      );
    } catch (error) {
      console.error('No se pudo exportar el inventario a Excel.', error);
      setExportError('No se pudo generar el archivo Excel.');
    }
  };

  const handleExportPdf = async () => {
    setExportError('');

    try {
      const [{ jsPDF }, { default: autoTable }] = await Promise.all([
        import('jspdf'),
        import('jspdf-autotable'),
      ]);
      const document = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      document.setFontSize(16);
      document.text('Inventario de activos', 14, 16);
      document.setFontSize(9);
      document.text(`Registros: ${registros.length}`, 14, 22);

      autoTable(document, {
        startY: 27,
        head: [exportColumns.map(({ header }) => header)],
        body: getExportRows().map((row) =>
          exportColumns.map(({ key }) => String(row[key] ?? ''))
        ),
        styles: { fontSize: 7, cellPadding: 2.5 },
        headStyles: { fillColor: [7, 59, 92] },
        alternateRowStyles: { fillColor: [248, 249, 250] },
        margin: { left: 14, right: 14 },
      });

      document.save(`inventario-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error('No se pudo exportar el inventario a PDF.', error);
      setExportError('No se pudo generar el archivo PDF.');
    }
  };

  const limpiar = () => {
    setBusqueda('');
    setEstado('Todos');
    setSucursal('Todas');
    setCategoriaFiltro(categoria ?? 'Todas');
  };

  const openCreateModal = () => {
    const defaultCategory =
      categoriaFiltro === 'Todas' ? categoria ?? 'Computadora' : categoriaFiltro;

    setForm(createDefaultAssetForm(defaultCategory));
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nuevoActivo: AssetRecord = {
      id: Date.now(),
      codigo: normalizeText(form.codigo, `ACT-${Date.now().toString().slice(-4)}`),
      numeroInventarioContable: normalizeText(form.numeroInventarioContable, `INV-${Date.now().toString().slice(-6)}`),
      nombre: `Activo ${normalizeText(form.categoria, 'General')} ${normalizeText(form.codigo, 'Nuevo')}`,
      categoria: normalizeText(form.categoria, categoria ?? 'Computadora'),
      fabricante: normalizeText(form.fabricante, 'Sin fabricante'),
      marca: normalizeText(form.marca, 'Sin marca'),
      serie: normalizeText(form.serie, 'Sin serie'),
      estado: form.estado,
      responsable: 'Usuario del sistema',
      departamento: normalizeText(form.departamento, 'Tecnología'),
      sucursal: normalizeText(form.sucursal, 'Sucursal Central'),
      ubicacion: normalizeText(form.ubicacion, 'Por asignar'),
      detalle: normalizeText(form.detalle, 'Registro ingresado desde el formulario de inventario.'),
      observacion: normalizeText(form.observacion, 'Sin observación'),
      fechaAdquisicion: new Date().toLocaleDateString('es-MX'),
    };

    setLocalAssets((current) => [nuevoActivo, ...current]);
    setCategoriaFiltro(nuevoActivo.categoria);
    setForm(createDefaultAssetForm(nuevoActivo.categoria));
    setIsCreateModalOpen(false);
  };

  return (
    <div className="activos-pagina">
      <div className="activos-encabezado">
        <div>
          <span className="activos-kicker">Gestión de activos</span>
          <h1>{titulo}</h1>
          <p>{descripcion}</p>
        </div>

        <div className="activos-header-actions">
          <button type="button" className="btn btn-outline-primary" onClick={handleExportPdf}>
            <i className="bi bi-filetype-pdf me-2" />
            PDF
          </button>
          <button type="button" className="btn btn-outline-success" onClick={handleExportExcel}>
            <i className="bi bi-file-earmark-spreadsheet me-2" />
            Excel
          </button>
          <button type="button" className="btn btn-primary" onClick={openCreateModal}>
            <i className="bi bi-plus-lg me-2" />
            Registrar Nuevo Inventario
          </button>
          <div className="activos-icono">
            <i className="bi bi-pc-display-horizontal" />
          </div>
        </div>
      </div>

      {exportError && (
        <div className="alert alert-danger" role="alert">
          {exportError}
        </div>
      )}

      <div className="activos-resumen">
        <div className="activo-resumen-card">
          <div>
            <span>Total</span>
            <strong>{total}</strong>
          </div>
          <i className="bi bi-box-seam" />
        </div>

        <div className="activo-resumen-card">
          <div>
            <span>Operativos</span>
            <strong>{operativos}</strong>
          </div>
          <i className="bi bi-check-circle" />
        </div>

        <div className="activo-resumen-card">
          <div>
            <span>En mantenimiento</span>
            <strong>{mantenimiento}</strong>
          </div>
          <i className="bi bi-tools" />
        </div>

        <div className="activo-resumen-card">
          <div>
            <span>Fuera de servicio</span>
            <strong>{fueraServicio}</strong>
          </div>
          <i className="bi bi-exclamation-circle" />
        </div>
      </div>

      <div className="activos-filtros">
        <div className="activo-busqueda">
          <i className="bi bi-search" />
          <input
            type="text"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar por código, activo, fabricante o inventario..."
          />
        </div>

        <select
          aria-label="Filtrar por categoría"
          value={categoriaFiltro}
          onChange={(event) => setCategoriaFiltro(event.target.value)}
        >
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option === 'Todas' ? 'Todas las categorías' : option}
            </option>
          ))}
        </select>

        <select
          aria-label="Filtrar por sucursal"
          value={sucursal}
          onChange={(event) => setSucursal(event.target.value)}
        >
          {branchOptions.map((option) => (
            <option key={option} value={option}>
              {option === 'Todas' ? 'Todas las sucursales' : option}
            </option>
          ))}
        </select>

        <select value={estado} onChange={(event) => setEstado(event.target.value as AssetStatus)}>
          <option value="Todos">Todos los estados</option>
          <option value="Operativo">Operativo</option>
          <option value="En mantenimiento">En mantenimiento</option>
          <option value="Fuera de servicio">Fuera de servicio</option>
        </select>

        <button type="button" className="activo-boton-limpiar" onClick={limpiar}>
          <i className="bi bi-arrow-counterclockwise" />
          Limpiar
        </button>
      </div>

      <div className="activos-tabla-contenedor">
        <div className="activos-tabla-superior">
          <div>
            <strong>{registros.length}</strong> activos encontrados
          </div>
          <span>{categoriaFiltro === 'Todas' ? 'Todos los tipos de activo' : categoriaFiltro}</span>
        </div>

        {registros.length === 0 ? (
          <div className="activos-vacio">
            <i className="bi bi-inbox" />
            <h3>No se encontraron activos</h3>
            <p>Prueba modificando los filtros de búsqueda.</p>
          </div>
        ) : (
          <div className="activos-tabla-scroll">
            <table>
              <thead>
                <tr>
                  <th>Código Activo</th>
                  <th>Número de Inventario Contable</th>
                  <th>Categoría</th>
                  <th>Fabricante</th>
                  <th>Sucursal</th>
                  <th>Departamento</th>
                  <th>Localización</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>
                {registros.map((activo) => (
                  <tr key={activo.id}>
                    <td>
                      <span className="activo-codigo">{activo.codigo}</span>
                    </td>

                    <td>{activo.numeroInventarioContable}</td>

                    <td>{activo.categoria}</td>

                    <td>{activo.fabricante}</td>

                    <td>{activo.sucursal}</td>

                    <td>{activo.departamento}</td>

                    <td>{activo.ubicacion}</td>

                    <td>
                      <div className="activo-estado-block">
                        <span
                          className={`activo-estado estado-${normalizeText(activo.estado)
                            .toLowerCase()
                            .replaceAll(' ', '-')}`}
                        >
                          {activo.estado}
                        </span>

                        <button
                          type="button"
                          className="activo-detalle-btn"
                          onClick={() => setSelectedAsset(activo)}
                          aria-label={`Ver detalle de ${activo.codigo}`}
                        >
                          <i className="bi bi-eye" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AssetDetailModal asset={selectedAsset} isOpen={Boolean(selectedAsset)} onClose={() => setSelectedAsset(null)} />

      {isCreateModalOpen && (
        <div className="asset-modal-backdrop" onClick={() => setIsCreateModalOpen(false)}>
          <div
            className="asset-form-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="asset-create-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="asset-modal__header">
              <div>
                <span className="asset-modal__label">Nuevo inventario</span>
                <h3 id="asset-create-title">Registrar activo</h3>
              </div>

              <button
                type="button"
                className="asset-modal__close"
                onClick={() => setIsCreateModalOpen(false)}
                aria-label="Cerrar formulario de registro"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="asset-form">
              <div className="asset-form__grid">
                <label>
                  <span>Código Activo</span>
                  <input
                    value={form.codigo}
                    onChange={(event) => setForm((current) => ({ ...current, codigo: event.target.value }))}
                    placeholder="Ej. LAB-020"
                    required
                  />
                </label>

                <label>
                  <span>Número de Inventario Contable</span>
                  <input
                    value={form.numeroInventarioContable}
                    onChange={(event) => setForm((current) => ({ ...current, numeroInventarioContable: event.target.value }))}
                    placeholder="INV-0001"
                    required
                  />
                </label>

                <label>
                  <span>Categoría</span>
                  <select
                    value={form.categoria}
                    onChange={(event) => setForm((current) => ({ ...current, categoria: event.target.value }))}
                  >
                    <option value="Computadora">Computadora</option>
                    <option value="Equipo biomédico">Equipo biomédico</option>
                    <option value="Cámara">Cámara</option>
                    <option value="Impresora">Impresora</option>
                    <option value="Equipo de red">Equipo de red</option>
                  </select>
                </label>

                <label>
                  <span>Fabricante</span>
                  <input
                    value={form.fabricante}
                    onChange={(event) => setForm((current) => ({ ...current, fabricante: event.target.value }))}
                    placeholder="Dell, HP, Cisco..."
                    required
                  />
                </label>

                <label>
                  <span>Marca</span>
                  <input
                    value={form.marca}
                    onChange={(event) => setForm((current) => ({ ...current, marca: event.target.value }))}
                    placeholder="Marca comercial"
                    required
                  />
                </label>

                <label>
                  <span>Número de Serie</span>
                  <input
                    value={form.serie}
                    onChange={(event) => setForm((current) => ({ ...current, serie: event.target.value }))}
                    placeholder="SER-0001"
                    required
                  />
                </label>

                <label>
                  <span>Sucursal</span>
                  <select
                    value={form.sucursal}
                    onChange={(event) => setForm((current) => ({ ...current, sucursal: event.target.value }))}
                  >
                    <option value="Sucursal Central">Sucursal Central</option>
                    <option value="Sucursal Norte">Sucursal Norte</option>
                    <option value="Sucursal Sur">Sucursal Sur</option>
                  </select>
                </label>

                <label>
                  <span>Departamento</span>
                  <input
                    value={form.departamento}
                    onChange={(event) => setForm((current) => ({ ...current, departamento: event.target.value }))}
                    placeholder="Departamento"
                    required
                  />
                </label>

                <label>
                  <span>Localización</span>
                  <input
                    value={form.ubicacion}
                    onChange={(event) => setForm((current) => ({ ...current, ubicacion: event.target.value }))}
                    placeholder="Ej. Consultorio 1"
                    required
                  />
                </label>

                <label className="asset-form__full-width">
                  <span>Detalle</span>
                  <textarea
                    value={form.detalle}
                    onChange={(event) => setForm((current) => ({ ...current, detalle: event.target.value }))}
                    placeholder="Descripción del activo..."
                    rows={3}
                    required
                  />
                </label>

                <label>
                  <span>Estado</span>
                  <select
                    value={form.estado}
                    onChange={(event) => setForm((current) => ({ ...current, estado: event.target.value as Exclude<AssetStatus, 'Todos'> }))}
                  >
                    <option value="Operativo">Operativo</option>
                    <option value="En mantenimiento">En mantenimiento</option>
                    <option value="Fuera de servicio">Fuera de servicio</option>
                  </select>
                </label>

                <label className="asset-form__full-width">
                  <span>Observación</span>
                  <textarea
                    value={form.observacion}
                    onChange={(event) => setForm((current) => ({ ...current, observacion: event.target.value }))}
                    placeholder="Observaciones o comentarios de la entrega..."
                    rows={3}
                  />
                </label>
              </div>

              <div className="asset-form__actions">
                <button type="button" className="btn btn-outline-secondary" onClick={() => setIsCreateModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar inventario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablaActivos;
