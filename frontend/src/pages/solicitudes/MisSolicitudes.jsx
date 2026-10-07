import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InsigniaEstadoSolicitud from '../../components/solicitudes/InsigniaEstadoSolicitud';
import { useAuthStore } from '../../shared/store/useAuthStore';
import { useRequestsStore } from '../../shared/store/useRequestsStore';

import './MisSolicitudes.scss';

const MisSolicitudes = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const { items, loading, error, fetchRequests } = useRequestsStore();

    const [busqueda, setBusqueda] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('Todos');
    const [filtroCategoria, setFiltroCategoria] = useState('Todas');

    useEffect(() => {
        fetchRequests({
            search: '',
            status: 'Todos',
            category: 'Todas',
        }).catch(() => {});
    }, [fetchRequests]);

    const misSolicitudes = useMemo(() => {
        const usuarioActual = user?.fullName ?? 'Usuario actual';

        return items.filter(
            (solicitud) =>
                solicitud.requestor === usuarioActual ||
                solicitud.requestor === user?.username
        );
    }, [items, user]);

    const solicitudesFiltradas = useMemo(() => {
        const texto = busqueda.trim().toLowerCase();

        return misSolicitudes.filter((solicitud) => {
            const coincideBusqueda =
                !texto ||
                solicitud.title.toLowerCase().includes(texto) ||
                String(solicitud.id).includes(texto);

            const coincideEstado =
                filtroEstado === 'Todos' || solicitud.status === filtroEstado;

            const coincideCategoria =
                filtroCategoria === 'Todas' || solicitud.category === filtroCategoria;

            return coincideBusqueda && coincideEstado && coincideCategoria;
        });
    }, [misSolicitudes, busqueda, filtroEstado, filtroCategoria]);

    const total = misSolicitudes.length;

    const abiertas = misSolicitudes.filter(
        (solicitud) =>
            solicitud.status === 'Pendiente' ||
            solicitud.status === 'Asignada' ||
            solicitud.status === 'En espera'
    ).length;

    const enCurso = misSolicitudes.filter(
        (solicitud) => solicitud.status === 'En curso'
    ).length;

    const finalizadas = misSolicitudes.filter(
        (solicitud) =>
            solicitud.status === 'Resuelta' ||
            solicitud.status === 'Cerrada'
    ).length;

    const limpiarFiltros = () => {
        setBusqueda('');
        setFiltroEstado('Todos');
        setFiltroCategoria('Todas');
    };

    if (loading && items.length === 0) {
        return (
            <div className="container-fluid p-4">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-3 mb-0 text-muted">Cargando solicitudes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="solicitudes-pagina">
            <div className="encabezado-pagina">
                <div>
                    <span className="titulo-seccion">Solicitudes</span>
                    <h1>Mis solicitudes</h1>
                    <p>Consulta y realiza seguimiento de tus solicitudes de soporte.</p>
                </div>

                <button
                    type="button"
                    className="btn boton-nueva-solicitud"
                    onClick={() => navigate('/solicitudes/nueva')}
                >
                    <i className="bi bi-plus-lg"></i>
                    Nueva solicitud
                </button>
            </div>

            <div className="resumen-solicitudes">
                <div className="tarjeta-resumen">
                    <div className="resumen-contenido">
                        <span>Total</span>
                        <strong>{total}</strong>
                    </div>
                    <div className="resumen-icono">
                        <i className="bi bi-ticket-perforated"></i>
                    </div>
                </div>

                <div className="tarjeta-resumen">
                    <div className="resumen-contenido">
                        <span>Abiertas</span>
                        <strong>{abiertas}</strong>
                    </div>
                    <div className="resumen-icono">
                        <i className="bi bi-clock"></i>
                    </div>
                </div>

                <div className="tarjeta-resumen">
                    <div className="resumen-contenido">
                        <span>En curso</span>
                        <strong>{enCurso}</strong>
                    </div>
                    <div className="resumen-icono">
                        <i className="bi bi-tools"></i>
                    </div>
                </div>

                <div className="tarjeta-resumen">
                    <div className="resumen-contenido">
                        <span>Finalizadas</span>
                        <strong>{finalizadas}</strong>
                    </div>
                    <div className="resumen-icono">
                        <i className="bi bi-check-circle"></i>
                    </div>
                </div>
            </div>

            <div className="filtros-solicitudes">
                <div className="campo-busqueda">
                    <i className="bi bi-search"></i>
                    <input
                        type="text"
                        placeholder="Buscar por solicitud o número..."
                        value={busqueda}
                        onChange={(evento) => setBusqueda(evento.target.value)}
                    />

                    {busqueda && (
                        <button
                            type="button"
                            className="limpiar-busqueda"
                            onClick={() => setBusqueda('')}
                            aria-label="Limpiar búsqueda"
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    )}
                </div>

                <select
                    value={filtroEstado}
                    onChange={(evento) => setFiltroEstado(evento.target.value)}
                >
                    <option value="Todos">Todos los estados</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Asignada">Asignada</option>
                    <option value="En curso">En curso</option>
                    <option value="En espera">En espera</option>
                    <option value="Resuelta">Resuelta</option>
                    <option value="Cerrada">Cerrada</option>
                </select>

                <select
                    value={filtroCategoria}
                    onChange={(evento) => setFiltroCategoria(evento.target.value)}
                >
                    <option value="Todas">Todas las categorías</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Red">Red</option>
                    <option value="Impresoras">Impresoras</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                </select>

                {(busqueda || filtroEstado !== 'Todos' || filtroCategoria !== 'Todas') && (
                    <button type="button" className="btn btn-outline-secondary" onClick={limpiarFiltros}>
                        Limpiar filtros
                    </button>
                )}
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <div className="tabla-solicitudes">
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Asunto</th>
                                <th>Categoría</th>
                                <th>Prioridad</th>
                                <th>Estado</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>

                        <tbody>
                            {solicitudesFiltradas.length > 0 ? (
                                solicitudesFiltradas.map((solicitud) => (
                                    <tr key={solicitud.id}>
                                        <td>{`#ST-${solicitud.id}`}</td>
                                        <td>{solicitud.title}</td>
                                        <td>{solicitud.category}</td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    solicitud.priority === 'Alta'
                                                        ? 'bg-danger'
                                                        : solicitud.priority === 'Media'
                                                          ? 'bg-warning text-dark'
                                                          : 'bg-success'
                                                }`}
                                            >
                                                {solicitud.priority}
                                            </span>
                                        </td>
                                        <td>
                                            <InsigniaEstadoSolicitud estado={solicitud.status} />
                                        </td>
                                        <td>{solicitud.createdAt}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-muted">
                                        No hay solicitudes que coincidan con los filtros seleccionados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MisSolicitudes;
