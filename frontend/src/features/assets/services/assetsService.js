import { apiClient } from '../../../shared/api/httpClient';
import { assetMapper } from '../utils/assetMapper';

export const assetsService = {
    async list(filters = {}) {
        const response = await apiClient.request({
            url: '/assets',
            method: 'GET',
            query: {
                search: filters.search ?? '',
                status: filters.status ?? 'Todos',
                category: filters.category ?? 'Todas',
            },
        });

        return {
            items: (response?.items ?? []).map(assetMapper.fromApi),
            total: response?.total ?? 0,
        };
    },
};
