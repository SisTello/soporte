import './Dashboard.scss';

const Dashboard = () => {

    return (
        <div className="dashboard-page">

            <div className="dashboard-header">

                <div>
                    <h1>Inicio</h1>

                    <p>
                        Centro de Soporte y Mantenimiento
                    </p>
                </div>

                <button className="btn btn-primary">

                    <i className="bi bi-plus-lg me-2"></i>

                    Nueva solicitud

                </button>

            </div>


            {/* Indicadores */}

            <div className="row g-4 mb-4">

                <div className="col-xl-3 col-md-6">

                    <div className="dashboard-card">

                        <div className="card-icon blue">
                            <i className="bi bi-ticket-perforated"></i>
                        </div>

                        <div>
                            <span>Solicitudes abiertas</span>
                            <strong>18</strong>
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
                            <strong>7</strong>
                        </div>

                    </div>

                </div>


                <div className="col-xl-3 col-md-6">

                    <div className="dashboard-card">

                        <div className="card-icon green">
                            <i className="bi bi-check-circle"></i>
                        </div>

                        <div>
                            <span>Resueltas hoy</span>
                            <strong>12</strong>
                        </div>

                    </div>

                </div>


                <div className="col-xl-3 col-md-6">

                    <div className="dashboard-card">

                        <div className="card-icon red">
                            <i className="bi bi-exclamation-triangle"></i>
                        </div>

                        <div>
                            <span>Incidentes críticos</span>
                            <strong>2</strong>
                        </div>

                    </div>

                </div>

            </div>


            {/* Contenido */}

            <div className="row g-4">

                <div className="col-lg-8">

                    <div className="dashboard-panel">

                        <div className="panel-header">

                            <div>
                                <h5>Solicitudes recientes</h5>

                                <span>
                                    Últimas solicitudes registradas
                                </span>
                            </div>

                            <button className="btn btn-sm btn-outline-primary">
                                Ver todas
                            </button>

                        </div>


                        <div className="table-responsive">

                            <table className="table align-middle">

                                <thead>

                                    <tr>
                                        <th>ID</th>
                                        <th>Asunto</th>
                                        <th>Usuario</th>
                                        <th>Prioridad</th>
                                        <th>Estado</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    <tr>

                                        <td>
                                            <strong>#ST-1024</strong>
                                        </td>

                                        <td>
                                            Computadora no enciende
                                        </td>

                                        <td>
                                            Juan Pérez
                                        </td>

                                        <td>
                                            <span className="badge bg-danger">
                                                Alta
                                            </span>
                                        </td>

                                        <td>
                                            <span className="badge bg-warning text-dark">
                                                En atención
                                            </span>
                                        </td>

                                    </tr>


                                    <tr>

                                        <td>
                                            <strong>#ST-1023</strong>
                                        </td>

                                        <td>
                                            Problemas con impresora
                                        </td>

                                        <td>
                                            María López
                                        </td>

                                        <td>
                                            <span className="badge bg-secondary">
                                                Media
                                            </span>
                                        </td>

                                        <td>
                                            <span className="badge bg-primary">
                                                Pendiente
                                            </span>
                                        </td>

                                    </tr>


                                    <tr>

                                        <td>
                                            <strong>#ST-1022</strong>
                                        </td>

                                        <td>
                                            Acceso al sistema
                                        </td>

                                        <td>
                                            Carlos Rojas
                                        </td>

                                        <td>
                                            <span className="badge bg-secondary">
                                                Media
                                            </span>
                                        </td>

                                        <td>
                                            <span className="badge bg-success">
                                                Resuelto
                                            </span>
                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>


                <div className="col-lg-4">

                    <div className="dashboard-panel">

                        <div className="panel-header">

                            <div>
                                <h5>Actividad</h5>

                                <span>
                                    Estado del servicio
                                </span>
                            </div>

                        </div>


                        <div className="activity-item">

                            <div className="activity-icon green">
                                <i className="bi bi-check"></i>
                            </div>

                            <div>
                                <strong>
                                    Sistema operativo
                                </strong>

                                <span>
                                    Funcionando correctamente
                                </span>
                            </div>

                        </div>


                        <div className="activity-item">

                            <div className="activity-icon green">
                                <i className="bi bi-wifi"></i>
                            </div>

                            <div>
                                <strong>
                                    Red corporativa
                                </strong>

                                <span>
                                    Operativa
                                </span>
                            </div>

                        </div>


                        <div className="activity-item">

                            <div className="activity-icon yellow">
                                <i className="bi bi-tools"></i>
                            </div>

                            <div>
                                <strong>
                                    Mantenimiento
                                </strong>

                                <span>
                                    3 equipos programados
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;