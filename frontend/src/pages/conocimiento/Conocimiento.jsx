const articles = [
    { title: 'Reset de contraseña corporativa', category: 'Seguridad', updated: 'Hace 2 días' },
    { title: 'Configuración de impresora HP', category: 'Hardware', updated: 'Hace 4 días' },
    { title: 'Diagnóstico de red Wi-Fi', category: 'Red', updated: 'Hace 1 semana' },
    { title: 'Mantenimiento preventivo de laptops', category: 'Mantenimiento', updated: 'Hace 8 días' },
];

const Conocimiento = () => (
    <div className="container-fluid p-4">
        <div className="mb-4">
            <div className="text-uppercase text-muted small fw-semibold">Base de conocimiento</div>
            <h1 className="mb-0">Artículos y guías</h1>
        </div>

        <div className="row g-4">
            {articles.map((article) => (
                <div className="col-lg-6" key={article.title}>
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <span className="badge bg-light text-dark">{article.category}</span>
                                <small className="text-muted">{article.updated}</small>
                            </div>
                            <h5 className="card-title">{article.title}</h5>
                            <p className="text-muted mb-0">
                                Guía técnica con pasos de resolución, comprobación y validación.
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Conocimiento;
