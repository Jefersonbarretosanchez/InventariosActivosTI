import React from "react";
import { Link } from "react-router-dom";
import inactivos from "../../imagenes/equipos_stock.webp";
import activos from "../../imagenes/equipos_activos.webp";
import equipos from "../../imagenes/equipos.webp";
import licencias from "../../imagenes/licencias.webp";

function TarjetasEquipos() {
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
            Total Equipos Activos
          </span>
        </div>
      </div>
      <div className="tarjeta-estadisticas-activos">
        <div className="icono-estatisticas-activos">
          <img src={inactivos} alt="Logo Scala" className="logo-activos" />
        </div>
        <div className="estadisticas-info-activos">
          <span className="estadisticas-numero-activos">75</span>
          <br />
          <span className="estadisticas-descripcion-activos">
            Total Equipos Disponibles
          </span>
        </div>
      </div>
      <div className="tarjeta-estadisticas-activos">
        <div className="icono-estatisticas-activos">
          <img src={equipos} alt="Logo Scala" className="logo-activos" />
        </div>
        <div className="estadisticas-info-activos">
          <span className="estadisticas-numero-activos">92</span>
          <br />
          <span className="estadisticas-descripcion-activos">
            Total Equipos Asignados
          </span>
        </div>
      </div>
      <div className="tarjeta-estadisticas-activos">
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
      </div>
    </div>
  );
}
export default TarjetasEquipos;