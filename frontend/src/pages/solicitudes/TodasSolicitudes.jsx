import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { solicitudes } from '../../datos/solicitudes';

import InsigniaEstadoSolicitud
    from '../../components/solicitudes/InsigniaEstadoSolicitud';

import './TodasSolicitudes.scss';

const TodasSolicitudes = () => {
    const navigate = useNavigate();

    const [busqueda, setBusqueda] = useState('');
    const [estado, setEstado] = useState('Todos');
    const [categoria, setCategoria] = useState('Todas');
    const [prioridad, setPrioridad] = useState('Todas');
    const [tecnico, setTecnico] = useState('Todos');
    const [sucursal, setSucursal] = useState('Todas');

    const tecnicos = [
        ...new Set(
            solicitudes
                .map((solicitud) => solicitud.tecnico)
                .filter(Boolean)
        ),
    ];

    const sucursales = [
        ...new Set(
            solicitudes.map(
                (solicitud) => solicitud.sucursal
            )
        ),
    ];

    const solicitudesFiltradas = useMemo(() => {
        const texto = busqueda
            .trim()
            .toLowerCase();

        return solicitudes.filter((solicitud) => {

            const coincideBusqueda =
                !texto ||
                solicitud.titulo
                    .toLowerCase()
                    .includes(texto) ||
                String(solicitud.id).includes(texto) ||
                solicitud.solicitante
                    .toLowerCase()
                    .includes(texto);

            const coincideEstado =
                estado === 'Todos' ||
                solicitud.estado === estado;

            const coincideCategoria =
                categoria === 'Todas' ||
                solicitud.categoria === categoria;

            const coincidePrioridad =
                prioridad === 'Todas' ||
                solicitud.prioridad === prioridad;

            const coincideTecnico =
                tecnico === 'Todos' ||
                solicitud.tecnico === tecnico;

            const coincideSucursal =
                sucursal === 'Todas' ||
                solicitud.sucursal === sucursal;

            return (
                coincideBusqueda &&
                coincideEstado &&
                coincideCategoria &&
                coincidePrioridad &&
                coincideTecnico &&
                coincideSucursal
            );
        });
    }, [
        busqueda,
        estado,
        categoria,
        prioridad,
        tecnico,
        sucursal,
    ]);

    const total = solicitudes.length;

    const pendientes = solicitudes.filter(
        (solicitud) =>
            solicitud.estado === 'Pendiente'
    ).length;

    const enCurso = solicitudes.filter(
        (solicitud) =>
            solicitud.estado === 'En curso'
    ).length;

    const sinAsignar = solicitudes.filter(
        (solicitud) =>
            !solicitud.tecnico
    ).length;

    const limpiarFiltros = () => {
        setBusqueda('');
        setEstado('Todos');
        setCategoria('Todas');
        setPrioridad('Todas');
        setTecnico('Todos');
        setSucursal('Todas');
    };

    return (
        <div className="todas-solicitudes">

            <div className="encabezado-pagina">

                <div>
                    <span className="titulo-seccion">
                        Gestión de soporte
                    </span>

                    <h1>
                        Todas las solicitudes
                    </h1>

                    <p>
                        Administra y realiza seguimiento
                        de las solicitudes de soporte.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn boton-nueva"
                    onClick={() =>
                        navigate('/solicitudes/nueva')
                    }
                >
                    <i className="bi bi-plus-lg"></i>
                    Nueva solicitud
                </button>

            </div>


            {/* RESUMEN */}

            <div className="resumen-solicitudes">

                <div className="resumen-card">
                    <span>Total</span>
                    <strong>{total}</strong>
                    <i className="bi bi-ticket-perforated"></i>
                </div>

                <div className="resumen-card">
                    <span>Pendientes</span>
                    <strong>{pendientes}</strong>
                    <i className="bi bi-clock"></i>
                </div>

                <div className="resumen-card">
                    <span>En curso</span>
                    <strong>{enCurso}</strong>
                    <i className="bi bi-tools"></i>
                </div>

                <div className="resumen-card">
                    <span>Sin asignar</span>
                    <strong>{sinAsignar}</strong>
                    <i className="bi bi-person-x"></i>
                </div>

            </div>


            {/* FILTROS */}

            <div className="filtros-solicitudes">

                <div className="campo-busqueda">

                    <i className="bi bi-search"></i>

                    <input
                        type="text"
                        placeholder="Buscar por solicitud, número o solicitante..."
                        value={busqueda}
                        onChange={(evento) =>
                            setBusqueda(
                                evento.target.value
                            )
                        }
                    />

                </div>


                <select
                    value={estado}
                    onChange={(evento) =>
                        setEstado(evento.target.value)
                    }
                >
                    <option value="Todos">
                        Todos los estados
                    </option>

                    <option value="Pendiente">
                        Pendiente
                    </option>

                    <option value="Asignada">
                        Asignada
                    </option>

                    <option value="En curso">
                        En curso
                    </option>

                    <option value="En espera">
                        En espera
                    </option>

                    <option value="Resuelta">
                        Resuelta
                    </option>

                    <option value="Cerrada">
                        Cerrada
                    </option>
                </select>


                <select
                    value={categoria}
                    onChange={(evento) =>
                        setCategoria(evento.target.value)
                    }
                >
                    <option value="Todas">
                        Todas las categorías
                    </option>

                    <option value="Hardware">
                        Hardware
                    </option>

                    <option value="Software">
                        Software
                    </option>

                    <option value="Red">
                        Red
                    </option>

                    <option value="Impresoras">
                        Impresoras
                    </option>
                </select>


                <select
                    value={prioridad}
                    onChange={(evento) =>
                        setPrioridad(evento.target.value)
                    }
                >
                    <option value="Todas">
                        Todas las prioridades
                    </option>

                    <option value="Alta">
                        Alta
                    </option>

                    <option value="Media">
                        Media
                    </option>

                    <option value="Baja">
                        Baja
                    </option>
                </select>


                <select
                    value={tecnico}
                    onChange={(evento) =>
                        setTecnico(evento.target.value)
                    }
                >
                    <option value="Todos">
                        Todos los técnicos
                    </option>

                    {tecnicos.map((nombre) => (
                        <option
                            key={nombre}
                            value={nombre}
                        >
                            {nombre}
                        </option>
                    ))}
                </select>


                <select
                    value={sucursal}
                    onChange={(evento) =>
                        setSucursal(evento.target.value)
                    }
                >
                    <option value="Todas">
                        Todas las sucursales
                    </option>

                    {sucursales.map((nombre) => (
                        <option
                            key={nombre}
                            value={nombre}
                        >
                            {nombre}
                        </option>
                    ))}
                </select>


                <button
                    type="button"
                    className="boton-limpiar"
                    onClick={limpiarFiltros}
                >
                    <i className="bi bi-arrow-counterclockwise"></i>
                    Limpiar
                </button>

            </div>


            {/* TABLA */}

            <div className="tabla-contenedor">

                <div className="tabla-encabezado">

                    <span>
                        {solicitudesFiltradas.length}{' '}
                        solicitudes encontradas
                    </span>

                </div>


                {solicitudesFiltradas.length === 0 ? (

                    <div className="sin-resultados">

                        <i className="bi bi-inbox"></i>

                        <h3>
                            No se encontraron solicitudes
                        </h3>

                        <p>
                            Prueba modificando los filtros.
                        </p>

                    </div>

                ) : (

                    <div className="tabla-scroll">

                        <table>

                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Solicitud</th>
                                    <th>Solicitante</th>
                                    <th>Categoría</th>
                                    <th>Prioridad</th>
                                    <th>Estado</th>
                                    <th>Técnico</th>
                                    <th>Sucursal</th>
                                    <th>Fecha</th>
                                    <th></th>
                                </tr>

                            </thead>

                            <tbody>

                                {solicitudesFiltradas.map(
                                    (solicitud) => (

                                        <tr
                                            key={
                                                solicitud.id
                                            }
                                        >

                                            <td>
                                                <span className="numero">
                                                    #{solicitud.id}
                                                </span>
                                            </td>

                                            <td>
                                                <strong>
                                                    {solicitud.titulo}
                                                </strong>
                                            </td>

                                            <td>
                                                {solicitud.solicitante}
                                            </td>

                                            <td>
                                                {solicitud.categoria}
                                            </td>

                                            <td>
                                                <span
                                                    className={`prioridad prioridad-${solicitud.prioridad.toLowerCase()}`}
                                                >
                                                    {solicitud.prioridad}
                                                </span>
                                            </td>

                                            <td>
                                                <InsigniaEstadoSolicitud
                                                    estado={
                                                        solicitud.estado
                                                    }
                                                />
                                            </td>

                                            <td>
                                                {solicitud.tecnico ||
                                                    'Sin asignar'}
                                            </td>

                                            <td>
                                                {solicitud.sucursal}
                                            </td>

                                            <td>
                                                {solicitud.fecha}
                                            </td>

                                            <td>

                                                <button
                                                    type="button"
                                                    className="boton-ver"
                                                    title="Ver solicitud"
                                                    onClick={() =>
                                                        navigate(
                                                            `/solicitudes/${solicitud.id}`
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-eye"></i>
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
};

export default TodasSolicitudes;