export const assetMapper = {
    fromApi(item) {
        return {
            id: item.id,
            code: item.codigo ?? item.code ?? '',
            name: item.nombre ?? item.name ?? 'Sin nombre',
            category: item.categoria ?? item.category ?? 'Sin categoría',
            status: item.estado ?? item.status ?? 'Operativo',
            responsible: item.responsable ?? item.responsible ?? 'Sin responsable',
            department: item.departamento ?? item.department ?? 'Tecnología',
            branch: item.sucursal ?? item.branch ?? 'Sucursal Central',
            location: item.ubicacion ?? item.location ?? 'No especificado',
            acquisitionDate: item.fechaAdquisicion ?? item.acquisitionDate ?? '',
            model: item.modelo ?? item.model ?? '',
            brand: item.marca ?? item.brand ?? '',
            serial: item.serie ?? item.serial ?? '',
        };
    },
};
