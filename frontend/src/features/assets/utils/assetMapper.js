export const assetMapper = {
    fromApi(item) {
        return {
            id: item.id,
            codigo: item.codigo ?? item.code ?? '',
            numeroInventarioContable: item.numeroInventarioContable ?? item.accountingInventoryNumber ?? 'Sin inventario',
            nombre: item.nombre ?? item.name ?? 'Sin nombre',
            categoria: item.categoria ?? item.category ?? 'Sin categoría',
            fabricante: item.fabricante ?? item.manufacturer ?? 'Sin fabricante',
            marca: item.marca ?? item.brand ?? 'Sin marca',
            modelo: item.modelo ?? item.model ?? '',
            serie: item.serie ?? item.serial ?? 'Sin serie',
            estado: item.estado ?? item.status ?? 'Operativo',
            responsable: item.responsable ?? item.responsible ?? 'Sin responsable',
            departamento: item.departamento ?? item.department ?? 'Tecnología',
            sucursal: item.sucursal ?? item.branch ?? 'Sucursal Central',
            ubicacion: item.ubicacion ?? item.location ?? 'No especificado',
            detalle: item.detalle ?? item.detail ?? 'Sin detalle',
            observacion: item.observacion ?? item.observation ?? 'Sin observación',
            fechaAdquisicion: item.fechaAdquisicion ?? item.acquisitionDate ?? '',
        };
    },
};
