export const requestMapper = {
    fromApi(item) {
        return {
            id: item.id,

            title:
                item.titulo ??
                item.title ??
                'Sin título',

            category:
                item.categoria ??
                item.category ??
                'Otro',

            priority:
                item.prioridad ??
                item.priority ??
                'Media',

            status:
                item.estado ??
                item.status ??
                'Pendiente',

            requestor:
                item.solicitante ??
                item.requestor ??
                'No asignado',

            department:
                item.departamento ??
                item.department ??
                'Tecnología',

            location:
                item.sucursal ??
                item.location ??
                'Sucursal Central',

            technician:
                item.tecnico ??
                item.technician ??
                null,

            createdAt:
                item.fecha
                    ? `${item.fecha} ${item.hora ?? ''}`.trim()
                    : item.createdAt ??
                      new Date().toISOString(),

            description:
                item.descripcion ??
                item.description ??
                '',

            /*
             * Datos del activo asociado
             */

            activoId:
                item.activoId ??
                item.assetId ??
                null,

            codigoActivo:
                item.codigoActivo ??
                item.assetCode ??
                '',

            tipoActivo:
                item.tipoActivo ??
                item.assetType ??
                '',

            ubicacion:
                item.ubicacion ??
                item.assetLocation ??
                '',

            disponibilidad:
                item.disponibilidad ??
                item.availability ??
                '',

            /*
             * Datos de anulación
             */

            motivoAnulacion:
                item.motivoAnulacion ??
                item.cancellationReason ??
                '',
        };
    },

    toApi(request) {
        return {
            titulo: request.title,

            categoria: request.category,

            prioridad: request.priority,

            descripcion: request.description,

            solicitante: request.requestor,

            departamento: request.department,

            sucursal: request.location,

            ubicacion: request.ubicacion,

            tipoActivo: request.tipoActivo,

            codigoActivo: request.codigoActivo,

            disponibilidad: request.disponibilidad,
        };
    },
};