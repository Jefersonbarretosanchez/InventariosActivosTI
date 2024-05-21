import React, { useState } from 'react';
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import "../Estilos/asigEquipos.css";
import TablaAsigEquipos from "../subcomponentes/asigEquipos/TablaAsigEquipos";
import TarjetasAsigEquipos from "../subcomponentes/asigEquipos/tarjetasAsigEquipos";
import Bar from "../subcomponentes/asigEquipos/bar";
import TablaAsigPerifericos from "../subcomponentes/asigEquipos/TablaAsigPerifericos";

export default function AsigEquipos() {
    const [tablaActiva, setTablaActiva] = useState('asignacionEquipos'); // Estado para la tabla activa

    const handleTablaClick = (tabla) => {
        setTablaActiva(tabla);
    };

    return (
        <div className="asigEquiposBody">
            <Header />
            <Sidebar />
            <TarjetasAsigEquipos />
            <Bar onClickTabla={handleTablaClick} />
            {tablaActiva === 'asignacionEquipos' ? <TablaAsigEquipos /> : <TablaAsigPerifericos />}
            <Paginate />
            <Footer />
        </div>
    );
}
