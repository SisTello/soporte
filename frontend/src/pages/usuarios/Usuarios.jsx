import { useEffect, useMemo, useState } from 'react';

import { useUsersStore } from '../../shared/store/useUsersStore';

const getStatusClassName = (status) => {
    if (status === 'Activo') {
        return 'bg-success';
    }

    if (status === 'En descanso') {
        return 'bg-warning text-dark';
    }

    return 'bg-secondary';
};

const Usuarios = () => {
    const { items, loading, error, summary, fetchUsers } = useUsersStore();
    const [search, setSearch] = useState('');
    const [role, setRole] = useState('Todos');
    const [status, setStatus] = useState('Todos');

    useEffect(() => {
        fetchUsers({
            search: '',
            role: 'Todos',
            status: 'Todos',
        }).catch(() => {});
    }, [fetchUsers]);

    const roles = useMemo(
        () => ['Todos', ...new Set(items.map((user) => user.role))],
        [items]
    );

    const filteredUsers = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return items.filter((user) => {
            const matchesSearch =
                !normalizedSearch ||
                user.name.toLowerCase().includes(normalizedSearch) ||
                user.username.toLowerCase().includes(normalizedSearch) ||
                user.email.toLowerCase().includes(normalizedSearch) ||
                user.area.toLowerCase().includes(normalizedSearch);

            const matchesRole = role === 'Todos' || user.role === role;
            const matchesStatus = status === 'Todos' || user.status === status;

            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [items, role, search, status]);

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <div className="text-uppercase text-muted small fw-semibold">Personal</div>
                    <h1 className="mb-0">Equipo técnico</h1>
                </div>
                <button type="button" className="btn btn-primary">
                    <i className="bi bi-person-plus me-2" />
                    Nuevo usuario
                </button>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <div className="text-muted small">Total</div>
                            <h3 className="mb-0">{summary.total || items.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <div className="text-muted small">Activos</div>
                            <h3 className="mb-0">{summary.active}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <div className="text-muted small">En descanso</div>
                            <h3 className="mb-0">{summary.onBreak}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <div className="text-muted small">Inactivos</div>
                            <h3 className="mb-0">{summary.inactive}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-5">
                            <label className="form-label text-muted small mb-1">Buscar personal</label>
                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <i className="bi bi-search" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre, usuario, email o área"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label text-muted small mb-1">Rol</label>
                            <select
                                className="form-select"
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
                            >
                                {roles.map((currentRole) => (
                                    <option key={currentRole} value={currentRole}>
                                        {currentRole}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label text-muted small mb-1">Estado</label>
                            <select
                                className="form-select"
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                            >
                                <option value="Todos">Todos</option>
                                <option value="Activo">Activo</option>
                                <option value="En descanso">En descanso</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {loading && items.length === 0 ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-3 mb-0 text-muted">Cargando personal...</p>
                </div>
            ) : (
                <div className="row g-4">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((usuario) => (
                            <div className="col-xl-4 col-md-6" key={usuario.id}>
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div
                                                    className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-semibold"
                                                    style={{ width: 48, height: 48 }}
                                                >
                                                    {usuario.initials}
                                                </div>
                                                <div>
                                                    <h5 className="mb-0">{usuario.name}</h5>
                                                    <small className="text-muted">{usuario.username}</small>
                                                </div>
                                            </div>
                                            <span className={`badge ${getStatusClassName(usuario.status)}`}>
                                                {usuario.status}
                                            </span>
                                        </div>

                                        <ul className="list-unstyled mb-3 small">
                                            <li className="mb-2"><strong>Rol:</strong> {usuario.role}</li>
                                            <li className="mb-2"><strong>Área:</strong> {usuario.area}</li>
                                            <li className="mb-2"><strong>Sucursal:</strong> {usuario.branch}</li>
                                            <li className="mb-2"><strong>Email:</strong> {usuario.email}</li>
                                            <li><strong>Teléfono:</strong> {usuario.phone || 'No disponible'}</li>
                                        </ul>

                                        <button type="button" className="btn btn-outline-primary btn-sm w-100">
                                            Ver detalle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body text-center py-5 text-muted">
                                    No se encontró personal con los filtros seleccionados.
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Usuarios;
