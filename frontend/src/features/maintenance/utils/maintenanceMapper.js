export const maintenanceMapper = {
    fromApi(item) {
        return {
            id: item.id,
            asset: item.activo ?? item.asset ?? 'Sin nombre',
            code: item.codigo ?? item.code ?? '',
            type: item.tipo ?? item.type ?? 'Preventivo',
            category: item.categoria ?? item.category ?? 'General',
            scheduledDate: item.fechaProgramada ?? item.scheduledDate ?? '-',
            lastDate: item.fechaUltimo ?? item.lastDate ?? '-',
            nextDate: item.proximaFecha ?? item.nextDate ?? '-',
            technician: item.tecnico ?? item.technician ?? 'Sin asignar',
            status: item.estado ?? item.status ?? 'Programado',
            priority: item.prioridad ?? item.priority ?? 'Media',
            branch: item.sucursal ?? item.branch ?? 'Sucursal Central',
        };
    },
};
