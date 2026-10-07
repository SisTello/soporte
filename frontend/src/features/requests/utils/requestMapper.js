export const requestMapper = {
    fromApi(item) {
        return {
            id: item.id,
            title: item.titulo ?? item.title ?? 'Sin título',
            category: item.categoria ?? item.category ?? 'Otro',
            priority: item.prioridad ?? item.priority ?? 'Media',
            status: item.estado ?? item.status ?? 'Pendiente',
            requestor: item.solicitante ?? item.requestor ?? 'No asignado',
            department: item.departamento ?? item.department ?? 'Tecnología',
            location: item.sucursal ?? item.location ?? 'Sucursal Central',
            technician: item.tecnico ?? item.technician ?? null,
            createdAt: item.fecha ? `${item.fecha} ${item.hora ?? ''}`.trim() : item.createdAt ?? new Date().toISOString(),
            description: item.descripcion ?? item.description ?? '',
        };
    },

    toApi(request) {
        return {
            titulo: request.title,
            categoria: request.category,
            prioridad: request.priority,
            descripcion: request.description,
            solicitante: request.requestor,
            departamento: request.department,
            sucursal: request.location,
        };
    },
};
