import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { solicitudes } from '../../datos/solicitudes';

import InsigniaEstadoSolicitud
    from '../../components/solicitudes/InsigniaEstadoSolicitud';

import './MisSolicitudes.scss';

const MisSolicitudes = () => {
    const navigate = useNavigate();

    const [busqueda, setBusqueda] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('Todos');
    const [filtroCategoria, setFiltroCategoria] =
        useState('Todas');

    /*
     * Por ahora simulamos el usuario autenticado.
     * Posteriormente este valor vendrá del contexto
     * de autenticación.
     */
    const usuarioActual = 'Evert Cuevas';

    const misSolicitudes = solicitudes.filter(
        (solicitud) =>
            solicitud.solicitante === usuarioActual
    );

    const solicitudesFiltradas = useMemo(() => {
        const texto = busqueda
            .trim()
            .toLowerCase();

        return misSolicitudes.filter((solicitud) => {
            const coincideBusqueda =
                !texto ||
                solicitud.titulo
                    .toLowerCase()
                    .includes(texto) ||
                String(solicitud.id).includes(texto);

            const coincideEstado =
                filtroEstado === 'Todos' ||
                solicitud.estado === filtroEstado;

            const coincideCategoria =
                filtroCategoria === 'Todas' ||
                solicitud.categoria === filtroCategoria;

            return (
                coincideBusqueda &&
                coincideEstado &&
                coincideCategoria
            );
        });
    }, [
        misSolicitudes,
        busqueda,
        filtroEstado,
        filtroCategoria,
    ]);

    const total = misSolicitudes.length;

    const abiertas = misSolicitudes.filter(
        (solicitud) =>
            solicitud.estado === 'Pendiente' ||
            solicitud.estado === 'Asignada' ||
            solicitud.estado === 'En espera'
    ).length;

    const enCurso = misSolicitudes.filter(
        (solicitud) =>
            solicitud.estado === 'En curso'
    ).length;

    const finalizadas = misSolicitudes.filter(
        (solicitud) =>
            solicitud.estado === 'Resuelta' ||
            solicitud.estado === 'Cerrada'
    ).length;

    const limpiarFiltros = () => {
        setBusqueda('');
        setFiltroEstado('Todos');
        setFiltroCategoria('Todas');
    };

    return (
        <div className="solicitudes-pagina">

            {/* ENCABEZADO */}

            <div className="encabezado-pagina">

                <div>
                    <span className="titulo-seccion">
                        Solicitudes
                    </span>

                    <h1>
                        Mis solicitudes
                    </h1>

                    <p>
                        Consulta y realiza seguimiento
                        de tus solicitudes de soporte.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn boton-nueva-solicitud"
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


            {/* FILTROS */}

            <div className="filtros-solicitudes">

                <div className="campo-busqueda">

                    <i className="bi bi-search"></i>

                    <input
                        type="text"
                        placeholder="Buscar por solicitud o número..."
                        value={busqueda}
                        onChange={(evento) =>
                            setBusqueda(
                                evento.target.value
                            )
                        }
                    />

                    {busqueda && (
                        <button
                            type="button"
                            className="limpiar-busqueda"
                            onClick={() =>
                                setBusqueda('')
                            }
                            aria-label="Limpiar búsqueda"
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    )}

                </div>


                <select
                    value={filtroEstado}
                    onChange={(evento) =>
                        setFiltroEstado(
                            evento.target.value
                        )
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
                    value={filtroCategoria}
                    onChange={(evento) =>
                        setFiltroCategoria(
                            evento.target.value
                        )
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


                {(busqueda ||
                    filtroEstado !== 'Todos' ||
                    filtroCategoria !== 'Todas') && (

                    <button
                        type="button"
                        className="boton-limpiar-filtros"
                        onClick={limpiarFiltros}
                    >
                        <i className="bi bi-arrow-counterclockwise"></i>
                        Limpiar
                    </button>

                )}

            </div>


            {/* RESULTADOS */}

            <div className="encabezado-resultados">

                <span>
                    {solicitudesFiltradas.length}{' '}
                    {solicitudesFiltradas.length === 1
                        ? 'solicitud encontrada'
                        : 'solicitudes encontradas'}
                </span>

            </div>


            <div className="lista-solicitudes">

                {solicitudesFiltradas.length === 0 ? (

                    <div className="estado-vacio">

                        <div className="estado-vacio-icono">
                            <i className="bi bi-inbox"></i>
                        </div>

                        <h3>
                            No se encontraron solicitudes
                        </h3>

                        <p>
                            No existen solicitudes que
                            coincidan con los filtros
                            seleccionados.
                        </p>

                        <button
                            type="button"
                            className="btn boton-limpiar-vacio"
                            onClick={limpiarFiltros}
                        >
                            Limpiar filtros
                        </button>

                    </div>

                ) : (

                    solicitudesFiltradas.map(
                        (solicitud) => (

                            <div
                                className="tarjeta-solicitud"
                                key={solicitud.id}
                            >

                                <div className="contenido-solicitud">

                                    <div className="icono-solicitud">
                                        <i className="bi bi-ticket-detailed"></i>
                                    </div>


                                    <div className="informacion-solicitud">

                                        <div className="fila-titulo-solicitud">

                                            <div>
                                                <span className="numero-solicitud">
                                                    SOLICITUD #
                                                    {solicitud.id}
                                                </span>

                                                <h3>
                                                    {solicitud.titulo}
                                                </h3>
                                            </div>

                                            <InsigniaEstadoSolicitud
                                                estado={
                                                    solicitud.estado
                                                }
                                            />

                                        </div>


                                        <div className="metadatos-solicitud">

                                            <span>
                                                <i className="bi bi-tag"></i>
                                                {solicitud.categoria}
                                            </span>

                                            <span>
                                                <i className="bi bi-exclamation-circle"></i>
                                                {solicitud.prioridad}
                                            </span>

                                            <span>
                                                <i className="bi bi-calendar3"></i>
                                                {solicitud.fecha}
                                            </span>

                                            <span>
                                                <i className="bi bi-building"></i>
                                                {solicitud.sucursal}
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                <button
                                    type="button"
                                    className="boton-detalle"
                                    onClick={() =>
                                        navigate(
                                            `/solicitudes/${solicitud.id}`
                                        )
                                    }
                                >
                                    Ver detalle

                                    <i className="bi bi-arrow-right"></i>
                                </button>

                            </div>

                        )
                    )

                )}

            </div>

        </div>
    );
};

export default MisSolicitudes;