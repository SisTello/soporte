import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../../shared/store/useAuthStore';

import './Login.scss';

const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const status = useAuthStore((state) => state.status);
    const error = useAuthStore((state) => state.error);

    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin123');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await login({ username, password });
            navigate('/inicio', { replace: true });
        } catch {
            // Error handled by the store and displayed below the form.
        }
    };

    return (
        <div className="login-page">
            <div className="login-background">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <div className="login-logo">
                            <i className="bi bi-tools"></i>
                        </div>

                        <h1>Soporte</h1>

                        <p>
                            Servicio de Soporte y Mantenimiento
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Usuario</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-person"></i>
                                </span>

                                <input
                                    id="username"
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingrese su usuario"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-lock"></i>
                                </span>

                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="Ingrese su contraseña"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="alert alert-danger py-2 small mb-3" role="alert">
                                {error}
                            </div>
                        )}

                        <button type="submit" className="btn btn-login w-100" disabled={status === 'loading'}>
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                            {status === 'loading' ? 'Ingresando...' : 'Ingresar'}
                        </button>
                    </form>

                    <div className="login-footer">
                        <span>Soporte y Mantenimiento</span>
                        <small>Sistema corporativo</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;