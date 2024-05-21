import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from 'react'
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

const root = ReactDOM.createRoot(document.getElementById("root"));

function Logout() {
  localStorage.clear()
  return <Navigate to="/" />
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/activos" element={<ProtectedRoute><Activos /></ProtectedRoute>} />
        <Route path="/personas" element={<ProtectedRoute><Personas /></ProtectedRoute>} />
        <Route path="/equipos" element={<ProtectedRoute><Equipos /></ProtectedRoute>} />
        <Route path="/asigEquipos" element={<ProtectedRoute><AsigEquipos /></ProtectedRoute>} />
        <Route path="/licencias" element={<ProtectedRoute><Licencias /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


