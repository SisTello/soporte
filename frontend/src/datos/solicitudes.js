export const solicitudes = [
    {
        id: 125,
        titulo: 'Computadora no enciende',
        categoria: 'Hardware',
        prioridad: 'Alta',
        estado: 'En curso',
        solicitante: 'Evert Cuevas',
        departamento: 'Tecnología',
        sucursal: 'Sucursal Central',
        tecnico: 'Carlos Pérez',
        fecha: '28/09/2026',
        hora: '08:30',
        descripcion:
            'La computadora de escritorio no enciende desde esta mañana. Al presionar el botón de encendido no se observa ninguna señal.',
    },
    {
        id: 124,
        titulo: 'Problema con impresora',
        categoria: 'Impresoras',
        prioridad: 'Media',
        estado: 'Pendiente',
        solicitante: 'María López',
        departamento: 'Administración',
        sucursal: 'Sucursal Central',
        tecnico: null,
        fecha: '27/09/2026',
        hora: '14:20',
        descripcion:
            'La impresora presenta problemas al imprimir documentos y genera atascos de papel.',
    },
    {
        id: 123,
        titulo: 'Sin conexión a la red',
        categoria: 'Red',
        prioridad: 'Alta',
        estado: 'Resuelta',
        solicitante: 'Juan Pérez',
        departamento: 'Contabilidad',
        sucursal: 'Sucursal Norte',
        tecnico: 'Ana Rodríguez',
        fecha: '26/09/2026',
        hora: '10:15',
        descripcion:
            'El equipo no puede acceder a los recursos compartidos de la red corporativa.',
    },
    {
        id: 122,
        titulo: 'Instalación de software',
        categoria: 'Software',
        prioridad: 'Baja',
        estado: 'Cerrada',
        solicitante: 'Carlos Flores',
        departamento: 'Recursos Humanos',
        sucursal: 'Sucursal Central',
        tecnico: 'Pedro Vargas',
        fecha: '25/09/2026',
        hora: '09:40',
        descripcion:
            'Solicitud de instalación de una aplicación requerida para las actividades del área.',
    },
    {
        id: 121,
        titulo: 'Monitor presenta fallas',
        categoria: 'Hardware',
        prioridad: 'Media',
        estado: 'Asignada',
        solicitante: 'Laura Mendoza',
        departamento: 'Ventas',
        sucursal: 'Sucursal Sur',
        tecnico: 'Carlos Pérez',
        fecha: '24/09/2026',
        hora: '11:30',
        descripcion:
            'El monitor presenta parpadeos y pérdida intermitente de imagen.',
    },
];

export const obtenerSolicitudPorId = (id) => {
    return solicitudes.find(
        (solicitud) => solicitud.id === Number(id)
    );
};