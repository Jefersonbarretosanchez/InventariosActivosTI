import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './assets/componentes/login.jsx'
import './index.css'
import Activos from './assets/componentes/activos'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/activos" element={<Activos />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
