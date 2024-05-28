

import React, { useState } from 'react';
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import "../Estilos/licencias.css";
import TarjetasLicencias from '../subcomponentes/licencias/tarjetasLicencias';
import TablaLicPersonas from '../subcomponentes/licencias/TablaLicPersonas';
import TablaLicEquipos from '../subcomponentes/licencias/TablaLicEquipos';
import BarLicencias from '../subcomponentes/licencias/barLicencias';
import TablaLicAreas from '../subcomponentes/licencias/TablaLicAreas';

export default function Licencias() {
    const [tablaActiva, setTablaActiva] = useState('licenciaPersonas'); // Estado para la tabla activa

    const handleTablaClick = (tabla) => {
        setTablaActiva(tabla);
    };

    return (
        <div className="LicenciasBody">
            <Header />
            <Sidebar />
            <TarjetasLicencias />
            <BarLicencias onClickTabla={handleTablaClick} />
            {tablaActiva === 'licenciaPersonas' ? (<TablaLicPersonas />) : tablaActiva === 'licenciaEquipos' ? (
                <TablaLicEquipos />) : (<TablaLicAreas />)}
            <Paginate />
            <Footer />
        </div>
    );
}
