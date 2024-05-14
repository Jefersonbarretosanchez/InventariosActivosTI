import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import Activos from './assets/componentes/activos'
import Personas from "./assets/componentes/personas.jsx";
import './index.css'
import ContenidoModal from "./assets/subcomponentes/generales/contenidoModal.jsx";
import ProtectedRoute from "./assets/componentes/protectedRoute.jsx";
import Login from "./assets/componentes/login.jsx";
import NotFound from "./assets/paginas/notFound.jsx";


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
        <Route path="/modal" element={<ContenidoModal /> } />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
