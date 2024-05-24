

import React, { useState } from 'react';
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import "../Estilos/asiglicencias.css";
import TarjetasAsigLicencias from '../subcomponentes/asigLicencias/tarjetasAsigLicencias';
import BarAsigLicencias from '../subcomponentes/asigLicencias/barAsigLicencias';
import TablaAsigLicPersonas from '../subcomponentes/asigLicencias/TablaAsigLicPersonas';
import TablaAsigLicEquipos from '../subcomponentes/asigLicencias/TablaAsigLicEquipos';

export default function Asiglicencias() {
    const [tablaActiva, setTablaActiva] = useState('licenciaPersonas'); // Estado para la tabla activa

    const handleTablaClick = (tabla) => {
        setTablaActiva(tabla);
    };

    return (
        <div className="LicenciasBody">
            <Header />
            <Sidebar />
            <TarjetasAsigLicencias />
            <BarAsigLicencias onClickTabla={handleTablaClick} />
            {tablaActiva === 'licenciaPersonas' ? <TablaAsigLicPersonas /> : <TablaAsigLicEquipos />}
            <Paginate />
            <Footer />
        </div>
    );
}
