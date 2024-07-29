import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import inactivos from "../../imagenes/screen.png";
import activos from "../../imagenes/perfil-del-usuario.png";
import equipos from "../../imagenes/computadora.png";
import licencias from "../../imagenes/license-icon.webp";

function TarjetasActivos({ totalPersonasActivas, totalequiposAsignados, totalEquiposDisponibles, totalLicenciasPersonas }) {
  return (
    <div className="estadisticas-activos">
      <div className="tarjeta-estadisticas-activos">
        <Link to="/personas" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <img src={activos} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-activos">
            <span className="estadisticas-numero-activos">{totalPersonasActivas}</span>
            <br />
            <span className="estadisticas-descripcion-activos">
              Total Personas Activas
            </span>
          </div>
        </Link>
      </div>


      <div className="tarjeta-estadisticas-activos">
        <Link to="/equipos" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <img src={equipos} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-activos">
            <span className="estadisticas-numero-activos">{totalequiposAsignados}</span>
            <br />
            <span className="estadisticas-descripcion-activos">
              Total Equipos Asignados
            </span>
          </div>
        </Link>
      </div>
      <div className="tarjeta-estadisticas-activos">
        <Link to="/equipos" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <img src={inactivos} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-activos">
            <span className="estadisticas-numero-activos">{totalEquiposDisponibles}</span>
            <br />
            <span className="estadisticas-descripcion-activos">
              Total Equipos Disponibles
            </span>
          </div>
        </Link>
      </div>
      <div className="tarjeta-estadisticas-activos">
        <Link to="/licencias" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <img src={licencias} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-activos">
            <span className="estadisticas-numero-activos">{totalLicenciasPersonas}</span>
            <br />
            <span className="estadisticas-descripcion-activos">
              Total Licencias Persona
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default TarjetasActivos;
