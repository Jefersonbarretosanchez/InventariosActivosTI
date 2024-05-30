import React from "react";
import { Link } from "react-router-dom";
import inactivos from "../../imagenes/screen.png";
import activos from "../../imagenes/perfil-del-usuario.png";
import equipos from "../../imagenes/computadora.png";
import licencias from "../../imagenes/license-icon.webp";

function TarjetasAdmin() {
  return (
    <div className="estadisticas-activos">
      <div className="tarjeta-estadisticas-activos">
        <Link to="/personas" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <Link to="/personas">
              <img src={activos} alt="Logo Scala" className="logo-activos" />
            </Link>
          </div>
          <div className="estadisticas-info-activos">
            <span className="estadisticas-numero-activos">250</span>
            <br />
            <span className="estadisticas-descripcion-activos">
              Total Personas Activas
            </span>
          </div>
        </Link>
      </div>

      <div className="tarjeta-estadisticas-activos">
        <Link to="/asigEquipos" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <img src={equipos} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-activos">
            <span className="estadisticas-numero-activos">75</span>
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
            <Link to="/equipos">
              <img src={inactivos} alt="Logo Scala" className="logo-activos" />
            </Link>
          </div>
          <div className="estadisticas-info-activos">
            <span className="estadisticas-numero-activos">92</span>
            <br />
            <span className="estadisticas-descripcion-activos">
              Total Equipos Disponibles
            </span>
          </div>
        </Link>
      </div>
      <div className="tarjeta-estadisticas-activos">
        <Link to="/asiglicencias" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <img src={licencias} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-activos">
            <span className="estadisticas-numero-activos">88</span>
            <br />
            <span className="estadisticas-descripcion-activos">
              Total Licencias Asignadas
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default TarjetasAdmin;
