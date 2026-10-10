import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../../shared/store/useAuthStore';

import './Topbar.scss';

const Topbar = ({
    onToggleSidebar,
    onToggleMobile
}) => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const userMenuRef = useRef(null);

    useEffect(() => {
        const handlePointerDown = (event) => {
            if (!userMenuRef.current?.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsUserMenuOpen(false);
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <header className="topbar">
            <div className="topbar-left">
                <button className="sidebar-toggle desktop-toggle" onClick={onToggleSidebar}>
                    <i className="bi bi-list"></i>
                </button>

                <button className="sidebar-toggle mobile-toggle" onClick={onToggleMobile}>
                    <i className="bi bi-list"></i>
                </button>

                <div className="topbar-title">Centro de Soporte</div>
            </div>

            <div className="topbar-right">
                <button className="notification-button" type="button">
                    <i className="bi bi-bell"></i>
                    <span className="notification-badge">3</span>
                </button>

                <div className="user-menu" ref={userMenuRef}>
                    <button
                        type="button"
                        className="user-profile"
                        aria-haspopup="menu"
                        aria-expanded={isUserMenuOpen}
                        onClick={() => setIsUserMenuOpen((open) => !open)}
                    >
                        <span className="user-avatar">
                            <i className="bi bi-person"></i>
                        </span>

                        <span className="user-info">
                            <strong>{user?.fullName ?? 'Soporte Técnico'}</strong>
                            <span>{user?.role ?? 'Administrador'}</span>
                        </span>

                        <i className={`bi bi-chevron-down user-menu-chevron ${isUserMenuOpen ? 'is-open' : ''}`} />
                    </button>

                    {isUserMenuOpen && (
                        <div className="user-menu__dropdown" role="menu">
                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    setIsUserMenuOpen(false);
                                    setIsProfileOpen(true);
                                }}
                            >
                                <i className="bi bi-person" />
                                Mi perfil
                            </button>

                            <button type="button" role="menuitem" onClick={handleLogout}>
                                <i className="bi bi-box-arrow-right" />
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {isProfileOpen && (
                <div
                    className="profile-modal-backdrop"
                    onClick={() => setIsProfileOpen(false)}
                >
                    <section
                        className="profile-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="profile-modal-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <header className="profile-modal__header">
                            <div>
                                <span>Cuenta</span>
                                <h2 id="profile-modal-title">Mi perfil</h2>
                            </div>
                            <button
                                type="button"
                                className="profile-modal__close"
                                aria-label="Cerrar perfil"
                                onClick={() => setIsProfileOpen(false)}
                            >
                                <i className="bi bi-x-lg" />
                            </button>
                        </header>

                        <div className="profile-modal__body">
                            <div className="profile-modal__avatar">
                                <i className="bi bi-person" />
                            </div>
                            <dl>
                                <div>
                                    <dt>Nombre</dt>
                                    <dd>{user?.fullName ?? 'Soporte Técnico'}</dd>
                                </div>
                                <div>
                                    <dt>Usuario</dt>
                                    <dd>{user?.username ?? 'No disponible'}</dd>
                                </div>
                                <div>
                                    <dt>Rol</dt>
                                    <dd>{user?.role ?? 'Administrador'}</dd>
                                </div>
                            </dl>
                        </div>
                    </section>
                </div>
            )}
        </header>
    );
};

export default Topbar;