import AssetQrCode from './AssetQrCode';

import type { AssetRecord } from '../../types/activos';

interface AssetDetailModalProps {
  asset: AssetRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

const formatField = (value: string | undefined, fallback = 'No especificado'): string => {
  if (typeof value !== 'string' || value.trim() === '') {
    return fallback;
  }

  return value.trim();
};

const AssetDetailModal = ({ asset, isOpen, onClose }: AssetDetailModalProps) => {
  if (!isOpen || !asset) {
    return null;
  }

  const fields = [
    ['Código Activo', asset.codigo],
    ['Número de Inventario Contable', asset.numeroInventarioContable],
    ['Categoría', asset.categoria],
    ['Fabricante', asset.fabricante],
    ['Marca', asset.marca],
    ['Número de Serie', asset.serie],
    ['Sucursal', asset.sucursal],
    ['Departamento', asset.departamento],
    ['Localización', asset.ubicacion],
    ['Detalle', asset.detalle],
    ['Estado', asset.estado],
    ['Observación', asset.observacion],
  ];

  return (
    <div className="asset-modal-backdrop" onClick={onClose}>
      <div
        className="asset-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="asset-detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="asset-modal__header">
          <div>
            <span className="asset-modal__label">Detalle del activo</span>
            <h3 id="asset-detail-title">{formatField(asset.nombre, 'Activo sin nombre')}</h3>
          </div>

          <button
            type="button"
            className="asset-modal__close"
            onClick={onClose}
            aria-label="Cerrar detalle del activo"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="asset-modal__body">
          <div className="asset-modal__qr">
            <AssetQrCode asset={asset} size={120} />
          </div>

          <div className="asset-modal__grid">
            {fields.map(([label, value]) => (
              <div key={label} className="asset-modal__field">
                <span>{label}</span>
                <strong>{formatField(String(value), 'No especificado')}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailModal;
