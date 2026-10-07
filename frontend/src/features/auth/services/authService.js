import { apiClient } from '../../../shared/api/httpClient';

export const loginService = {
    async login(credentials) {
        const normalizedUsername = String(credentials?.username ?? '').trim();
        const normalizedPassword = String(credentials?.password ?? '').trim();

        const result = await apiClient.request({
            url: '/auth/login',
            method: 'POST',
            body: {
                username: normalizedUsername,
                password: normalizedPassword,
            },
        });

        if (!result?.user || !result?.token) {
            throw new Error('La respuesta del servidor no es válida.');
        }

        sessionStorage.setItem('support_user', JSON.stringify(result.user));
        sessionStorage.setItem('support_token', result.token);

        return result;
    },

    logout() {
        sessionStorage.removeItem('support_user');
        sessionStorage.removeItem('support_token');
    },
};
