import { create } from 'zustand';

import { maintenanceService } from '../../features/maintenance/services/maintenanceService';

export const useMaintenanceStore = create((set, get) => ({
    items: [],
    loading: false,
    error: null,
    filters: {
        search: '',
        type: 'Todos',
        status: 'Todos',
        priority: 'Todos',
    },
    summary: {
        total: 0,
        scheduled: 0,
        inProgress: 0,
        completed: 0,
        highPriority: 0,
    },

    fetchMaintenance: async (nextFilters = {}) => {
        set({ loading: true, error: null });

        try {
            const filters = {
                ...get().filters,
                ...nextFilters,
            };

            const response = await maintenanceService.list(filters);

            set({
                items: response.items,
                filters,
                summary: response.summary,
                loading: false,
                error: null,
            });

            return response;
        } catch (error) {
            set({
                loading: false,
                error: error.message,
            });

            throw error;
        }
    },
}));
