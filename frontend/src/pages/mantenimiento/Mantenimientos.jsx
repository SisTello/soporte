import { useMemo, useState } from 'react';

import { mantenimientos } from '../../datos/mantenimientos';

import './Mantenimientos.scss';

const Mantenimientos = () => {
    const [busqueda, setBusqueda] = useState('');
    const [tipo, setTipo] = useState('Todos');
    const [estado, setEstado] = useState('Todos');

    const filtrados = useMemo(() => {
        const texto = busqueda
            .trim()
            .toLowerCase();

        return mantenimientos.filter(
            (mantenimiento) => {

                const coincideBusqueda =
                    !texto ||
                    mantenimiento.activo
                        .toLowerCase()
                        .includes(texto) ||
                    mantenimiento.codigo
                        .toLowerCase()
                        .includes(texto);

                const coincideTipo =
                    tipo === 'Todos' ||
                    mantenimiento.tipo === tipo;

                const coincideEstado =
                    estado === 'Todos' ||
                    mantenimiento.estado === estado;

                return (
                    coincideBusqueda &&
                    coincideTipo &&
                    coincideEstado
                );
            }
        );
    }, [busqueda, tipo, estado]);

    return (
        <div className="mantenimiento-pagina">

            <div className="encabezado-mantenimiento">

                <div>
                    <span>Gestión técnica</span>

                    <h1>Mantenimientos</h1>

                    <p>
                        Consulta y administra los
                        mantenimientos registrados.
                    </p>
                </div>

            </div>

            <div className="mantenimiento-resumen">

                <div>
                    <span>Total</span>
                    <strong>{mantenimientos.length}</strong>
                </div>

                <div>
                    <span>Programados</span>
                    <strong>
                        {
                            mantenimientos.filter(
                                (m) =>
                                    m.estado ===
                                    'Programado'
                            ).length
                        }
                    </strong>
                </div>

                <div>
                    <span>En curso</span>
                    <strong>
                        {
                            mantenimientos.filter(
                                (m) =>
                                    m.estado ===
                                    'En curso'
                            ).length
                        }
                    </strong>
                </div>

                <div>
                    <span>Completados</span>
                    <strong>
                        {
                            mantenimientos.filter(
                                (m) =>
                                    m.estado ===
                                    'Completado'
                            ).length
                        }
                    </strong>
                </div>

            </div>

            <div className="mantenimiento-filtros">

                <div className="campo-busqueda">
                    <i className="bi bi-search"></i>

                    <input
                        type="text"
                        placeholder="Buscar activo..."
                        value={busqueda}
                        onChange={(e) =>
                            setBusqueda(e.target.value)
                        }
                    />
                </div>

                <select
                    value={tipo}
                    onChange={(e) =>
                        setTipo(e.target.value)
                    }
                >
                    <option value="Todos">
                        Todos los tipos
                    </option>
                    <option value="Preventivo">
                        Preventivo
                    </option>
                    <option value="Correctivo">
                        Correctivo
                    </option>
                </select>

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

                        {filtrados.map(
                            (mantenimiento) => (

                                <tr
                                    key={
                                        mantenimiento.id
                                    }
                                >
                                    <td>
                                        #{mantenimiento.id}
                                    </td>

                                    <td>
                                        <strong>
                                            {
                                                mantenimiento
                                                    .activo
                                            }
                                        </strong>
                                        <small>
                                            {
                                                mantenimiento
                                                    .codigo
                                            }
                                        </small>
                                    </td>

                                    <td>
                                        <span className="etiqueta-tipo">
                                            {
                                                mantenimiento
                                                    .tipo
                                            }
                                        </span>
                                    </td>

                                    <td>
                                        {
                                            mantenimiento
                                                .categoria
                                        }
                                    </td>

                                    <td>
                                        {
                                            mantenimiento
                                                .fechaProgramada
                                        }
                                    </td>

                                    <td>
                                        {
                                            mantenimiento
                                                .tecnico
                                        }
                                    </td>

                                    <td>
                                        <span
                                            className={`estado-mantenimiento estado-${mantenimiento.estado
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
                                    </td>

                                    <td>
                                        {
                                            mantenimiento
                                                .prioridad
                                        }
                                    </td>
                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Mantenimientos;