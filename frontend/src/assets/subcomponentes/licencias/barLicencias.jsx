
import React, { useState } from 'react';

export default function BarLicencias({ onClickTabla }) {
    const [tablaSeleccionada, setTablaSeleccionada] = useState('licenciaPersonas'); // Estado para la tabla seleccionada

    const handleTablaClick = (e) => {
        const tabla = e.target.id; // Obtiene el ID del elemento cliqueado (AsignacionEquipos o AsignacionPerifericos)
        setTablaSeleccionada(tabla); // Actualiza el estado con la tabla seleccionada
        onClickTabla(tabla); // Llama la función `onClickTabla` del componente padre (AsigEquipos)
    };

    return (
        <div className="bar">
            <div id="licenciaPersonas" className={tablaSeleccionada === 'licenciaPersonas' ? 'active' : ''} onClick={handleTablaClick}>Licencias Personas</div>
            <div id="licenciaEquipos" className={tablaSeleccionada === 'licenciaEquipos' ? 'active' : ''} onClick={handleTablaClick}>Licencias Equipos</div>
        </div>
    );
}
