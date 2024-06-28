import React from "react";
import { Link } from "react-router-dom";
import inactivos from "../../imagenes/analisis.png";
import activos from "../../imagenes/pagina-web.png";
import equipos from "../../imagenes/laptop.png";
import licencias from "../../imagenes/licenciass.png";

function TarjetasLicencias({ totalActivos, totalInactivos, totalLicenciasPersonas, totalLicenciasEquipos }) {
  return (
    <div className="estadisticas-activos">
      <div className="tarjeta-estadisticas-equipos">
        <Link to="/asigEquipos" style={{ color: "black", transform: "scale(1.2)" }}>
          <div className="icono-estatisticas-activos">
            <Link to="/licencias">
              <img src={licencias} alt="Logo Scala" className="logo-activos" />
            </Link>
          </div>
          <div className="estadisticas-info-asigequipos">
            <span className="estadisticas-numero-activos">{totalActivos}</span>
            <br />
            <span className="estadisticas-descripcion-asigequipos">
              Total Licencias Activas
            </span>
          </div>
        </Link>
      </div>
      <div className="tarjeta-estadisticas-equipos">
        <Link to="/licencias" style={{ color: "black", transform: "scale(1.2)" }}>
          <div className="icono-estatisticas-activos">
            <img src={inactivos} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-asigequipos">
            <span className="estadisticas-numero-activos">{totalInactivos}</span>
            <br />
            <span className="estadisticas-descripcion-asigequipos">
              Total Licencias Inactivas
            </span>
          </div>
        </Link>
      </div>
      <div className="tarjeta-estadisticas-equipos">
        <Link to="/licencias" style={{ color: "black", transform: "scale(1.2)" }}>
          <div className="icono-estatisticas-activos">
            <img src={activos} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-asigequipos">
            <span className="estadisticas-numero-activos">{totalLicenciasPersonas}</span> {/* Aquí muestra el total */}
            <br />
            <span className="estadisticas-descripcion-asigequipos">
              Total Licencias Personas
            </span>
          </div>
        </Link>
      </div>
      <div className="tarjeta-estadisticas-equipos">
        <Link to="/licencias" style={{ color: "black", transform: "scale(1.2)" }}>
          <div className="icono-estatisticas-activos">
            <img src={equipos} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-asigequipos">
            <span className="estadisticas-numero-activos">{totalLicenciasEquipos}</span> {/* Aquí muestra el total */}
            <br />
            <span className="estadisticas-descripcion-asigequipos">
              Total Licencias Equipos
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TarjetasLicencias;
