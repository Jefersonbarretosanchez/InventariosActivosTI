

import React, { useState } from 'react';
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import "../Estilos/asiglicencias.css";
import TarjetasHistLogs from '../subcomponentes/historicoLogs/tarjetasHistLogs';
import TablaHistPersonas from '../subcomponentes/historicoLogs/TablaHistoricos';

export default function HistLogs() {
    const [tablaActiva, setTablaActiva] = useState('licenciaPersonas'); // Estado para la tabla activa

    const handleTablaClick = (tabla) => {
        setTablaActiva(tabla);
    };

    return (
        <div className="LicenciasBody">
            <Header />
            <Sidebar />
            <TarjetasHistLogs />
            <TablaHistPersonas />
            <Paginate />
            <Footer />
        </div>
    );
}
