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
import NotAuthorized from "./assets/paginas/NotAuthorized.jsx";

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
          <Route path="/personas" element={<ProtectedRoute><Personas /></ProtectedRoute>} />
          <Route path="/equipos" element={<ProtectedRoute><Equipos /></ProtectedRoute>} />
          <Route path="/asigEquipos" element={<ProtectedRoute><AsigEquipos /></ProtectedRoute>} />
          <Route path="/licencias" element={<ProtectedRoute><Licencias /></ProtectedRoute>} />
          <Route path="/asiglicencias" element={<ProtectedRoute><Asiglicencias /></ProtectedRoute>} />
          <Route path="/aplicaciones" element={<ProtectedRoute><Aplicaciones /></ProtectedRoute>} />
          <Route path="/contratos" element={<ProtectedRoute><Contratos /></ProtectedRoute>} />
          <Route path="/historicoLogs" element={<ProtectedRoute><HistLogs /></ProtectedRoute>} />
          <Route path="/administracion" element={
          <ProtectedRoute requiredRole="Admin">
            <Administracion />
          </ProtectedRoute>
        } />
          <Route path="/no_autorizado" element={<NotAuthorized />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </AuthProvider>
);


