import React from "react";
import { Link } from "react-router-dom";
import inactivos from "../../imagenes/equipos_stock.webp";
import activos from "../../imagenes/perifericos.webp";
import equipos from "../../imagenes/equipos.webp";
import licencias from "../../imagenes/perifericos_asig.webp";

function TarjetasAsigEquipos() {
  return (
    <div className="estadisticas-activos">
      <div className="tarjeta-estadisticas-equipos">
        <div className="icono-estatisticas-activos">
          <Link to="/personas">
            <img src={equipos} alt="Logo Scala" className="logo-activos" />
          </Link>
        </div>
        <div className="estadisticas-info-asigequipos">
          <span className="estadisticas-numero-activos">250</span>
          <br />
          <span className="estadisticas-descripcion-asigequipos">
            Total Equipos Asignados
          </span>
        </div>
      </div>
      <div className="tarjeta-estadisticas-equipos">
        <div className="icono-estatisticas-activos">
          <img src={inactivos} alt="Logo Scala" className="logo-activos" />
        </div>
        <div className="estadisticas-info-asigequipos">
          <span className="estadisticas-numero-activos">75</span>
          <br />
          <span className="estadisticas-descripcion-asigequipos">
            Total Equipos Disponibles
          </span>
        </div>
      </div>
      <div className="tarjeta-estadisticas-equipos">
        <div className="icono-estatisticas-activos">
          <img src={activos} alt="Logo Scala" className="logo-activos" />
        </div>
        <div className="estadisticas-info-asigequipos">
          <span className="estadisticas-numero-activos">92</span>
          <br />
          <span className="estadisticas-descripcion-asigequipos">
            Total Perifericos Asignados
          </span>
        </div>
      </div>
      <div className="tarjeta-estadisticas-equipos">
        <div className="icono-estatisticas-activos">
          <img src={licencias} alt="Logo Scala" className="logo-activos" />
        </div>
        <div className="estadisticas-info-asigequipos">
          <span className="estadisticas-numero-activos">88</span>
          <br />
          <span className="estadisticas-descripcion-asigequipos">
            Total Perifericos Disponibles
          </span>
        </div>
      </div>
    </div>
  );
}
export default TarjetasAsigEquipos;
