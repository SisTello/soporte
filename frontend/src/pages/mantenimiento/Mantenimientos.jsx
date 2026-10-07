import { useEffect, useMemo, useState } from 'react';

import { useMaintenanceStore } from '../../shared/store/useMaintenanceStore';

import './Mantenimientos.scss';

const Mantenimientos = () => {
    const { items, loading, error, summary, fetchMaintenance } = useMaintenanceStore();

    const [busqueda, setBusqueda] = useState('');
    const [tipo, setTipo] = useState('Todos');
    const [estado, setEstado] = useState('Todos');
    const [prioridad, setPrioridad] = useState('Todos');

    useEffect(() => {
        fetchMaintenance({
            search: '',
            type: 'Todos',
            status: 'Todos',
            priority: 'Todos',
        }).catch(() => {});
    }, [fetchMaintenance]);

    const filtrados = useMemo(() => {
        const texto = busqueda.trim().toLowerCase();

        return items.filter((mantenimiento) => {
            const coincideBusqueda =
                !texto ||
                mantenimiento.asset.toLowerCase().includes(texto) ||
                mantenimiento.code.toLowerCase().includes(texto) ||
                mantenimiento.technician.toLowerCase().includes(texto);

            const coincideTipo = tipo === 'Todos' || mantenimiento.type === tipo;
            const coincideEstado = estado === 'Todos' || mantenimiento.status === estado;
            const coincidePrioridad = prioridad === 'Todos' || mantenimiento.priority === prioridad;

            return coincideBusqueda && coincideTipo && coincideEstado && coincidePrioridad;
        });
    }, [busqueda, tipo, estado, prioridad, items]);

    return (
        <div className="mantenimiento-pagina">
            <div className="encabezado-mantenimiento">
                <div>
                    <span>Gestión técnica</span>
                    <h1>Mantenimientos</h1>
                    <p>Consulta y administra los mantenimientos registrados.</p>
                </div>
            </div>

            <div className="mantenimiento-resumen">
                <div>
                    <span>Total</span>
                    <strong>{summary.total || items.length}</strong>
                </div>
                <div>
                    <span>Programados</span>
                    <strong>{summary.scheduled}</strong>
                </div>
                <div>
                    <span>En curso</span>
                    <strong>{summary.inProgress}</strong>
                </div>
                <div>
                    <span>Completados</span>
                    <strong>{summary.completed}</strong>
                </div>
            </div>

            <div className="mantenimiento-filtros">
                <div className="campo-busqueda">
                    <i className="bi bi-search"></i>
                    <input
                        type="text"
                        placeholder="Buscar activo, código o técnico..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="Todos">Todos los tipos</option>
                    <option value="Preventivo">Preventivo</option>
                    <option value="Correctivo">Correctivo</option>
                </select>

                <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option value="Todos">Todos los estados</option>
                    <option value="Programado">Programado</option>
                    <option value="En curso">En curso</option>
                    <option value="Completado">Completado</option>
                </select>

                <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                    <option value="Todos">Todas las prioridades</option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                </select>
            </div>

            {error && (
                <div className="alert alert-danger mb-3" role="alert">{error}</div>
            )}

            {loading && items.length === 0 ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-3 mb-0 text-muted">Cargando mantenimientos...</p>
                </div>
            ) : (
                <div className="tabla-mantenimiento">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Activo</th>
                                <th>Tipo</th>
                                <th>Categoría</th>
                                <th>Fecha</th>
                                <th>Técnico</th>
                                <th>Estado</th>
                                <th>Prioridad</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtrados.length > 0 ? (
                                filtrados.map((mantenimiento) => (
                                    <tr key={mantenimiento.id}>
                                        <td>#{mantenimiento.id}</td>
                                        <td>
                                            <strong>{mantenimiento.asset}</strong>
                                            <small>{mantenimiento.code}</small>
                                        </td>
                                        <td>
                                            <span className="etiqueta-tipo">{mantenimiento.type}</span>
                                        </td>
                                        <td>{mantenimiento.category}</td>
                                        <td>{mantenimiento.scheduledDate}</td>
                                        <td>{mantenimiento.technician}</td>
                                        <td>
                                            <span className={`badge ${mantenimiento.status === 'Programado' ? 'bg-primary' : mantenimiento.status === 'En curso' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                                {mantenimiento.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${mantenimiento.priority === 'Alta' ? 'bg-danger' : mantenimiento.priority === 'Media' ? 'bg-secondary' : 'bg-light text-dark'}`}>
                                                {mantenimiento.priority}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-4 text-muted">
                                        No se encontraron resultados para esta combinación de filtros.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Mantenimientos;