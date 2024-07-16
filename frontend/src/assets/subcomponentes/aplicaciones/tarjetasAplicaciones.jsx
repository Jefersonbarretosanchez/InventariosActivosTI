import React from "react";
import { Link } from "react-router-dom";
import inactivos from "../../imagenes/aplicaciones.png";
import activos from "../../imagenes/perfil-del-usuario.png";
import equipos from "../../imagenes/ocupado.png";
import licencias from "../../imagenes/cuentacuentos.png";

function TarjetasAplicaciones({ totalPersonasActivas, totalPersonasInactivas, totalAplicaciones, totalAplicacionesAsig }) {
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
        <Link to="/personas" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <img src={equipos} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-activos">
            <span className="estadisticas-numero-activos">{totalPersonasInactivas}</span>
            <br />
            <span className="estadisticas-descripcion-activos">
              Total Personas Inactivas
            </span>
          </div>
        </Link>
      </div>
      <div className="tarjeta-estadisticas-activos">
        <Link to="/aplicaciones" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <img src={inactivos} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-activos">
            <span className="estadisticas-numero-activos">{totalAplicaciones}</span>
            <br />
            <span className="estadisticas-descripcion-activos">
              Total Aplicaciones
            </span>
          </div>
        </Link>
      </div>
      <div className="tarjeta-estadisticas-activos">
        <Link to="/aplicaciones" style={{ color: 'black' }}>
          <div className="icono-estatisticas-activos">
            <img src={licencias} alt="Logo Scala" className="logo-activos" />
          </div>
          <div className="estadisticas-info-activos" style={{ padding: '10px 0px 0px 0px' }}>
            <span className="estadisticas-numero-activos">{totalAplicacionesAsig}</span>
            <br />
            <span className="estadisticas-descripcion-activos" >
              Total Aplicaciones Asignadas
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default TarjetasAplicaciones;
