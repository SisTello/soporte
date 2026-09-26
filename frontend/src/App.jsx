import { Routes, Route, Navigate } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import NuevaSolicitud from './pages/solicitudes/NuevaSolicitud';

const SimplePage = ({ title }) => {

    return (
        <div className="container-fluid p-4">

            <h1>{title}</h1>

            <p className="text-muted">
                Esta sección será desarrollada posteriormente.
            </p>

        </div>
    );
};


function App() {

    return (

        <Routes>

            {/* ================================
                LOGIN
            ================================= */}

            <Route
                path="/login"
                element={
                    <AuthLayout>
                        <Login />
                    </AuthLayout>
                }
            />


            {/* ================================
                SISTEMA
            ================================= */}

            <Route
                element={
                    <MainLayout>
                        <Dashboard />
                    </MainLayout>
                }
                path="/inicio"
            />


            {/* Solicitudes */}

            <Route
              path="/solicitudes/nueva"
              element={
                  <MainLayout>
                      <NuevaSolicitud />
                  </MainLayout>
              }
          />

            <Route
                path="/solicitudes/mis-solicitudes"
                element={
                    <MainLayout>
                        <SimplePage title="Mis solicitudes" />
                    </MainLayout>
                }
            />

            <Route
                path="/solicitudes/todas"
                element={
                    <MainLayout>
                        <SimplePage title="Todas las solicitudes" />
                    </MainLayout>
                }
            />


            {/* Mantenimiento */}

            <Route
                path="/mantenimiento/planificacion"
                element={
                    <MainLayout>
                        <SimplePage title="Planificación" />
                    </MainLayout>
                }
            />

            <Route
                path="/mantenimiento"
                element={
                    <MainLayout>
                        <SimplePage title="Mantenimientos" />
                    </MainLayout>
                }
            />

            <Route
                path="/mantenimiento/preventivos"
                element={
                    <MainLayout>
                        <SimplePage title="Mantenimientos preventivos" />
                    </MainLayout>
                }
            />

            <Route
                path="/mantenimiento/correctivos"
                element={
                    <MainLayout>
                        <SimplePage title="Mantenimientos correctivos" />
                    </MainLayout>
                }
            />


            {/* Activos */}

            <Route
                path="/activos/inventario"
                element={
                    <MainLayout>
                        <SimplePage title="Inventario de activos" />
                    </MainLayout>
                }
            />

            <Route
                path="/activos/computadoras"
                element={
                    <MainLayout>
                        <SimplePage title="Computadoras" />
                    </MainLayout>
                }
            />

            <Route
                path="/activos/equipos-biomedicos"
                element={
                    <MainLayout>
                        <SimplePage title="Equipos biomédicos" />
                    </MainLayout>
                }
            />

            <Route
                path="/activos/camaras"
                element={
                    <MainLayout>
                        <SimplePage title="Cámaras" />
                    </MainLayout>
                }
            />

            <Route
                path="/activos/impresoras"
                element={
                    <MainLayout>
                        <SimplePage title="Impresoras" />
                    </MainLayout>
                }
            />

            <Route
                path="/activos/equipos-red"
                element={
                    <MainLayout>
                        <SimplePage title="Equipos de red" />
                    </MainLayout>
                }
            />


            {/* Otros módulos */}

            <Route
                path="/repuestos"
                element={
                    <MainLayout>
                        <SimplePage title="Repuestos e insumos" />
                    </MainLayout>
                }
            />

            <Route
                path="/conocimiento"
                element={
                    <MainLayout>
                        <SimplePage title="Base de conocimiento" />
                    </MainLayout>
                }
            />

            <Route
                path="/reportes"
                element={
                    <MainLayout>
                        <SimplePage title="Reportes" />
                    </MainLayout>
                }
            />

            <Route
                path="/configuracion"
                element={
                    <MainLayout>
                        <SimplePage title="Configuración" />
                    </MainLayout>
                }
            />


            {/* ================================
                REDIRECCIONES
            ================================= */}

            <Route
                path="/"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

            <Route
                path="*"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

        </Routes>
    );
}

export default App;