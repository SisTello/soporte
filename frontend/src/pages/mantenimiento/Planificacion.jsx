import { mantenimientos } from '../../datos/mantenimientos';

import './Planificacion.scss';

const Planificacion = () => {

    const programados = mantenimientos.filter(
        (mantenimiento) =>
            mantenimiento.estado === 'Programado'
    );

    return (
        <div className="planificacion-pagina">

            <div className="encabezado-mantenimiento">

                <div>
                    <span>Agenda técnica</span>

                    <h1>Planificación</h1>

                    <p>
                        Consulta los mantenimientos
                        programados y próximos trabajos.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn boton-planificar"
                >
                    <i className="bi bi-plus-lg"></i>
                    Programar mantenimiento
                </button>

            </div>


            <div className="planificacion-resumen">

                <div>
                    <i className="bi bi-calendar-event"></i>

                    <span>Programados</span>

                    <strong>
                        {programados.length}
                    </strong>
                </div>

                <div>
                    <i className="bi bi-tools"></i>

                    <span>Esta semana</span>

                    <strong>2</strong>
                </div>

                <div>
                    <i className="bi bi-exclamation-triangle"></i>

                    <span>Prioridad alta</span>

                    <strong>
                        {
                            mantenimientos.filter(
                                (m) =>
                                    m.prioridad ===
                                    'Alta'
                            ).length
                        }
                    </strong>
                </div>

            </div>


            <div className="agenda">

                <div className="agenda-titulo">
                    <i className="bi bi-calendar3"></i>
                    Próximos mantenimientos
                </div>


                {programados.map(
                    (mantenimiento) => (

                        <div
                            className="agenda-item"
                            key={mantenimiento.id}
                        >

                            <div className="agenda-fecha">

                                <strong>
                                    {
                                        mantenimiento
                                            .fechaProgramada
                                    }
                                </strong>

                                <span>
                                    {
                                        mantenimiento
                                            .tipo
                                    }
                                </span>

                            </div>


                            <div className="agenda-contenido">

                                <h3>
                                    {mantenimiento.activo}
                                </h3>

                                <p>
                                    {
                                        mantenimiento
                                            .categoria
                                    }
                                </p>

                                <div>

                                    <span>
                                        <i className="bi bi-person"></i>
                                        {
                                            mantenimiento
                                                .tecnico
                                        }
                                    </span>

                                    <span>
                                        <i className="bi bi-building"></i>
                                        {
                                            mantenimiento
                                                .sucursal
                                        }
                                    </span>

                                </div>

                            </div>


                            <span className="agenda-estado">
                                Programado
                            </span>

                        </div>

                    )
                )}

            </div>

        </div>
    );
};

export default Planificacion;