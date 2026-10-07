import { create } from 'zustand';

import { requestsService } from '../../features/requests/services/requestsService';

export const useRequestsStore = create((set, get) => ({
    items: [],
    loading: false,
    error: null,
    filters: {
        search: '',
        status: 'Todos',
        category: 'Todas',
    },

    fetchRequests: async (nextFilters = {}) => {
        set({ loading: true, error: null });

        try {
            const filters = {
                ...get().filters,
                ...nextFilters,
            };

            const response = await requestsService.list(filters);

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

    createRequest: async (payload) => {
        set({ loading: true, error: null });

        try {
            const item = await requestsService.create(payload);
            set((state) => ({
                items: [item, ...state.items],
                loading: false,
                error: null,
            }));

            return item;
        } catch (error) {
            set({
                loading: false,
                error: error.message,
            });

            throw error;
        }
    },
}));
