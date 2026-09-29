import { Routes, Route, Navigate } from 'react-router-dom';

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
                        <MisSolicitudes />
                    </MainLayout>
                }
            />

            <Route
                path="/solicitudes/todas"
                element={
                    <MainLayout>
                        <TodasSolicitudes />
                    </MainLayout>
                }
            />


            {/* Mantenimiento */}

           
            <Route
                path="/mantenimiento/planificacion"
                element={
                    <MainLayout>
                        <Planificacion />
                    </MainLayout>
                }
            />

            <Route
                path="/mantenimiento"
                element={
                    <MainLayout>
                        <Mantenimientos />
                    </MainLayout>
                }
            />

            <Route
                path="/mantenimiento/preventivos"
                element={
                    <MainLayout>
                        <Preventivos />
                    </MainLayout>
                }
            />

            <Route
                path="/mantenimiento/correctivos"
                element={
                    <MainLayout>
                        <Correctivos />
                    </MainLayout>
                }
            />

            {/* Activos */}

            {/* ================================
                ACTIVOS
            ================================= */}

            <Route
                path="/activos/inventario"
                element={
                    <MainLayout>
                        <Inventario />
                    </MainLayout>
                }
            />

            <Route
                path="/activos/computadoras"
                element={
                    <MainLayout>
                        <Computadoras />
                    </MainLayout>
                }
            />

            <Route
                path="/activos/equipos-biomedicos"
                element={
                    <MainLayout>
                        <EquiposBiomedicos />
                    </MainLayout>
                }
            />

            <Route
                path="/activos/camaras"
                element={
                    <MainLayout>
                        <Camaras />
                    </MainLayout>
                }
            />

            <Route
                path="/activos/impresoras"
                element={
                    <MainLayout>
                        <Impresoras />
                    </MainLayout>
                }
            />

            <Route
                path="/activos/equipos-red"
                element={
                    <MainLayout>
                        <EquiposRed />
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