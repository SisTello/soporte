import './InsigniaEstadoSolicitud.scss';

const InsigniaEstadoSolicitud = ({ estado }) => {
    const clasesEstado = {
        Pendiente: 'estado-pendiente',
        Asignada: 'estado-asignada',
        'En curso': 'estado-en-curso',
        'En espera': 'estado-en-espera',
        Resuelta: 'estado-resuelta',
        Cerrada: 'estado-cerrada',
    };

    return (
        <span
            className={`insignia-estado ${
                clasesEstado[estado] || ''
            }`}
        >
            {estado}
        </span>
    );
};

export default InsigniaEstadoSolicitud;