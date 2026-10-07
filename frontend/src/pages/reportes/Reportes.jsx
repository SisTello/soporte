const metrics = [
    { label: 'Solicitudes abiertas', value: '18', tone: 'primary', icon: 'bi-ticket-perforated' },
    { label: 'Incidentes críticos', value: '2', tone: 'danger', icon: 'bi-exclamation-triangle' },
    { label: 'Tiempo promedio', value: '4.2h', tone: 'warning', icon: 'bi-clock' },
    { label: 'SLA cumplido', value: '94%', tone: 'success', icon: 'bi-check-circle' },
];

const recentReports = [
    { area: 'Tecnología', value: '7 reportes', status: 'En revisión' },
    { area: 'Administración', value: '5 reportes', status: 'OK' },
    { area: 'Seguridad', value: '3 reportes', status: 'Crítico' },
];

const Reportes = () => (
    <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <div className="text-uppercase text-muted small fw-semibold">Reportes</div>
                <h1 className="mb-0">Centro de indicadores</h1>
            </div>
            <button type="button" className="btn btn-primary">
                <i className="bi bi-download me-2" />
                Exportar
            </button>
        </div>

        <div className="row g-4 mb-4">
            {metrics.map((metric) => (
                <div className="col-xl-3 col-md-6" key={metric.label}>
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div>
                                <div className="text-muted small">{metric.label}</div>
                                <div className="fs-3 fw-bold">{metric.value}</div>
                            </div>
                            <div className={`rounded-circle bg-${metric.tone} bg-opacity-10 p-3 text-${metric.tone}`}>
                                <i className={`bi ${metric.icon} fs-4`} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="row g-4">
            <div className="col-lg-7">
                <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                        <h5 className="card-title mb-3">Rendimiento por área</h5>
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Área</th>
                                        <th>Solicitudes</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentReports.map((report) => (
                                        <tr key={report.area}>
                                            <td>{report.area}</td>
                                            <td>{report.value}</td>
                                            <td>
                                                <span className={`badge ${report.status === 'Crítico' ? 'bg-danger' : report.status === 'OK' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                    {report.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-5">
                <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                        <h5 className="card-title mb-3">Resumen ejecutivo</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item px-0">
                                <strong>68%</strong> de incidencias resueltas dentro del SLA.
                            </li>
                            <li className="list-group-item px-0">
                                <strong>12</strong> tickets del último mes requieren seguimiento técnico.
                            </li>
                            <li className="list-group-item px-0">
                                <strong>3</strong> activos con mantenimiento preventivo vencido.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Reportes;
