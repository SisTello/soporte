import { useState } from 'react';

import Sidebar from '../components/navigation/Sidebar';
import Topbar from '../components/navigation/Topbar';

import './MainLayout.scss';

const MainLayout = ({ children }) => {

    const [collapsed, setCollapsed] = useState(false);

    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="main-layout">

            <Sidebar
                collapsed={collapsed}
                mobileOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
            />

            <Topbar
                onToggleSidebar={() =>
                    setCollapsed(!collapsed)
                }
                onToggleMobile={() =>
                    setMobileOpen(true)
                }
            />

            <main
                className={`
                    main-content
                    ${collapsed ? 'expanded' : ''}
                `}
            >
                {children}
            </main>

        </div>
    );
};

export default MainLayout;