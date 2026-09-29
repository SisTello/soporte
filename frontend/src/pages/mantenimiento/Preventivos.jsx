import { useMemo, useState } from 'react';

import { mantenimientos } from '../../datos/mantenimientos';

import './Preventivos.scss';

const Preventivos = () => {

    const [busqueda, setBusqueda] = useState('');

    const preventivos = useMemo(() => {

        return mantenimientos.filter(
            (mantenimiento) =>
                mantenimiento.tipo === 'Preventivo' &&
                (
                    !busqueda ||
                    mantenimiento.activo
                        .toLowerCase()
                        .includes(
                            busqueda.toLowerCase()
                        ) ||
                    mantenimiento.codigo
                        .toLowerCase()
                        .includes(
                            busqueda.toLowerCase()
                        )
                )
        );

    }, [busqueda]);

    return (
        <div className="preventivos-pagina">

            <div className="encabezado-mantenimiento">

                <div>
                    <span>Mantenimiento programado</span>

                    <h1>
                        Mantenimientos preventivos
                    </h1>

                    <p>
                        Controla las tareas programadas
                        para conservar los activos
                        en condiciones operativas.
                    </p>
                </div>

            </div>

            <div className="preventivos-filtros">

                <div>
                    <i className="bi bi-search"></i>

                    <input
                        type="text"
                        placeholder="Buscar activo..."
                        value={busqueda}
                        onChange={(e) =>
                            setBusqueda(
                                e.target.value
                            )
                        }
                    />
                </div>

            </div>

            <div className="preventivos-grid">

                {preventivos.map(
                    (mantenimiento) => (

                        <article
                            className="preventivo-card"
                            key={mantenimiento.id}
                        >

                            <div className="preventivo-icono">
                                <i className="bi bi-calendar-check"></i>
                            </div>

                            <div className="preventivo-contenido">

                                <span className="preventivo-codigo">
                                    {mantenimiento.codigo}
                                </span>

                                <h3>
                                    {mantenimiento.activo}
                                </h3>

                                <p>
                                    {
                                        mantenimiento
                                            .categoria
                                    }
                                </p>

                                <div className="preventivo-datos">

                                    <div>
                                        <span>
                                            Último mantenimiento
                                        </span>

                                        <strong>
                                            {
                                                mantenimiento
                                                    .fechaUltimo
                                            }
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            Próximo mantenimiento
                                        </span>

                                        <strong>
                                            {
                                                mantenimiento
                                                    .proximaFecha
                                            }
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            Técnico
                                        </span>

                                        <strong>
                                            {
                                                mantenimiento
                                                    .tecnico
                                            }
                                        </strong>
                                    </div>

                                </div>

                            </div>

                            <div className="preventivo-estado">
                                <span>
                                    {mantenimiento.estado}
                                </span>
                            </div>

                        </article>

                    )
                )}

            </div>

        </div>
    );
};

export default Preventivos;