const getInitials = (fullName) =>
    fullName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('') || 'US';

export const userMapper = {
    fromApi(user) {
        const fullName = user?.nombre ?? user?.name ?? 'Sin nombre';

        return {
            id: Number(user?.id ?? 0),
            name: fullName,
            username: user?.username ?? user?.userName ?? 'sin-usuario',
            email: user?.email ?? '',
            role: user?.rol ?? user?.role ?? 'Sin rol',
            area: user?.area ?? 'Sin área',
            branch: user?.sucursal ?? user?.branch ?? 'Sin sucursal',
            status: user?.estado ?? user?.status ?? 'Activo',
            phone: user?.telefono ?? user?.phone ?? '',
            initials: getInitials(fullName),
        };
    },

    toApi(user) {
        return {
            id: user?.id ?? Date.now(),
            nombre: user?.name ?? 'Sin nombre',
            username: user?.username ?? '',
            email: user?.email ?? '',
            rol: user?.role ?? 'Sin rol',
            area: user?.area ?? 'Sin área',
            sucursal: user?.branch ?? 'Sin sucursal',
            estado: user?.status ?? 'Activo',
            telefono: user?.phone ?? '',
        };
    },
};
