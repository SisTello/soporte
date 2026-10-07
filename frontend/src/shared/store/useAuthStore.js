import { create } from 'zustand';

import { loginService } from '../../features/auth/services/authService';

const readStoredUser = () => {
    try {
        const rawUser = sessionStorage.getItem('support_user');
        return rawUser ? JSON.parse(rawUser) : null;
    } catch {
        return null;
    }
};

export const useAuthStore = create((set, get) => ({
    user: readStoredUser(),
    token: sessionStorage.getItem('support_token') ?? null,
    status: 'idle',
    error: null,

    login: async (credentials) => {
        set({ status: 'loading', error: null });

        try {
            const result = await loginService.login(credentials);

            set({
                user: result.user,
                token: result.token,
                status: 'succeeded',
                error: null,
            });

            return result;
        } catch (error) {
            set({
                status: 'failed',
                error: error.message,
            });

            throw error;
        }
    },

    logout: () => {
        loginService.logout();
        set({
            user: null,
            token: null,
            status: 'idle',
            error: null,
        });
    },

    isAuthenticated: () => Boolean(get().user && get().token),
}));
