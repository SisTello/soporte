import { useEffect } from 'react';

import TablaActivos from '../../components/activos/TablaActivos';
import { useAssetsStore } from '../../shared/store/useAssetsStore';

const Inventario = () => {
    const { items, loading, error, fetchAssets } = useAssetsStore();

    useEffect(() => {
        fetchAssets({
            search: '',
            status: 'Todos',
            category: 'Todas',
        }).catch(() => {});
    }, [fetchAssets]);

    if (loading && items.length === 0) {
        return (
            <div className="container-fluid p-4">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-3 mb-0 text-muted">Cargando inventario...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {error && (
                <div className="container-fluid p-4 pb-0">
                    <div className="alert alert-danger" role="alert">{error}</div>
                </div>
            )}
            <TablaActivos
                titulo="Inventario de activos"
                descripcion="Consulta y controla los equipos y recursos tecnológicos de la empresa."
                datos={items}
            />
        </>
    );
};

export default Inventario;