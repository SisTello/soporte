import { usuarios } from '../../../datos/usuarios';
import { userMapper } from '../utils/userMapper';

const normalizeValue = (value) => String(value ?? '').trim();

export const usersService = {
    async list(filters = {}) {
        const search = normalizeValue(filters.search).toLowerCase();
        const role = filters.role ?? 'Todos';
        const status = filters.status ?? 'Todos';

        let items = usuarios.map((user) => userMapper.fromApi(user));

        if (search) {
            items = items.filter((user) => {
                const hayCoincidencia =
                    user.name.toLowerCase().includes(search) ||
                    user.username.toLowerCase().includes(search) ||
                    user.email.toLowerCase().includes(search) ||
                    user.area.toLowerCase().includes(search);

                return hayCoincidencia;
            });
        }

        if (role !== 'Todos') {
            items = items.filter((user) => user.role === role);
        }

        if (status !== 'Todos') {
            items = items.filter((user) => user.status === status);
        }

        const summary = {
            total: items.length,
            active: items.filter((user) => user.status === 'Activo').length,
            onBreak: items.filter((user) => user.status === 'En descanso').length,
            inactive: items.filter((user) => user.status === 'Inactivo').length,
        };

        return {
            items,
            total: items.length,
            summary,
        };
    },

    async create(payload) {
        const nextUser = userMapper.toApi(payload);
        const item = userMapper.fromApi(nextUser);

        return item;
    },

    async update(id, payload) {
        const item = userMapper.toApi({
            ...payload,
            id,
        });

        return userMapper.fromApi(item);
    },
};
