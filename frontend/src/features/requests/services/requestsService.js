import { apiClient } from '../../../shared/api/httpClient';
import { requestMapper } from '../utils/requestMapper';

export const requestsService = {
    async list(filters = {}) {
        const response = await apiClient.request({
            url: '/requests',
            method: 'GET',
            query: {
                search: filters.search ?? '',
                status: filters.status ?? 'Todos',
                category: filters.category ?? 'Todas',
            },
        });

        return {
            items: (response?.items ?? []).map(requestMapper.fromApi),
            total: response?.total ?? 0,
        };
    },

    async create(payload) {
        const result = await apiClient.request({
            url: '/requests/create',
            method: 'POST',
            body: requestMapper.toApi(payload),
        });

        return requestMapper.fromApi(result?.item ?? payload);
    },
};
