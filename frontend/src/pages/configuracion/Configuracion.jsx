const settingsGroups = [
    {
        title: 'General',
        items: [
            { label: 'Nombre del sistema', value: 'Centro de Soporte' },
            { label: 'Zona horaria', value: 'México / CDMX' },
            { label: 'Idioma', value: 'Español' },
        ],
    },
    {
        title: 'Seguridad',
        items: [
            { label: 'Autenticación', value: 'JWT + refresh token' },
            { label: 'MFA', value: 'Exigido para administradores' },
            { label: 'Auditoría', value: 'Habilitada' },
        ],
    },
    {
        title: 'Integración',
        items: [
            { label: 'API base', value: 'https://api.soporte.local' },
            { label: 'Almacenamiento', value: 'API + caché local' },
            { label: 'Sincronización', value: 'Cada 5 minutos' },
        ],
    },
];

const Configuracion = () => (
    <div className="container-fluid p-4">
        <div className="mb-4">
            <div className="text-uppercase text-muted small fw-semibold">Configuración</div>
            <h1 className="mb-0">Ajustes del sistema</h1>
        </div>

        <div className="row g-4">
            {settingsGroups.map((group) => (
                <div className="col-lg-4" key={group.title}>
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title mb-3">{group.title}</h5>
                            <div className="list-group list-group-flush">
                                {group.items.map((item) => (
                                    <div className="list-group-item px-0" key={item.label}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="text-muted">{item.label}</span>
                                            <strong>{item.value}</strong>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Configuracion;
