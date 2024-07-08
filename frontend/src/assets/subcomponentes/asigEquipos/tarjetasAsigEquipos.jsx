import React from "react";
import { Link } from "react-router-dom";
import inactivos from "../../imagenes/screen.png";
import activos from "../../imagenes/auricular.png";
import equipos from "../../imagenes/computadora.png";
import licencias from "../../imagenes/camara-web.png";

function TarjetasAsigEquipos({ totalequiposAsignados, totalEquiposDisponibles, totalperifericosAsignados, totalperifericosDisponibles }) {
  return (
    <div className="estadisticas-activos">
      <div className="tarjeta-estadisticas-equipos">
        <Link to="/asigEquipos" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <Link to="/personas">
              <img src={equipos} alt="Logo Scala" className="logo-activos" />
            </Link>
          </div>
          <div className="estadisticas-info-asigequipos">
            <span className="estadisticas-numero-activos">{totalequiposAsignados}</span>
            <br />
            <span className="estadisticas-descripcion-asigequipos">
              Total Equipos Asignados
            </span>
          </div>
        </Link>
      </div>
      <div className="tarjeta-estadisticas-equipos">
        <Link to="/equipos" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <img src={inactivos} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-asigequipos">
            <span className="estadisticas-numero-activos">{totalEquiposDisponibles}</span>
            <br />
            <span className="estadisticas-descripcion-asigequipos">
              Total Equipos Disponibles
            </span>
          </div>
        </Link>
      </div>
      <div className="tarjeta-estadisticas-equipos">
        <Link to="/asigEquipos" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <img src={activos} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-asigequipos">
            <span className="estadisticas-numero-activos">{totalperifericosAsignados}</span>
            <br />
            <span className="estadisticas-descripcion-asigequipos">
              Total Perifericos Asignados
            </span>
          </div>
        </Link>
      </div>
      <div className="tarjeta-estadisticas-equipos">
        <Link to="/asigEquipos" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <img src={licencias} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-asigequipos">
            <span className="estadisticas-numero-activos">{totalperifericosDisponibles}</span>
            <br />
            <span className="estadisticas-descripcion-asigequipos">
              Total Perifericos Disponibles
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default TarjetasAsigEquipos;
