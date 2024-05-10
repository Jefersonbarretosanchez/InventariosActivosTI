import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './assets/componentes/login.jsx'
import Activos from './assets/componentes/activos'
import Personas from "./assets/componentes/personas.jsx";
import './index.css'
// import Modal from "./assets/subcomponentes/generales/modal.jsx";
import ContenidoModal from "./assets/subcomponentes/generales/contenidoModal.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/activos" element={<Activos />} />
        <Route path="/personas" element={<Personas />} />
        <Route path="/modal" element={<ContenidoModal /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
