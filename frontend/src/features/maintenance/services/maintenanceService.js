import { mantenimientos } from '../../../datos/mantenimientos';
import { maintenanceMapper } from '../utils/maintenanceMapper';

export const maintenanceService = {
    async list(filters = {}) {
        const search = String(filters.search ?? '').trim().toLowerCase();
        const type = filters.type ?? 'Todos';
        const status = filters.status ?? 'Todos';
        const priority = filters.priority ?? 'Todos';

        let items = mantenimientos.map((item) => maintenanceMapper.fromApi(item));

        if (search) {
            items = items.filter((item) => {
                const matchAsset = item.asset.toLowerCase().includes(search);
                const matchCode = item.code.toLowerCase().includes(search);
                const matchTechnician = item.technician.toLowerCase().includes(search);
                return matchAsset || matchCode || matchTechnician;
            });
        }

        if (type !== 'Todos') {
            items = items.filter((item) => item.type === type);
        }

        if (status !== 'Todos') {
            items = items.filter((item) => item.status === status);
        }

        if (priority !== 'Todos') {
            items = items.filter((item) => item.priority === priority);
        }

        return {
            items,
            total: items.length,
            summary: {
                total: items.length,
                scheduled: items.filter((item) => item.status === 'Programado').length,
                inProgress: items.filter((item) => item.status === 'En curso').length,
                completed: items.filter((item) => item.status === 'Completado').length,
                highPriority: items.filter((item) => item.priority === 'Alta').length,
            },
        };
    },
};
