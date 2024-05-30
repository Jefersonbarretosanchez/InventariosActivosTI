import React from "react";
import { Link } from "react-router-dom";
import inactivos from "../../imagenes/computadora.png";
import activos from "../../imagenes/contrato.png";
import equipos from "../../imagenes/license-icon.webp";
import licencias from "../../imagenes/usuario.png";

function TarjetasContratos() {
  return (
    <div className="estadisticas-activos">
      <div className="tarjeta-estadisticas-activos">
        <Link to="/contratos" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <Link to="/personas">
              <img src={activos} alt="Logo Scala" className="logo-activos" />
            </Link>
          </div>
          <div className="estadisticas-info-activos">
            <span className="estadisticas-numero-activos">250</span>
            <br />
            <span className="estadisticas-descripcion-activos">
              Total Contratos
            </span>
          </div>
        </Link>
      </div>
      <div className="tarjeta-estadisticas-activos">
        <Link to="/licencias" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <img src={equipos} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-activos">
            <span className="estadisticas-numero-activos">75</span>
            <br />
            <span className="estadisticas-descripcion-activos">
              Total Licencias Personas
            </span>
          </div>
        </Link>
      </div>
      <div className="tarjeta-estadisticas-activos">
        <Link to="/licencias" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <img src={inactivos} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-activos">
            <span className="estadisticas-numero-activos">92</span>
            <br />
            <span className="estadisticas-descripcion-activos">
              Total Licencias Equipos
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
            <span className="estadisticas-numero-activos">88</span>
            <br />
            <span className="estadisticas-descripcion-activos">
              Total Licencias Areas
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default TarjetasContratos;
