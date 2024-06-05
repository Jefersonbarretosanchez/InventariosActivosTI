import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight, faChevronLeft, faChevronRight, faCircleArrowRight, faPenToSquare } from '@fortawesome/free-solid-svg-icons';


export default function BarAdmin({ onClickTabla }) {
    const [tablaSeleccionada, setTablaSeleccionada] = useState('licenciaPersonas'); // Estado para la tabla seleccionada
    const barRef = useRef(null); // Referencia a la barra

    const handleTablaClick = (e) => {
        const tabla = e.target.id; // Obtiene el ID del elemento cliqueado
        setTablaSeleccionada(tabla); // Actualiza el estado con la tabla seleccionada
        onClickTabla(tabla); // Llama la función `onClickTabla` del componente padre (AsigEquipos)
    };

    const handleScrollLeft = () => {
        if (barRef.current) {
            barRef.current.scrollLeft -= 150;
        }
    };

    const handleScrollRight = () => {
        if (barRef.current) {
            barRef.current.scrollLeft += 150;
        }
    };

    return (
        <div className="contenedor">
            <div className="scroll-button left" style={{ marginLeft: '-2.5vw', marginTop: '-4vh' }} onClick={handleScrollLeft}><FontAwesomeIcon style={{
                color: '#384295'
            }} icon={faChevronLeft} /></div>
            <div style={{ marginLeft: '-0.6vw' }} className="bar" ref={barRef}>
                <div id="licenciaPersonas" className={tablaSeleccionada === 'licenciaPersonas' ? 'active' : ''} onClick={handleTablaClick}>Alianzas</div>
                <div id="licenciaEquipos" className={tablaSeleccionada === 'licenciaEquipos' ? 'active' : ''} onClick={handleTablaClick}>Areas</div>
                <div id="licenciaAreas" className={tablaSeleccionada === 'licenciaAreas' ? 'active' : ''} onClick={handleTablaClick}>Cargos</div>
                <div id="ubicacion" className={tablaSeleccionada === 'ubicacion' ? 'active' : ''} onClick={handleTablaClick}>Ubicacion</div>
                <div id="region" className={tablaSeleccionada === 'region' ? 'active' : ''} onClick={handleTablaClick}>Region</div>
                <div id="coordinador" className={tablaSeleccionada === 'coordinador' ? 'active' : ''} onClick={handleTablaClick}>Coordinadores</div>
                <div id="marcaequipo" className={tablaSeleccionada === 'marcaequipo' ? 'active' : ''} onClick={handleTablaClick}>Marcas Equipos</div>
                <div id="so" className={tablaSeleccionada === 'so' ? 'active' : ''} onClick={handleTablaClick}>Sistemas Operativos</div>
                <div id="discoduro" className={tablaSeleccionada === 'discoduro' ? 'active' : ''} onClick={handleTablaClick}>Discos Duros</div>
                <div id="memoriaram" className={tablaSeleccionada === 'memoriaram' ? 'active' : ''} onClick={handleTablaClick}>Memorias Ram</div>
            </div>
            <div className="scroll-button right" style={{ marginLeft: '0vw', marginTop: '-4vh' }} onClick={handleScrollRight}><FontAwesomeIcon icon={faChevronRight} /></div>
        </div>
    );
}
