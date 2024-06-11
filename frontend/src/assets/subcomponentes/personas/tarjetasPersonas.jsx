import React from "react";
import activosImg from "../../imagenes/perfil-del-usuario.png";
import inactivosImg from "../../imagenes/ocupado.png";
import equiposImg from "../../imagenes/computadora.png";
import licenciasImg from "../../imagenes/license-icon.webp";
import { Link } from "react-router-dom";

function TarjetasPersonas({ totalActivos, totalInactivos }) {
  return (
    <>
      <div className="estadisticas-activos">
        <div className="tarjeta-estadisticas-activos">
          <Link
            to="/personas"
            style={{ color: "black", transform: "scale(1.2)" }}
          >
            <div className="icono-estatisticas-activos">
              <img src={activosImg} alt="Logo Scala" className="logo-activos" />
            </div>
            <div className="estadisticas-info-activos">
              <span className="estadisticas-numero-activos">
                {totalActivos}
              </span>
              <br />
              <span className="estadisticas-descripcion-activos">
                Total Personas Activas
              </span>
            </div>
          </Link>
        </div>
        <div className="tarjeta-estadisticas-activos">
          <Link to="/personas" style={{ color: "black" }}>
            <div className="icono-estatisticas-activos">
              <img src={inactivosImg} alt="Logo Scala" className="logo-activos" />
            </div>
            <div className="estadisticas-info-activos">
              <span className="estadisticas-numero-activos">
                {totalInactivos}
              </span>
              <br />
              <span className="estadisticas-descripcion-activos">
                Total Personas Inactivas
              </span>
            </div>
          </Link>
        </div>
        <div className="tarjeta-estadisticas-activos">
          <Link to="/equipos" style={{ color: "black" }}>
            <div className="icono-estatisticas-activos">
              <img src={equiposImg} alt="Logo Scala" className="logo-activos" />
            </div>
            <div className="estadisticas-info-activos">
              <span className="estadisticas-numero-activos">92</span>
              <br />
              <span className="estadisticas-descripcion-activos">
                Total Equipos Asignados
              </span>
            </div>
          </Link>
        </div>
        <div className="tarjeta-estadisticas-activos">
          <Link to="/licencias" style={{ color: "black" }}>
            <div className="icono-estatisticas-activos">
              <img src={licenciasImg} alt="Logo Scala" className="logo-activos" />
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
    </>
  );
}

export default TarjetasPersonas;
