import React from "react";
import activos from "../../imagenes/personas.webp";
import inactivos from "../../imagenes/alertas.png";
import equipos from "../../imagenes/equipos.webp";
import licencias from "../../imagenes/licencias.webp";

function TarjetasPersonas() {
  return (
    <>
      <div className="estadisticas-activos">
        <div className="tarjeta-estadisticas-activos">
          <div className="icono-estatisticas-activos">
            <img src={activos} alt="Logo Scala" className="logo-activos" />
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
            <img src={inactivos} alt="Logo Scala" className="logo-activos" />
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
              Total Licencias Asignadas
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
export default TarjetasPersonas;