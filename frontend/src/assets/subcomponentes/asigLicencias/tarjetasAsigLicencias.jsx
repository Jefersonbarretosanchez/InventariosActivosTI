import React from "react";
import { Link } from "react-router-dom";
import inactivos from "../../imagenes/licencia2.png";
import activos from "../../imagenes/computadora.png";
import equipos from "../../imagenes/monitoor.png";
import licencias from "../../imagenes/license-icon.webp";

function TarjetasAsigLicencias() {
  return (
    <div className="estadisticas-activos">
      <div className="tarjeta-estadisticas-equipos">
        <div className="icono-estatisticas-activos">
          <Link to="/personas">
            <img src={licencias} alt="Logo Scala" className="logo-activos" />
          </Link>
        </div>
        <div className="estadisticas-info-asigequipos spanAsigLic">
          <span className="estadisticas-numero-activos">250</span>
          <br />
          <span className="estadisticas-descripcion-asigequipos spanAsigLic">
            Total Licencias Personas Asignadas
          </span>
        </div>
      </div>
      <div className="tarjeta-estadisticas-equipos">
        <div className="icono-estatisticas-activos">
          <img src={inactivos} alt="Logo Scala" className="logo-activos" />
        </div>
        <div className="estadisticas-info-asigequipos spanAsigLic">
          <span className="estadisticas-numero-activos">75</span>
          <br />
          <span className="estadisticas-descripcion-asigequipos spanAsigLic">
            Total Licencias Personas Disponibles
          </span>
        </div>
      </div>
      <div className="tarjeta-estadisticas-equipos">
        <div className="icono-estatisticas-activos">
          <img src={activos} alt="Logo Scala" className="logo-activos" />
        </div>
        <div className="estadisticas-info-asigequipos spanAsigLic">
          <span className="estadisticas-numero-activos spanAsigLic">92</span>
          <br />
          <span className="estadisticas-descripcion-asigequipos spanAsigLic">
            Total Licencias Equipos Asignadas
          </span>
        </div>
      </div>
      <div className="tarjeta-estadisticas-equipos">
        <div className="icono-estatisticas-activos">
          <img src={equipos} alt="Logo Scala" className="logo-activos" />
        </div>
        <div className="estadisticas-info-asigequipos spanAsigLic">
          <span className="estadisticas-numero-activos">88</span>
          <br />
          <span className="estadisticas-descripcion-asigequipos spanAsigLic">
            Total Licencias Equipos Disponibles
          </span>
        </div>
      </div>
    </div>
  );
}
export default TarjetasAsigLicencias;
