import { useMemo, useState } from 'react';

import { activos } from '../../datos/activos';

import './TablaActivos.scss';

const TablaActivos = ({
    titulo,
    descripcion,
    categoria = null,
}) => {

    const [busqueda, setBusqueda] = useState('');
    const [estado, setEstado] = useState('Todos');
    const [sucursal, setSucursal] = useState('Todas');

    const registros = useMemo(() => {

        const texto = busqueda.trim().toLowerCase();

        return activos.filter((activo) => {

            const coincideCategoria =
                !categoria ||
                activo.categoria === categoria;

            const coincideEstado =
                estado === 'Todos' ||
                activo.estado === estado;

            const coincideSucursal =
                sucursal === 'Todas' ||
                activo.sucursal === sucursal;

            const coincideBusqueda =
                !texto ||
                activo.codigo.toLowerCase().includes(texto) ||
                activo.nombre.toLowerCase().includes(texto) ||
                activo.marca.toLowerCase().includes(texto) ||
                activo.responsable.toLowerCase().includes(texto);

            return (
                coincideCategoria &&
                coincideEstado &&
                coincideSucursal &&
                coincideBusqueda
            );
        });

    }, [
        busqueda,
        estado,
        sucursal,
        categoria,
    ]);

    const total = registros.length;

    const operativos = registros.filter(
        (activo) =>
            activo.estado === 'Operativo'
    ).length;

    const mantenimiento = registros.filter(
        (activo) =>
            activo.estado === 'En mantenimiento'
    ).length;

    const fueraServicio = registros.filter(
        (activo) =>
            activo.estado === 'Fuera de servicio'
    ).length;

    const limpiar = () => {
        setBusqueda('');
        setEstado('Todos');
        setSucursal('Todas');
    };

    return (
        <div className="activos-pagina">

            {/* ENCABEZADO */}

            <div className="activos-encabezado">

                <div>

                    <span className="activos-kicker">
                        Gestión de activos
                    </span>

                    <h1>{titulo}</h1>

                    <p>
                        {descripcion}
                    </p>

                </div>

                <div className="activos-icono">
                    <i className="bi bi-pc-display-horizontal"></i>
                </div>

            </div>


            {/* RESUMEN */}

            <div className="activos-resumen">

                <div className="activo-resumen-card">

                    <div>
                        <span>Total</span>
                        <strong>{total}</strong>
                    </div>

                    <i className="bi bi-box-seam"></i>

                </div>


                <div className="activo-resumen-card">

                    <div>
                        <span>Operativos</span>
                        <strong>{operativos}</strong>
                    </div>

                    <i className="bi bi-check-circle"></i>

                </div>


                <div className="activo-resumen-card">

                    <div>
                        <span>En mantenimiento</span>
                        <strong>{mantenimiento}</strong>
                    </div>

                    <i className="bi bi-tools"></i>

                </div>


                <div className="activo-resumen-card">

                    <div>
                        <span>Fuera de servicio</span>
                        <strong>{fueraServicio}</strong>
                    </div>

                    <i className="bi bi-exclamation-circle"></i>

                </div>

            </div>


            {/* FILTROS */}

            <div className="activos-filtros">

                <div className="activo-busqueda">

                    <i className="bi bi-search"></i>

                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) =>
                            setBusqueda(e.target.value)
                        }
                        placeholder="Buscar por código, activo, marca o responsable..."
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

                    <option value="Operativo">
                        Operativo
                    </option>

                    <option value="En mantenimiento">
                        En mantenimiento
                    </option>

                    <option value="Fuera de servicio">
                        Fuera de servicio
                    </option>

                </select>


                <select
                    value={sucursal}
                    onChange={(e) =>
                        setSucursal(e.target.value)
                    }
                >

                    <option value="Todas">
                        Todas las sucursales
                    </option>

                    <option value="Sucursal Central">
                        Sucursal Central
                    </option>

                    <option value="Sucursal Norte">
                        Sucursal Norte
                    </option>

                    <option value="Sucursal Sur">
                        Sucursal Sur
                    </option>

                </select>


                <button
                    type="button"
                    className="activo-boton-limpiar"
                    onClick={limpiar}
                >
                    <i className="bi bi-arrow-counterclockwise"></i>
                    Limpiar
                </button>

            </div>


            {/* TABLA */}

            <div className="activos-tabla-contenedor">

                <div className="activos-tabla-superior">

                    <div>
                        <strong>
                            {registros.length}
                        </strong>{' '}
                        activos encontrados
                    </div>

                    <span>
                        {categoria ||
                            'Todos los tipos de activo'}
                    </span>

                </div>


                {registros.length === 0 ? (

                    <div className="activos-vacio">

                        <i className="bi bi-inbox"></i>

                        <h3>
                            No se encontraron activos
                        </h3>

                        <p>
                            Prueba modificando los filtros de búsqueda.
                        </p>

                    </div>

                ) : (

                    <div className="activos-tabla-scroll">

                        <table>

                            <thead>

                                <tr>

                                    <th>Código</th>

                                    <th>Activo</th>

                                    {!categoria && (
                                        <th>Categoría</th>
                                    )}

                                    <th>Marca</th>

                                    <th>Responsable</th>

                                    <th>Ubicación</th>

                                    <th>Sucursal</th>

                                    <th>Estado</th>

                                </tr>

                            </thead>


                            <tbody>

                                {registros.map((activo) => (

                                    <tr key={activo.id}>

                                        <td>

                                            <span className="activo-codigo">
                                                {activo.codigo}
                                            </span>

                                        </td>


                                        <td>

                                            <strong>
                                                {activo.nombre}
                                            </strong>

                                            <small>
                                                {activo.departamento}
                                            </small>

                                        </td>


                                        {!categoria && (
                                            <td>
                                                {activo.categoria}
                                            </td>
                                        )}


                                        <td>
                                            {activo.marca}
                                        </td>


                                        <td>
                                            {activo.responsable}
                                        </td>


                                        <td>
                                            {activo.ubicacion}
                                        </td>


                                        <td>
                                            {activo.sucursal}
                                        </td>


                                        <td>

                                            <span
                                                className={`activo-estado estado-${activo.estado
                                                    .toLowerCase()
                                                    .replaceAll(' ', '-')}`}
                                            >
                                                {activo.estado}
                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
};

export default TablaActivos;