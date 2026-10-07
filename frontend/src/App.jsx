import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './app/routes/ProtectedRoute';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import NuevaSolicitud from './pages/solicitudes/NuevaSolicitud';
import MisSolicitudes from './pages/solicitudes/MisSolicitudes';
import TodasSolicitudes from './pages/solicitudes/TodasSolicitudes';
import Planificacion from './pages/mantenimiento/Planificacion';
import Mantenimientos from './pages/mantenimiento/Mantenimientos';
import Preventivos from './pages/mantenimiento/Preventivos';
import Correctivos from './pages/mantenimiento/Correctivos';
import Inventario from './pages/activos/Inventario';
import Computadoras from './pages/activos/Computadoras';
import EquiposBiomedicos from './pages/activos/EquiposBiomedicos';
import Camaras from './pages/activos/Camaras';
import Impresoras from './pages/activos/Impresoras';
import EquiposRed from './pages/activos/EquiposRed';
import Repuestos from './pages/repuestos/Repuestos';
import Conocimiento from './pages/conocimiento/Conocimiento';
import Reportes from './pages/reportes/Reportes';
import Configuracion from './pages/configuracion/Configuracion';
import Usuarios from './pages/usuarios/Usuarios';

import { useAuthStore } from './shared/store/useAuthStore';

const PublicRoute = ({ children }) => {
    const user = useAuthStore((state) => state.user);
    return user ? <Navigate to="/inicio" replace /> : children;
};

function App() {
    const user = useAuthStore((state) => state.user);

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <AuthLayout>
                            <Login />
                        </AuthLayout>
                    </PublicRoute>
                }
            />

            <Route
                path="/inicio"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Dashboard />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/solicitudes/nueva"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <NuevaSolicitud />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/solicitudes/mis-solicitudes"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <MisSolicitudes />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/solicitudes/todas"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <TodasSolicitudes />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/mantenimiento/planificacion"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Planificacion />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/mantenimiento"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Mantenimientos />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/mantenimiento/preventivos"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Preventivos />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/mantenimiento/correctivos"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Correctivos />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/activos/inventario"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Inventario />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/activos/computadoras"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Computadoras />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/activos/equipos-biomedicos"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <EquiposBiomedicos />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/activos/camaras"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Camaras />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/activos/impresoras"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Impresoras />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/activos/equipos-red"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <EquiposRed />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/repuestos"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Repuestos />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/conocimiento"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Conocimiento />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/reportes"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Reportes />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/configuracion"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Configuracion />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/usuarios"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Usuarios />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/"
                element={<Navigate to={user ? '/inicio' : '/login'} replace />}
            />

            <Route
                path="*"
                element={<Navigate to={user ? '/inicio' : '/login'} replace />}
            />
        </Routes>
    );
}

export default App;