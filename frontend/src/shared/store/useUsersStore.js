import { create } from 'zustand';

import { usersService } from '../../features/users/services/usersService';

export const useUsersStore = create((set, get) => ({
    items: [],
    loading: false,
    error: null,
    filters: {
        search: '',
        role: 'Todos',
        status: 'Todos',
    },
    summary: {
        total: 0,
        active: 0,
        onBreak: 0,
        inactive: 0,
    },

    fetchUsers: async (nextFilters = {}) => {
        set({ loading: true, error: null });

        try {
            const filters = {
                ...get().filters,
                ...nextFilters,
            };

            const response = await usersService.list(filters);

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

    createUser: async (payload) => {
        set({ loading: true, error: null });

        try {
            const item = await usersService.create(payload);

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
