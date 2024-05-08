Statistics.jsx;
import React from "react";
import inactivos from "../../imagenes/equipos_stock.webp";
import activos from "../../imagenes/personas.webp";
import equipos from "../../imagenes/equipos.webp";
import licencias from "../../imagenes/licencias.webp";

function Statistics() {
    return (
        <div className="estadisticas">
            <div className="tarjeta-estadisticas">
                <div className="icono-estatisticas">
                    <img src={activos} alt="Logo Scala" className="logo" />
                </div>
                <div className="estadisticas-info">
                    <span className="estadisticas-numero">250</span>
                    <br />
                    <span className="estadisticas-descripcion">
                        Total Personas Activas
                    </span>
                </div>
            </div>
            <div className="tarjeta-estadisticas">
                <div className="icono-estatisticas">
                    <img src={inactivos} alt="Logo Scala" className="logo" />
                </div>
                <div className="estadisticas-info">
                    <span className="estadisticas-numero">75</span>
                    <br />
                    <span className="estadisticas-descripcion">
                        Total Equipos Disponibles
                    </span>
                </div>
            </div>
            <div className="tarjeta-estadisticas">
                <div className="icono-estatisticas">
                    <img src={equipos} alt="Logo Scala" className="logo" />
                </div>
                <div className="estadisticas-info">
                    <span className="estadisticas-numero">92</span>
                    <br />
                    <span className="estadisticas-descripcion">
                        Total Equipos Asignados
                    </span>
                </div>
            </div>
            <div className="tarjeta-estadisticas">
                <div className="icono-estatisticas">
                    <img src={licencias} alt="Logo Scala" className="logo" />
                </div>
                <div className="estadisticas-info">
                    <span className="estadisticas-numero">88</span>
                    <br />
                    <span className="estadisticas-descripcion">
                        Total Licencias Asignadas
                    </span>
                </div>
            </div>
        </div>
    );
}
export default Statistics;