
import React, { useState } from 'react';

export default function Bar({ onClickTabla }) {
    const [tablaSeleccionada, setTablaSeleccionada] = useState('asignacionEquipos'); // Estado para la tabla seleccionada

    const handleTablaClick = (e) => {
        const tabla = e.target.id; // Obtiene el ID del elemento cliqueado (AsignacionEquipos o AsignacionPerifericos)
        setTablaSeleccionada(tabla); // Actualiza el estado con la tabla seleccionada
        onClickTabla(tabla); // Llama la función `onClickTabla` del componente padre (AsigEquipos)
    };

    return (
        <div className="bar">
            <div id="asignacionEquipos" className={tablaSeleccionada === 'asignacionEquipos' ? 'active' : ''} onClick={handleTablaClick}>Asignacion Equipos</div>
            <div id="asignacionPerifericos" className={tablaSeleccionada === 'asignacionPerifericos' ? 'active' : ''} onClick={handleTablaClick}>Asignacion Perifericos</div>
        </div>
    );
}
