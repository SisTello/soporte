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

                <div className="user-profile">
                    <div className="user-avatar">
                        <i className="bi bi-person"></i>
                    </div>

                    <div className="user-info">
                        <strong>{user?.fullName ?? 'Soporte Técnico'}</strong>
                        <span>{user?.role ?? 'Administrador'}</span>
                    </div>

                    <button type="button" className="btn btn-link p-0 ms-2 text-decoration-none" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Topbar;