import React from "react";
import { Link } from "react-router-dom";
import inactivos from "../../imagenes/screen.png";
import activos from "../../imagenes/mensaje-recibido.png";
import equipos from "../../imagenes/computadora.png";
import licencias from "../../imagenes/laptop.png";

function TarjetasEquipos({ TotalEquipos, totalequiposAsignados, totalEquiposDisponibles }) {
  return (
    <div className="estadisticas-activos">
      <div className="tarjeta-estadisticas-activos">
        <Link to="/equipos" style={{ color: "black", transform: "scale(1.2)" }}>
          <div className="icono-estatisticas-activos">
            <Link to="/personas">
              <img src={activos} alt="Logo Scala" className="logo-activos" />
            </Link>
          </div>
          <div className="estadisticas-info-activos">
            <span className="estadisticas-numero-activos">{TotalEquipos}</span>
            <br />
            <span className="estadisticas-descripcion-activos">
              Total Equipos
            </span>
          </div>
        </Link>
      </div>
      <div className="tarjeta-estadisticas-activos">
        <Link to="/asigEquipos" style={{ color: "black", transform: "scale(1.2)" }}>
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
        <Link to="/equipos" style={{ color: "black", transform: "scale(1.2)" }}>
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
        <Link to="/licencias" style={{ color: "black", transform: "scale(1.2)" }}>
          <div className="icono-estatisticas-activos">
            <img src={licencias} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-activos">
            <span className="estadisticas-numero-activos">88</span>
            <br />
            <span className="estadisticas-descripcion-activos">
              Total Licencias Equipos
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default TarjetasEquipos;
