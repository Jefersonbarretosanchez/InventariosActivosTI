import React from "react";
import { Link } from "react-router-dom";
import inactivos from "../../imagenes/aplicaciones.png";
import activos from "../../imagenes/perfil-del-usuario.png";
import equipos from "../../imagenes/ocupado.png";
import licencias from "../../imagenes/cuentacuentos.png";

function TarjetasAplicaciones() {
  return (
    <div className="estadisticas-activos">
      <div className="tarjeta-estadisticas-activos">
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
      </div>
      <div className="tarjeta-estadisticas-activos">
        <div className="icono-estatisticas-activos">
          <img src={equipos} alt="Logo Scala" className="logo-activos" />
        </div>
        <div className="estadisticas-info-activos">
          <span className="estadisticas-numero-activos">75</span>
          <br />
          <span className="estadisticas-descripcion-activos">
            Total Personas Inactivas
          </span>
        </div>
      </div>
      <div className="tarjeta-estadisticas-activos">
        <div className="icono-estatisticas-activos">
          <img src={inactivos} alt="Logo Scala" className="logo-activos" />
        </div>
        <div className="estadisticas-info-activos">
          <span className="estadisticas-numero-activos">92</span>
          <br />
          <span className="estadisticas-descripcion-activos">
            Total Aplicaciones
          </span>
        </div>
      </div>
      <div className="tarjeta-estadisticas-activos">
        <div className="icono-estatisticas-activos">
          <img src={licencias} alt="Logo Scala" className="logo-activos" />
        </div>
        <div className="estadisticas-info-activos" style={{ padding: '10px 0px 0px 0px' }}>
          <span className="estadisticas-numero-activos">88</span>
          <br />
          <span className="estadisticas-descripcion-activos" >
            Total Aplicaciones Asignadas
          </span>
        </div>
      </div>
    </div>
  );
}
export default TarjetasAplicaciones;
