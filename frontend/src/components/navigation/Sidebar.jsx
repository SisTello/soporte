import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './Sidebar.scss';

const Sidebar = ({
    collapsed,
    mobileOpen,
    onClose
}) => {

    const [openSection, setOpenSection] = useState(
        'solicitudes'
    );


    const toggleSection = (section) => {

        if (collapsed) {
            return;
        }

        setOpenSection(
            openSection === section
                ? null
                : section
        );
    };


    const handleNavigation = () => {

        if (window.innerWidth <= 768) {
            onClose();
        }
    };


    return (
        <>

            <div
                className={`sidebar-overlay ${
                    mobileOpen ? 'show' : ''
                }`}
                onClick={onClose}
            />


            <aside
                className={`
                    sidebar
                    ${collapsed ? 'collapsed' : ''}
                    ${mobileOpen ? 'mobile-open' : ''}
                `}
            >

                {/* ========================================
                    HEADER
                ========================================= */}

                <div className="sidebar-header">

                    <div className="sidebar-logo">
                        <i className="bi bi-tools"></i>
                    </div>

                    <div className="sidebar-title">

                        <strong>
                            Centro de
                        </strong>

                        <span>
                            Soporte
                        </span>

                    </div>


                    <button
                        className="mobile-close"
                        onClick={onClose}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>

                </div>


                {/* ========================================
                    MENU
                ========================================= */}

                <nav className="sidebar-menu">

                    {/* INICIO */}

                    <NavLink
                        to="/inicio"
                        className="menu-item"
                        onClick={handleNavigation}
                    >
                        <i className="bi bi-house-door"></i>

                        <span>
                            Inicio
                        </span>
                    </NavLink>


                    {/* ====================================
                        SOLICITUDES
                    ==================================== */}

                    <div className="menu-group">

                        <button
                            className={`
                                menu-item
                                menu-dropdown
                                ${
                                    openSection ===
                                    'solicitudes'
                                        ? 'open'
                                        : ''
                                }
                            `}
                            onClick={() =>
                                toggleSection(
                                    'solicitudes'
                                )
                            }
                        >

                            <i className="bi bi-ticket-perforated"></i>

                            <span>
                                Solicitudes
                            </span>

                            <i className="bi bi-chevron-down dropdown-arrow"></i>

                        </button>


                        <div
                            className={`
                                submenu
                                ${
                                    openSection ===
                                    'solicitudes'
                                        ? 'show'
                                        : ''
                                }
                            `}
                        >

                            <NavLink
                                to="/solicitudes/nueva"
                                className="submenu-item"
                                onClick={handleNavigation}
                            >
                                Nueva solicitud
                            </NavLink>

                            <NavLink
                                to="/solicitudes/mis-solicitudes"
                                className="submenu-item"
                                onClick={handleNavigation}
                            >
                                Mis solicitudes
                            </NavLink>

                            <NavLink
                                to="/solicitudes/todas"
                                className="submenu-item"
                                onClick={handleNavigation}
                            >
                                Todas las solicitudes
                            </NavLink>

                        </div>

                    </div>


                    {/* ====================================
                        MANTENIMIENTO
                    ==================================== */}

                    <div className="menu-group">

                        <button
                            className={`
                                menu-item
                                menu-dropdown
                                ${
                                    openSection ===
                                    'mantenimiento'
                                        ? 'open'
                                        : ''
                                }
                            `}
                            onClick={() =>
                                toggleSection(
                                    'mantenimiento'
                                )
                            }
                        >

                            <i className="bi bi-wrench-adjustable"></i>

                            <span>
                                Mantenimiento
                            </span>

                            <i className="bi bi-chevron-down dropdown-arrow"></i>

                        </button>


                        <div
                            className={`
                                submenu
                                ${
                                    openSection ===
                                    'mantenimiento'
                                        ? 'show'
                                        : ''
                                }
                            `}
                        >

                            <NavLink
                                to="/mantenimiento/planificacion"
                                className="submenu-item"
                                onClick={handleNavigation}
                            >
                                Planificación
                            </NavLink>

                            <NavLink
                                to="/mantenimiento"
                                className="submenu-item"
                                onClick={handleNavigation}
                            >
                                Mantenimientos
                            </NavLink>

                            <NavLink
                                to="/mantenimiento/preventivos"
                                className="submenu-item"
                                onClick={handleNavigation}
                            >
                                Preventivos
                            </NavLink>

                            <NavLink
                                to="/mantenimiento/correctivos"
                                className="submenu-item"
                                onClick={handleNavigation}
                            >
                                Correctivos
                            </NavLink>

                        </div>

                    </div>


                    {/* ====================================
                        ACTIVOS
                    ==================================== */}

                    <div className="menu-group">

                        <button
                            className={`
                                menu-item
                                menu-dropdown
                                ${
                                    openSection ===
                                    'activos'
                                        ? 'open'
                                        : ''
                                }
                            `}
                            onClick={() =>
                                toggleSection(
                                    'activos'
                                )
                            }
                        >

                            <i className="bi bi-pc-display"></i>

                            <span>
                                Activos
                            </span>

                            <i className="bi bi-chevron-down dropdown-arrow"></i>

                        </button>


                        <div
                            className={`
                                submenu
                                ${
                                    openSection ===
                                    'activos'
                                        ? 'show'
                                        : ''
                                }
                            `}
                        >

                            <NavLink
                                to="/activos/inventario"
                                className="submenu-item"
                                onClick={handleNavigation}
                            >
                                Inventario
                            </NavLink>

                            <NavLink
                                to="/activos/computadoras"
                                className="submenu-item"
                                onClick={handleNavigation}
                            >
                                Computadoras
                            </NavLink>

                            <NavLink
                                to="/activos/equipos-biomedicos"
                                className="submenu-item"
                                onClick={handleNavigation}
                            >
                                Equipos biomédicos
                            </NavLink>

                            <NavLink
                                to="/activos/camaras"
                                className="submenu-item"
                                onClick={handleNavigation}
                            >
                                Cámaras
                            </NavLink>

                            <NavLink
                                to="/activos/impresoras"
                                className="submenu-item"
                                onClick={handleNavigation}
                            >
                                Impresoras
                            </NavLink>

                            <NavLink
                                to="/activos/equipos-red"
                                className="submenu-item"
                                onClick={handleNavigation}
                            >
                                Equipos de red
                            </NavLink>

                        </div>

                    </div>


                    {/* ====================================
                        OPCIONES SIMPLES
                    ==================================== */}

                    <NavLink
                        to="/repuestos"
                        className="menu-item"
                        onClick={handleNavigation}
                    >
                        <i className="bi bi-box-seam"></i>

                        <span>
                            Repuestos / Insumos
                        </span>
                    </NavLink>


                    <NavLink
                        to="/conocimiento"
                        className="menu-item"
                        onClick={handleNavigation}
                    >
                        <i className="bi bi-book"></i>

                        <span>
                            Base de conocimiento
                        </span>
                    </NavLink>


                    <NavLink
                        to="/reportes"
                        className="menu-item"
                        onClick={handleNavigation}
                    >
                        <i className="bi bi-bar-chart"></i>

                        <span>
                            Reportes
                        </span>
                    </NavLink>


                    <NavLink
                        to="/usuarios"
                        className="menu-item"
                        onClick={handleNavigation}
                    >
                        <i className="bi bi-people"></i>

                        <span>
                            Personal
                        </span>
                    </NavLink>

                    <NavLink
                        to="/configuracion"
                        className="menu-item"
                        onClick={handleNavigation}
                    >
                        <i className="bi bi-gear"></i>

                        <span>
                            Configuración
                        </span>
                    </NavLink>

                </nav>

            </aside>
        </>
    );
};

export default Sidebar;