import { useMemo, useState } from 'react';

import { mantenimientos } from '../../datos/mantenimientos';

import './Correctivos.scss';

const Correctivos = () => {

    const [busqueda, setBusqueda] = useState('');
    const [estado, setEstado] = useState('Todos');

    const correctivos = useMemo(() => {

        return mantenimientos.filter(
            (mantenimiento) => {

                const esCorrectivo =
                    mantenimiento.tipo ===
                    'Correctivo';

                const texto =
                    busqueda
                        .trim()
                        .toLowerCase();

                const coincideBusqueda =
                    !texto ||
                    mantenimiento.activo
                        .toLowerCase()
                        .includes(texto) ||
                    mantenimiento.codigo
                        .toLowerCase()
                        .includes(texto);

                const coincideEstado =
                    estado === 'Todos' ||
                    mantenimiento.estado === estado;

                return (
                    esCorrectivo &&
                    coincideBusqueda &&
                    coincideEstado
                );
            }
        );

    }, [busqueda, estado]);

    return (
        <div className="correctivos-pagina">

            <div className="encabezado-mantenimiento">

                <div>
                    <span>Atención de incidencias</span>

                    <h1>
                        Mantenimientos correctivos
                    </h1>

                    <p>
                        Gestiona intervenciones originadas
                        por fallas o incidencias de los
                        activos.
                    </p>
                </div>

            </div>


            <div className="correctivos-filtros">

                <div className="campo-busqueda">

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

                <select
                    value={estado}
                    onChange={(e) =>
                        setEstado(e.target.value)
                    }
                >
                    <option value="Todos">
                        Todos los estados
                    </option>

                    <option value="Programado">
                        Programado
                    </option>

                    <option value="En curso">
                        En curso
                    </option>

                    <option value="Completado">
                        Completado
                    </option>
                </select>

            </div>


            <div className="correctivos-lista">

                {correctivos.map(
                    (mantenimiento) => (

                        <div
                            className="correctivo-card"
                            key={mantenimiento.id}
                        >

                            <div className="correctivo-icono">
                                <i className="bi bi-wrench-adjustable"></i>
                            </div>


                            <div className="correctivo-info">

                                <span>
                                    ORDEN #
                                    {mantenimiento.id}
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

                                <div className="correctivo-meta">

                                    <span>
                                        <i className="bi bi-person"></i>
                                        {
                                            mantenimiento
                                                .tecnico
                                        }
                                    </span>

                                    <span>
                                        <i className="bi bi-calendar"></i>
                                        {
                                            mantenimiento
                                                .fechaProgramada
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


                            <div className="correctivo-estado">

                                <span
                                    className={`estado estado-${mantenimiento.estado
                                        .toLowerCase()
                                        .replace(
                                            ' ',
                                            '-'
                                        )}`}
                                >
                                    {
                                        mantenimiento
                                            .estado
                                    }
                                </span>

                                <strong>
                                    Prioridad{' '}
                                    {
                                        mantenimiento
                                            .prioridad
                                    }
                                </strong>

                            </div>

                        </div>

                    )
                )}

            </div>

        </div>
    );
};

export default Correctivos;