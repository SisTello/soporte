const inventory = [
    { item: 'Cartuchos láser', stock: 24, state: 'Disponibles' },
    { item: 'Teclados USB', stock: 12, state: 'Bajo stock' },
    { item: 'Cables HDMI', stock: 31, state: 'Disponibles' },
    { item: 'Discos duros SSD', stock: 6, state: 'Por reordenar' },
];

const Repuestos = () => (
    <div className="container-fluid p-4">
        <div className="mb-4">
            <div className="text-uppercase text-muted small fw-semibold">Repuestos</div>
            <h1 className="mb-0">Inventario de insumos</h1>
        </div>

        <div className="card border-0 shadow-sm">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Stock</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map((item) => (
                                <tr key={item.item}>
                                    <td>{item.item}</td>
                                    <td>{item.stock}</td>
                                    <td>
                                        <span className={`badge ${item.state === 'Bajo stock' ? 'bg-warning text-dark' : item.state === 'Por reordenar' ? 'bg-danger' : 'bg-success'}`}>
                                            {item.state}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

export default Repuestos;
