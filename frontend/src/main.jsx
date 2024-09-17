import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from 'react'
import { AuthProvider } from './AuthContext.jsx';
import ReactDOM from 'react-dom/client'
import Activos from './assets/componentes/activos'
import Personas from "./assets/componentes/personas.jsx";
import ProtectedRoute from "./assets/paginas/protectedRoute.jsx";
import Login from "./assets/componentes/login.jsx";
import NotFound from "./assets/paginas/notFound.jsx";
import Equipos from "./assets/componentes/equipos.jsx";
import './index.css'
import AsigEquipos from "./assets/componentes/asigEquipos.jsx";
import Licencias from "./assets/componentes/licencias.jsx";
import Asiglicencias from "./assets/componentes/asiglicencias.jsx";
import Aplicaciones from "./assets/componentes/aplicaciones.jsx";
import Contratos from "./assets/componentes/contratos.jsx";
import HistLogs from "./assets/componentes/histLogs.jsx";
import Administracion from "./assets/componentes/administracion.jsx";
import ConfigUsuarios from "./assets/componentes/configUsuarios.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Logout() {
  localStorage.clear()
  return <Navigate to="/" />
}

root.render(
  <AuthProvider>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/activos" element={<ProtectedRoute><Activos /></ProtectedRoute>} />
        <Route path="/personas" element={<ProtectedRoute requiredPermission="personas"><Personas /></ProtectedRoute>} />
        <Route path="/equipos" element={<ProtectedRoute requiredPermission="equipos"><Equipos /></ProtectedRoute>} />
        <Route path="/asigEquipos" element={<ProtectedRoute requiredPermission="asignacion_equipos"><AsigEquipos /></ProtectedRoute>} />
        <Route path="/licencias" element={<ProtectedRoute requiredPermission="licencias"><Licencias /></ProtectedRoute>} />
        <Route path="/asiglicencias" element={<ProtectedRoute requiredPermission="asignacion_licencias"><Asiglicencias /></ProtectedRoute>} />
        <Route path="/aplicaciones" element={<ProtectedRoute requiredPermission="aplicaciones"><Aplicaciones /></ProtectedRoute>} />
        <Route path="/contratos" element={<ProtectedRoute requiredPermission="contratos"><Contratos /></ProtectedRoute>} />
        <Route path="/historicoLogs" element={<ProtectedRoute requiredPermission="logs"><HistLogs /></ProtectedRoute>} />
        <Route path="/administracion" element={<ProtectedRoute requiredPermission="administracion"><Administracion /></ProtectedRoute>} />
        <Route path="/configUsuarios" element={<ProtectedRoute requiredPermission="configUsuarios"><ConfigUsuarios /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </AuthProvider>
);


