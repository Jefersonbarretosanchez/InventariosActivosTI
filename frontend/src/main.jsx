import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './assets/componentes/login.jsx'
import Activos from './assets/componentes/activos'
import Personas from "./assets/componentes/personas.jsx";
import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/activos" element={<Activos />} />
        <Route path="/personas" element={<Personas />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
