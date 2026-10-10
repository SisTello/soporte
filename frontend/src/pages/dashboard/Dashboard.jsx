import { useCallback, useEffect, useMemo, useState } from 'react';

import './Dashboard.scss';

import { requestsService } from '../../features/requests/services/requestsService';
import { assetsService } from '../../features/assets/services/assetsService';

const INITIAL_FORM = {
    categoria: '',
    prioridad: 'Media',
    asunto: '',
    descripcion: '',
    sucursal: '',
    departamento: '',
    ubicacion: '',
    tipoActivo: '',
    codigoActivo: '',
    disponibilidad: '',
};

const FILTER_COLUMNS = [
    { value: 'id', label: 'ID' },
    { value: 'category', label: 'Categoría' },
    { value: 'title', label: 'Asunto' },
    { value: 'requestor', label: 'Usuario' },
    { value: 'description', label: 'Descripción' },
    { value: 'location', label: 'Sucursal' },
    { value: 'department', label: 'Departamento' },
    { value: 'status', label: 'Estado' },
];

const Dashboard = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [columnaFiltro, setColumnaFiltro] = useState('category');
    const [textoFiltro, setTextoFiltro] = useState('');

    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
    const [mostrarVerificar, setMostrarVerificar] = useState(false);
    const [mostrarNuevaSolicitud, setMostrarNuevaSolicitud] = useState(false);

    const [formData, setFormData] = useState(INITIAL_FORM);

    const [codigoActivoBusqueda, setCodigoActivoBusqueda] = useState('');
    const [activoEncontrado, setActivoEncontrado] = useState(null);
    const [buscandoActivo, setBuscandoActivo] = useState(false);

    const [mostrarAnulacion, setMostrarAnulacion] = useState(false);
    const [motivoAnulacion, setMotivoAnulacion] = useState('');

    const [guardando, setGuardando] = useState(false);

    /*
     * ============================================================
     * CARGAR SOLICITUDES
     * ============================================================
     */

    const cargarSolicitudes = useCallback(async () => {
        try {
            setLoading(true);
            setError('');

            const response = await requestsService.list({
                search: '',
                status: 'Todos',
                category: 'Todas',
            });

            setSolicitudes(response.items ?? []);
        } catch (err) {
            console.error(err);
            setError('No se pudieron cargar las solicitudes.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            cargarSolicitudes();
        }, 250);

        return () => clearTimeout(timeout);
    }, [cargarSolicitudes]);

    /*
     * ============================================================
     * FILTRO
     * ============================================================
     */

    const solicitudesFiltradas = useMemo(() => {
        const search = textoFiltro.trim().toLowerCase();

        if (!search) {
            return solicitudes;
        }

        return solicitudes.filter((solicitud) => {
            const value = String(solicitud[columnaFiltro] ?? '').toLowerCase();
            return value.includes(search);
        });
    }, [solicitudes, columnaFiltro, textoFiltro]);

    /*
     * ============================================================
     * FORMULARIO
     * ============================================================
     */

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /*
     * ============================================================
     * NUEVA SOLICITUD
     * ============================================================
     */

    const abrirNuevaSolicitud = () => {
        setFormData(INITIAL_FORM);
        setActivoEncontrado(null);
        setCodigoActivoBusqueda('');
        setMostrarNuevaSolicitud(true);
    };

    const cerrarNuevaSolicitud = () => {
        if (guardando) return;

        setMostrarNuevaSolicitud(false);
        setFormData(INITIAL_FORM);
        setActivoEncontrado(null);
        setCodigoActivoBusqueda('');
    };

    const crearSolicitud = async (event) => {
        event.preventDefault();

        try {
            setGuardando(true);

            await requestsService.create({
                title: formData.asunto,
                category: formData.categoria,
                priority: formData.prioridad,
                description: formData.descripcion,
                requestor: 'Usuario actual',
                department: formData.departamento,
                location: formData.sucursal,
                ubicacion: formData.ubicacion,
                tipoActivo: formData.tipoActivo,
                codigoActivo: formData.codigoActivo,
                disponibilidad: formData.disponibilidad,
            });

            cerrarNuevaSolicitud();

            await cargarSolicitudes();
        } catch (err) {
            console.error(err);
            setError(
                err?.message || 'No se pudo registrar la solicitud.'
            );
        } finally {
            setGuardando(false);
        }
    };

    /*
     * ============================================================
     * VERIFICAR SOLICITUD
     * ============================================================
     */

    const abrirVerificar = (solicitud) => {
        setSolicitudSeleccionada(solicitud);

        setFormData({
            categoria: solicitud.category ?? '',
            prioridad: solicitud.priority ?? 'Media',
            asunto: solicitud.title ?? '',
            descripcion: solicitud.description ?? '',
            sucursal: solicitud.location ?? '',
            departamento: solicitud.department ?? '',
            ubicacion: solicitud.ubicacion ?? '',
            tipoActivo: solicitud.tipoActivo ?? '',
            codigoActivo: solicitud.codigoActivo ?? '',
            disponibilidad: solicitud.disponibilidad ?? '',
        });

        setCodigoActivoBusqueda(solicitud.codigoActivo ?? '');
        setActivoEncontrado(null);

        setMostrarVerificar(true);
    };

    const cerrarVerificar = () => {
        if (guardando) return;

        setMostrarVerificar(false);
        setSolicitudSeleccionada(null);
        setActivoEncontrado(null);
        setCodigoActivoBusqueda('');
        setMostrarAnulacion(false);
        setMotivoAnulacion('');
    };

    /*
     * ============================================================
     * BUSCAR ACTIVO POR CÓDIGO
     * ============================================================
     */

    const buscarActivo = async () => {
        const codigo = codigoActivoBusqueda.trim();

        if (!codigo) {
            setActivoEncontrado(null);
            return;
        }

        try {
            setBuscandoActivo(true);

            const response = await assetsService.list({
                search: codigo,
                status: 'Todos',
                category: 'Todas',
            });

            const activo = (response.items ?? []).find(
                (item) =>
                    String(item.codigo).toLowerCase() ===
                    codigo.toLowerCase()
            );

            setActivoEncontrado(activo ?? null);

            if (activo) {
                setFormData((prev) => ({
                    ...prev,
                    codigoActivo: activo.codigo,
                    tipoActivo: activo.categoria,
                    ubicacion: activo.ubicacion,
                }));
            }
        } catch (err) {
            console.error(err);
            setError('No se pudo buscar el activo.');
        } finally {
            setBuscandoActivo(false);
        }
    };

    /*
     * ============================================================
     * ASOCIAR / VERIFICAR
     * ============================================================
     */

    const verificarSolicitud = async () => {
        if (!solicitudSeleccionada) return;

        if (!formData.codigoActivo.trim()) {
            setError('Debe ingresar el código del activo.');
            return;
        }

        if (!activoEncontrado) {
            setError(
                'Debe buscar y seleccionar un activo válido antes de verificar la solicitud.'
            );
            return;
        }

        try {
            setGuardando(true);
            setError('');

            await requestsService.verify(
                solicitudSeleccionada.id,
                {
                    prioridad: formData.prioridad,
                    codigoActivo: activoEncontrado.codigo,
                    tipoActivo: activoEncontrado.categoria,
                    ubicacion: activoEncontrado.ubicacion,
                    activoId: activoEncontrado.id,
                }
            );

            cerrarVerificar();

            await cargarSolicitudes();
        } catch (err) {
            console.error(err);
            setError(
                err?.message ||
                'No se pudo verificar la solicitud.'
            );
        } finally {
            setGuardando(false);
        }
    };

    /*
     * ============================================================
     * ANULAR SOLICITUD
     * ============================================================
     */

    const confirmarAnulacion = async () => {
        if (!solicitudSeleccionada) return;

        if (!motivoAnulacion.trim()) {
            setError(
                'Debe indicar el motivo de la anulación.'
            );
            return;
        }

        try {
            setGuardando(true);
            setError('');

            await requestsService.cancel(
                solicitudSeleccionada.id,
                motivoAnulacion
            );

            setMostrarAnulacion(false);
            setMotivoAnulacion('');

            cerrarVerificar();

            await cargarSolicitudes();
        } catch (err) {
            console.error(err);
            setError(
                err?.message ||
                'No se pudo anular la solicitud.'
            );
        } finally {
            setGuardando(false);
        }
    };

    /*
     * ============================================================
     * BADGES
     * ============================================================
     */

    const renderPrioridad = (prioridad) => {
        const classes = {
            Alta: 'bg-danger',
            Media: 'bg-warning text-dark',
            Baja: 'bg-success',
        };

        return (
            <span
                className={`badge ${
                    classes[prioridad] ?? 'bg-secondary'
                }`}
            >
                {prioridad}
            </span>
        );
    };

    const renderEstado = (estado) => {
        const classes = {
            Pendiente: 'bg-primary',
            'En curso': 'bg-warning text-dark',
            Asignada: 'bg-info text-dark',
            Resuelta: 'bg-success',
            Cerrada: 'bg-secondary',
            Anulada: 'bg-dark',
        };

        return (
            <span
                className={`badge ${
                    classes[estado] ?? 'bg-secondary'
                }`}
            >
                {estado}
            </span>
        );
    };

    /*
     * ============================================================
     * RENDER
     * ============================================================
     */

    return (
        <div className="dashboard-page">

            {/* ==================================================
                ENCABEZADO
            ================================================== */}

            <div className="dashboard-header">

                <div>
                    <h1>Inicio</h1>

                    <p>
                        Centro de Soporte y Mantenimiento
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={abrirNuevaSolicitud}
                >
                    <i className="bi bi-plus-lg me-2"></i>
                    Nueva solicitud
                </button>

            </div>


            {/* ==================================================
                INDICADORES
            ================================================== */}

            <div className="row g-4 mb-4">

                <div className="col-xl-3 col-md-6">
                    <div className="dashboard-card">
                        <div className="card-icon blue">
                            <i className="bi bi-ticket-perforated"></i>
                        </div>

                        <div>
                            <span>Solicitudes abiertas</span>
                            <strong>
                                {
                                    solicitudes.filter(
                                        (item) =>
                                            ![
                                                'Resuelta',
                                                'Cerrada',
                                                'Anulada',
                                            ].includes(item.status)
                                    ).length
                                }
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="dashboard-card">
                        <div className="card-icon yellow">
                            <i className="bi bi-clock"></i>
                        </div>

                        <div>
                            <span>En atención</span>
                            <strong>
                                {
                                    solicitudes.filter(
                                        (item) =>
                                            item.status === 'En curso' ||
                                            item.status === 'Asignada'
                                    ).length
                                }
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="dashboard-card">
                        <div className="card-icon green">
                            <i className="bi bi-check-circle"></i>
                        </div>

                        <div>
                            <span>Resueltas</span>
                            <strong>
                                {
                                    solicitudes.filter(
                                        (item) =>
                                            item.status === 'Resuelta'
                                    ).length
                                }
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="dashboard-card">
                        <div className="card-icon red">
                            <i className="bi bi-exclamation-triangle"></i>
                        </div>

                        <div>
                            <span>Prioridad alta</span>
                            <strong>
                                {
                                    solicitudes.filter(
                                        (item) =>
                                            item.priority === 'Alta'
                                    ).length
                                }
                            </strong>
                        </div>
                    </div>
                </div>

            </div>


            {/* ==================================================
                SOLICITUDES RECIENTES
            ================================================== */}

            <div className="row g-4 dashboard-content">

                <div className="col-12 dashboard-content__column">

                    <div className="dashboard-panel dashboard-panel--full">

                        <div className="panel-header">

                            <div>
                                <h5>
                                    Solicitudes recientes
                                </h5>

                                <span>
                                    Solicitudes recibidas desde la Intranet
                                </span>
                            </div>

                            <div className="solicitudes-filtro">

                                <span className="filtro-label">
                                    Filtrar por:
                                </span>

                                <select
                                    value={columnaFiltro}
                                    onChange={(event) =>
                                        setColumnaFiltro(event.target.value)
                                    }
                                    aria-label="Campo de filtro"
                                >
                                    {FILTER_COLUMNS.map((column) => (
                                        <option key={column.value} value={column.value}>
                                            {column.label}
                                        </option>
                                    ))}
                                </select>

                                <div className="filtro-input">

                                    <i className="bi bi-search"></i>

                                    <input
                                        type="text"
                                        value={textoFiltro}
                                        onChange={(event) =>
                                            setTextoFiltro(event.target.value)
                                        }
                                        placeholder={`Buscar por ${
                                            FILTER_COLUMNS.find(
                                                (column) => column.value === columnaFiltro
                                            )?.label.toLowerCase() ?? 'valor'
                                        }...`}
                                    />

                                    {textoFiltro && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setTextoFiltro('')
                                            }
                                            aria-label="Limpiar filtro"
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    )}

                                </div>

                            </div>

                        </div>


                        {error && (
                            <div className="alert alert-danger m-3">
                                {error}

                                <button
                                    type="button"
                                    className="btn-close float-end"
                                    onClick={() => setError('')}
                                ></button>
                            </div>
                        )}


                        <div className="table-responsive">

                            <table className="table align-middle solicitudes-table">

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Categoría</th>
                                        <th>Asunto</th>
                                        <th>Usuario</th>
                                        <th>Descripción</th>
                                        <th>Sucursal</th>
                                        <th>Departamento</th>
                                        <th>Estado</th>
                                        <th>Verificar</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {loading ? (
                                        <tr>
                                            <td
                                                colSpan="9"
                                                className="text-center py-5"
                                            >
                                                <div
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                ></div>

                                                Cargando solicitudes...
                                            </td>
                                        </tr>
                                    ) : solicitudesFiltradas.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="9"
                                                className="text-center py-5 text-muted"
                                            >
                                                No existen solicitudes para
                                                el filtro seleccionado.
                                            </td>
                                        </tr>
                                    ) : (
                                        solicitudesFiltradas.map(
                                            (solicitud) => (
                                                <tr key={solicitud.id}>

                                                    <td>
                                                        <strong>
                                                            #ST-
                                                            {solicitud.id}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {solicitud.category}
                                                    </td>

                                                    <td>
                                                        <strong>
                                                            {solicitud.title}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {solicitud.requestor}
                                                    </td>

                                                    <td>
                                                        <div
                                                            className="descripcion-solicitud"
                                                            title={
                                                                solicitud.description
                                                            }
                                                        >
                                                            {
                                                                solicitud.description
                                                            }
                                                        </div>
                                                    </td>

                                                    <td>
                                                        {solicitud.location}
                                                    </td>

                                                    <td>
                                                        {solicitud.department}
                                                    </td>

                                                    <td>
                                                        {renderEstado(
                                                            solicitud.status
                                                        )}
                                                    </td>

                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-primary btn-verificar"
                                                            onClick={() =>
                                                                abrirVerificar(
                                                                    solicitud
                                                                )
                                                            }
                                                        >
                                                            <i className="bi bi-check2-square me-1"></i>
                                                            Verificar
                                                        </button>
                                                    </td>

                                                </tr>
                                            )
                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==================================================
                MODAL VERIFICAR
            ================================================== */}

            {mostrarVerificar && solicitudSeleccionada && (
                <div className="dashboard-modal-backdrop">

                    <div
                        className="dashboard-modal dashboard-modal--large"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-verificar-title"
                    >

                        <div className="dashboard-modal__header">

                            <div>
                                <h4 id="modal-verificar-title">
                                    Verificar solicitud
                                </h4>

                                <span>
                                    Solicitud #
                                    {solicitudSeleccionada.id}
                                </span>
                            </div>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={cerrarVerificar}
                            ></button>

                        </div>


                        <div className="dashboard-modal__body">

                            {/* INFORMACIÓN DE LA SOLICITUD */}

                            <div className="modal-section">

                                <div className="modal-section__title">
                                    <i className="bi bi-ticket-perforated"></i>
                                    Información de la solicitud
                                </div>

                                <div className="row g-3">

                                    <div className="col-md-4">
                                        <label>
                                            ID
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={`#ST-${solicitudSeleccionada.id}`}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label>
                                            Usuario
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={
                                                solicitudSeleccionada.requestor
                                            }
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label>
                                            Estado actual
                                        </label>

                                        <div className="modal-field-badge">
                                            {renderEstado(
                                                solicitudSeleccionada.status
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label>
                                            Categoría
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={
                                                formData.categoria
                                            }
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label>
                                            Asunto
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={
                                                formData.asunto
                                            }
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label>
                                            Sucursal
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={
                                                formData.sucursal
                                            }
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label>
                                            Departamento
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={
                                                formData.departamento
                                            }
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label>
                                            Prioridad
                                        </label>

                                        <select
                                            name="prioridad"
                                            className="form-select"
                                            value={
                                                formData.prioridad
                                            }
                                            onChange={handleChange}
                                        >
                                            <option value="Baja">
                                                Baja
                                            </option>

                                            <option value="Media">
                                                Media
                                            </option>

                                            <option value="Alta">
                                                Alta
                                            </option>
                                        </select>
                                    </div>

                                    <div className="col-12">
                                        <label>
                                            Descripción
                                        </label>

                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={
                                                formData.descripcion
                                            }
                                            disabled
                                        ></textarea>
                                    </div>

                                </div>

                            </div>


                            {/* ASOCIACIÓN DEL ACTIVO */}

                            <div className="modal-section">

                                <div className="modal-section__title">
                                    <i className="bi bi-pc-display"></i>
                                    Asociar activo
                                </div>

                                <p className="modal-help">
                                    Ingrese el código del activo para
                                    vincular la solicitud con el equipo
                                    correspondiente y crear su ficha de
                                    soporte.
                                </p>

                                <div className="row g-3">

                                    <div className="col-md-7">

                                        <label>
                                            Código de activo
                                            <span className="required">
                                                *
                                            </span>
                                        </label>

                                        <div className="input-group">

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                    codigoActivoBusqueda
                                                }
                                                onChange={(event) => {
                                                    setCodigoActivoBusqueda(
                                                        event.target.value
                                                    );

                                                    setActivoEncontrado(
                                                        null
                                                    );
                                                }}
                                                placeholder="Ej. LAB-02"
                                            />

                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                onClick={buscarActivo}
                                                disabled={buscandoActivo}
                                            >
                                                {buscandoActivo ? (
                                                    <>
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                        ></span>

                                                        Buscando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-search me-1"></i>
                                                        Buscar
                                                    </>
                                                )}
                                            </button>

                                        </div>

                                    </div>

                                    <div className="col-md-5">

                                        <label>
                                            Tipo de activo
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={
                                                activoEncontrado?.categoria ??
                                                formData.tipoActivo
                                            }
                                            disabled
                                        />

                                    </div>

                                </div>


                                {activoEncontrado && (
                                    <div className="activo-encontrado">

                                        <div className="activo-encontrado__icon">
                                            <i className="bi bi-check-circle-fill"></i>
                                        </div>

                                        <div className="activo-encontrado__content">

                                            <strong>
                                                {activoEncontrado.nombre}
                                            </strong>

                                            <span>
                                                Código:{' '}
                                                {activoEncontrado.codigo}
                                            </span>

                                            <span>
                                                Serie:{' '}
                                                {activoEncontrado.serie}
                                            </span>

                                            <span>
                                                Ubicación:{' '}
                                                {activoEncontrado.ubicacion}
                                            </span>

                                        </div>

                                        <div>
                                            {renderPrioridad(
                                                formData.prioridad
                                            )}
                                        </div>

                                    </div>
                                )}

                            </div>


                            {/* CAMPOS ADICIONALES */}

                            <div className="modal-section">

                                <div className="modal-section__title">
                                    <i className="bi bi-clipboard-check"></i>
                                    Datos de soporte
                                </div>

                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <label>
                                            Ubicación
                                        </label>

                                        <input
                                            type="text"
                                            name="ubicacion"
                                            className="form-control"
                                            value={
                                                formData.ubicacion
                                            }
                                            onChange={handleChange}
                                            placeholder="Ubicación del activo"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label>
                                            Disponibilidad del equipo
                                        </label>

                                        <select
                                            name="disponibilidad"
                                            className="form-select"
                                            value={
                                                formData.disponibilidad
                                            }
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Seleccione
                                            </option>

                                            <option value="Disponible">
                                                Disponible
                                            </option>

                                            <option value="No disponible">
                                                No disponible
                                            </option>

                                            <option value="Fuera de servicio">
                                                Fuera de servicio
                                            </option>
                                        </select>
                                    </div>

                                </div>

                            </div>


                            {/* ANULACIÓN */}

                            {mostrarAnulacion && (
                                <div className="modal-section modal-section--danger">

                                    <div className="modal-section__title">
                                        <i className="bi bi-exclamation-triangle"></i>
                                        Anular solicitud
                                    </div>

                                    <p className="modal-help">
                                        Indique obligatoriamente el motivo
                                        por el cual esta solicitud no
                                        procede.
                                    </p>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={motivoAnulacion}
                                        onChange={(event) =>
                                            setMotivoAnulacion(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Motivo de la anulación..."
                                    ></textarea>

                                    <div className="modal-danger-actions">

                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() =>
                                                setMostrarAnulacion(false)
                                            }
                                        >
                                            Cancelar
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={confirmarAnulacion}
                                            disabled={guardando}
                                        >
                                            <i className="bi bi-x-circle me-1"></i>
                                            Confirmar anulación
                                        </button>

                                    </div>

                                </div>
                            )}

                        </div>


                        <div className="dashboard-modal__footer">

                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() =>
                                    setMostrarAnulacion(true)
                                }
                                disabled={guardando}
                            >
                                <i className="bi bi-x-circle me-1"></i>
                                Anular solicitud
                            </button>

                            <div className="modal-footer-right">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={cerrarVerificar}
                                    disabled={guardando}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={verificarSolicitud}
                                    disabled={
                                        guardando ||
                                        !activoEncontrado
                                    }
                                >
                                    {guardando ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                            ></span>

                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check2-circle me-1"></i>
                                            Verificar y asociar activo
                                        </>
                                    )}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            )}


            {/* ==================================================
                MODAL NUEVA SOLICITUD
            ================================================== */}

            {mostrarNuevaSolicitud && (
                <div className="dashboard-modal-backdrop">

                    <div
                        className="dashboard-modal dashboard-modal--large"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-nueva-title"
                    >

                        <form onSubmit={crearSolicitud}>

                            <div className="dashboard-modal__header">

                                <div>
                                    <h4 id="modal-nueva-title">
                                        Nueva solicitud
                                    </h4>

                                    <span>
                                        Registre una nueva solicitud
                                        de soporte
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={cerrarNuevaSolicitud}
                                ></button>

                            </div>


                            <div className="dashboard-modal__body">

                                <div className="modal-section">

                                    <div className="modal-section__title">
                                        <i className="bi bi-ticket-perforated"></i>
                                        Información de la solicitud
                                    </div>

                                    <div className="row g-3">

                                        <div className="col-md-6">

                                            <label>
                                                Categoría
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>

                                            <select
                                                name="categoria"
                                                className="form-select"
                                                value={
                                                    formData.categoria
                                                }
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">
                                                    Seleccione una categoría
                                                </option>

                                                <option value="Hardware">
                                                    Hardware
                                                </option>

                                                <option value="Software">
                                                    Software
                                                </option>

                                                <option value="Red">
                                                    Redes y conectividad
                                                </option>

                                                <option value="Sistemas">
                                                    Sistemas / Aplicaciones
                                                </option>

                                                <option value="Impresoras">
                                                    Impresoras
                                                </option>

                                                <option value="Otro">
                                                    Otro
                                                </option>
                                            </select>

                                        </div>


                                        <div className="col-md-6">

                                            <label>
                                                Prioridad
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>

                                            <select
                                                name="prioridad"
                                                className="form-select"
                                                value={
                                                    formData.prioridad
                                                }
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="Baja">
                                                    Baja
                                                </option>

                                                <option value="Media">
                                                    Media
                                                </option>

                                                <option value="Alta">
                                                    Alta
                                                </option>
                                            </select>

                                        </div>


                                        <div className="col-12">

                                            <label>
                                                Asunto
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>

                                            <input
                                                type="text"
                                                name="asunto"
                                                className="form-control"
                                                value={
                                                    formData.asunto
                                                }
                                                onChange={handleChange}
                                                placeholder="Indique el asunto de la solicitud"
                                                required
                                            />

                                        </div>


                                        <div className="col-12">

                                            <label>
                                                Descripción
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>

                                            <textarea
                                                name="descripcion"
                                                className="form-control"
                                                rows="4"
                                                value={
                                                    formData.descripcion
                                                }
                                                onChange={handleChange}
                                                placeholder="Describa detalladamente el problema o requerimiento..."
                                                required
                                            ></textarea>

                                        </div>


                                        <div className="col-md-6">

                                            <label>
                                                Sucursal
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>

                                            <input
                                                type="text"
                                                name="sucursal"
                                                className="form-control"
                                                value={
                                                    formData.sucursal
                                                }
                                                onChange={handleChange}
                                                placeholder="Sucursal"
                                                required
                                            />

                                        </div>


                                        <div className="col-md-6">

                                            <label>
                                                Departamento
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>

                                            <input
                                                type="text"
                                                name="departamento"
                                                className="form-control"
                                                value={
                                                    formData.departamento
                                                }
                                                onChange={handleChange}
                                                placeholder="Departamento"
                                                required
                                            />

                                        </div>


                                        <div className="col-md-6">

                                            <label>
                                                Ubicación
                                            </label>

                                            <input
                                                type="text"
                                                name="ubicacion"
                                                className="form-control"
                                                value={
                                                    formData.ubicacion
                                                }
                                                onChange={handleChange}
                                                placeholder="Ubicación"
                                            />

                                        </div>


                                        <div className="col-md-6">

                                            <label>
                                                Tipo de activo
                                            </label>

                                            <input
                                                type="text"
                                                name="tipoActivo"
                                                className="form-control"
                                                value={
                                                    formData.tipoActivo
                                                }
                                                onChange={handleChange}
                                                placeholder="Ej. Computadora"
                                            />

                                        </div>


                                        <div className="col-md-6">

                                            <label>
                                                Código de activo
                                            </label>

                                            <input
                                                type="text"
                                                name="codigoActivo"
                                                className="form-control"
                                                value={
                                                    formData.codigoActivo
                                                }
                                                onChange={handleChange}
                                                placeholder="Ej. LAB-02"
                                            />

                                        </div>


                                        <div className="col-md-6">

                                            <label>
                                                Disponibilidad
                                            </label>

                                            <select
                                                name="disponibilidad"
                                                className="form-select"
                                                value={
                                                    formData.disponibilidad
                                                }
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Seleccione
                                                </option>

                                                <option value="Disponible">
                                                    Disponible
                                                </option>

                                                <option value="No disponible">
                                                    No disponible
                                                </option>

                                                <option value="Fuera de servicio">
                                                    Fuera de servicio
                                                </option>
                                            </select>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            <div className="dashboard-modal__footer">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={cerrarNuevaSolicitud}
                                    disabled={guardando}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={guardando}
                                >
                                    {guardando ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                            ></span>

                                            Registrando...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check-lg me-1"></i>
                                            Crear solicitud
                                        </>
                                    )}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Dashboard;