import { create } from 'zustand';

import { assetsService } from '../../features/assets/services/assetsService';

export const useAssetsStore = create((set, get) => ({
    items: [],
    loading: false,
    error: null,
    filters: {
        search: '',
        status: 'Todos',
        category: 'Todas',
    },

    fetchAssets: async (nextFilters = {}) => {
        set({ loading: true, error: null });

        try {
            const filters = {
                ...get().filters,
                ...nextFilters,
            };

            const response = await assetsService.list(filters);

            set({
                items: response.items,
                filters,
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
