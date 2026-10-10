import { activos } from '../../datos/activos';
import { solicitudes } from '../../datos/solicitudes';

export class ApiError extends Error {
    constructor(message, status, payload = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.payload = payload;
    }
}

const mockMode = true;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockEndpoints = {
    '/auth/login': async ({ body }) => {
        const username = String(body?.username ?? '').trim();
        const password = String(body?.password ?? '').trim();

        if (!username || !password) {
            throw new ApiError('Usuario y contraseña son requeridos.', 400);
        }

        if (password.length < 4) {
            throw new ApiError('La contraseña no es válida.', 400);
        }

        const normalizedUsername = username.toLowerCase();
        const user = {
            id: `user-${normalizedUsername || 'support'}`,
            username,
            fullName: normalizedUsername.includes('admin') ? 'Evert Cuevas' : 'Soporte Técnico',
            role: normalizedUsername.includes('admin') ? 'Administrador' : 'Técnico',
            department: 'Tecnología',
        };

        await sleep(350);

        return {
            user,
            token: `demo-token-${Date.now()}`,
        };
    },
    '/requests': async ({ query }) => {
        const search = String(query?.search ?? '').trim().toLowerCase();
        const status = query?.status ?? 'Todos';
        const category = query?.category ?? 'Todas';

        await sleep(300);

        let items = solicitudes;

        if (search) {
            items = items.filter((request) => {
                return String(
                    request.titulo ?? ''
                )
                    .toLowerCase()
                    .includes(search);
            });
        }

        if (status !== 'Todos') {
            items = items.filter((request) => request.estado === status);
        }

        if (category !== 'Todas') {
            items = items.filter((request) => request.categoria === category);
        }

        return {
            items,
            total: items.length,
        };
    },
    '/requests/create': async ({ body }) => {
        await sleep(350);

        const payload = {
            id: Date.now(),

            titulo:
                body?.titulo ??
                'Nueva solicitud',

            categoria:
                body?.categoria ??
                'Software',

            prioridad:
                body?.prioridad ??
                'Media',

            estado:
                'Pendiente',

            solicitante:
                body?.solicitante ??
                'Usuario actual',

            departamento:
                body?.departamento ??
                'Tecnología',

            sucursal:
                body?.sucursal ??
                'Sucursal Central',

            ubicacion:
                body?.ubicacion ??
                '',

            tipoActivo:
                body?.tipoActivo ??
                '',

            codigoActivo:
                body?.codigoActivo ??
                '',

            disponibilidad:
                body?.disponibilidad ??
                '',

            tecnico:
                null,

            fecha:
                new Date().toLocaleDateString('es-MX'),

            hora:
                new Date().toLocaleTimeString(
                    'es-MX',
                    {
                        hour: '2-digit',
                        minute: '2-digit',
                    }
                ),

            descripcion:
                body?.descripcion ??
                'Solicitud creada desde la interfaz.',
        };

        solicitudes.unshift(payload);

        return {
            item: payload,
        };
    },

    '/requests/:id/verify': async ({ body }) => {
        await sleep(350);

        const pathId = Number(
            String(body?.requestId ?? '')
        );

        /*
        * En el mock el ID se obtiene desde la URL.
        * La implementación real deberá recibirlo
        * directamente desde el backend.
        */

        const solicitud = solicitudes.find(
            (item) =>
                item.id === pathId
        );

        if (!solicitud) {
            throw new ApiError(
                'Solicitud no encontrada.',
                404
            );
        }

        const activo = activos.find(
            (item) =>
                item.id === Number(body?.activoId)
        );

        if (!activo) {
            throw new ApiError(
                'El activo seleccionado no existe.',
                404
            );
        }

        solicitud.estado = 'Asignada';

        solicitud.prioridad =
            body?.prioridad ??
            solicitud.prioridad;

        solicitud.activoId =
            activo.id;

        solicitud.codigoActivo =
            activo.codigo;

        solicitud.tipoActivo =
            activo.categoria;

        solicitud.ubicacion =
            activo.ubicacion;

        return {
            item: solicitud,
        };
    },

    '/requests/:id/cancel': async ({ body }) => {
        await sleep(350);

        const requestId =
            Number(body?.requestId);

        const solicitud =
            solicitudes.find(
                (item) =>
                    item.id === requestId
            );

        if (!solicitud) {
            throw new ApiError(
                'Solicitud no encontrada.',
                404
            );
        }

        const motivo =
            String(
                body?.motivoAnulacion ?? ''
            ).trim();

        if (!motivo) {
            throw new ApiError(
                'El motivo de anulación es obligatorio.',
                400
            );
        }

        solicitud.estado = 'Anulada';

        solicitud.motivoAnulacion =
            motivo;

        return {
            item: solicitud,
        };
    },

    '/assets': async ({ query }) => {
        const search = String(query?.search ?? '').trim().toLowerCase();
        const status = query?.status ?? 'Todos';
        const category = query?.category ?? 'Todas';

        await sleep(250);

        let items = activos;

        if (search) {
            items = items.filter((asset) => {
                const hayNombre = asset.nombre.toLowerCase().includes(search);
                const hayCodigo = asset.codigo.toLowerCase().includes(search);
                return hayNombre || hayCodigo;
            });
        }

        if (status !== 'Todos') {
            items = items.filter((asset) => asset.estado === status);
        }

        if (category !== 'Todas') {
            items = items.filter((asset) => asset.categoria === category);
        }

        return {
            items,
            total: items.length,
        };
    },
};

const readJsonBody = async (requestBody) => {
    if (!requestBody) {
        return null;
    }

    if (typeof requestBody === 'string') {
        try {
            return JSON.parse(requestBody);
        } catch {
            return requestBody;
        }
    }

    return requestBody;
};

export const request = async ({
    url,
    method = 'GET',
    body = null,
    headers = {},
    query = {},
    timeoutMs = 12000,
}) => {
    const targetUrl = String(url || '/').startsWith('/') ? String(url || '/') : `/${String(url || '/')}`;

    if (mockMode) {
        const payload = await readJsonBody(body);

        if (mockEndpoints[targetUrl]) {
            return mockEndpoints[targetUrl]({
                body: payload,
                query,
                method,
                url: targetUrl,
            });
        }

        const verifyMatch =
            targetUrl.match(
                /^\/requests\/(\d+)\/verify$/
            );

        if (verifyMatch) {
            return mockEndpoints['/requests/:id/verify']({
                body: {
                    ...payload,
                    requestId: verifyMatch[1],
                },
                query,
                method,
                url: targetUrl,
            });
        }

        const cancelMatch =
            targetUrl.match(
                /^\/requests\/(\d+)\/cancel$/
            );

        if (cancelMatch) {
            return mockEndpoints['/requests/:id/cancel']({
                body: {
                    ...payload,
                    requestId: cancelMatch[1],
                },
                query,
                method,
                url: targetUrl,
            });
        }
    }

    

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const token = sessionStorage.getItem('support_token');

        const response = await fetch(`https://example.invalid${targetUrl}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: body ? JSON.stringify(body) : undefined,
            signal: controller.signal,
        });

        const text = await response.text();
        const data = text ? JSON.parse(text) : null;

        if (!response.ok) {
            throw new ApiError(data?.message || 'La solicitud falló.', response.status, data);
        }

        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        if (error.name === 'AbortError') {
            throw new ApiError('La solicitud tomó demasiado tiempo.', 408);
        }

        throw new ApiError('No se pudo completar la solicitud.', 500, error);
    } finally {
        clearTimeout(timeoutId);
    }
};

export const apiClient = { request };
