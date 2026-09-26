import './Topbar.scss';

const Topbar = ({
    onToggleSidebar,
    onToggleMobile
}) => {

    return (
        <header className="topbar">

            <div className="topbar-left">

                {/* PC */}
                <button
                    className="sidebar-toggle desktop-toggle"
                    onClick={onToggleSidebar}
                >
                    <i className="bi bi-list"></i>
                </button>

                {/* Móvil */}
                <button
                    className="sidebar-toggle mobile-toggle"
                    onClick={onToggleMobile}
                >
                    <i className="bi bi-list"></i>
                </button>

                <div className="topbar-title">
                    Centro de Soporte
                </div>

            </div>


            <div className="topbar-right">

                <button className="notification-button">

                    <i className="bi bi-bell"></i>

                    <span className="notification-badge">
                        3
                    </span>

                </button>


                <div className="user-profile">

                    <div className="user-avatar">
                        <i className="bi bi-person"></i>
                    </div>

                    <div className="user-info">

                        <strong>
                            Soporte Técnico
                        </strong>

                        <span>
                            Administrador
                        </span>

                    </div>

                    <i className="bi bi-chevron-down"></i>

                </div>

            </div>

        </header>
    );
};

export default Topbar;