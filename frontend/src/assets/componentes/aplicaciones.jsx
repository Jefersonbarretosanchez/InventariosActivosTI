

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
import TarjetasAplicaciones from '../subcomponentes/aplicaciones/tarjetasAplicaciones';
import BarAplicaciones from '../subcomponentes/aplicaciones/barAplicaciones';
import TablaAplicaciones from '../subcomponentes/aplicaciones/TablaAplicaciones';
import TablaAsigAplicaciones from '../subcomponentes/aplicaciones/TablaAsigAplicaciones';

export default function Aplicaciones() {
    const [tablaActiva, setTablaActiva] = useState('licenciaPersonas'); // Estado para la tabla activa

    const handleTablaClick = (tabla) => {
        setTablaActiva(tabla);
    };

    return (
        <div className="LicenciasBody">
            <Header />
            <Sidebar />
            <TarjetasAplicaciones />
            <BarAplicaciones onClickTabla={handleTablaClick} />
            {tablaActiva === 'licenciaPersonas' ? (<TablaAplicaciones />) : (<TablaAsigAplicaciones />)}
            <Paginate />
            <Footer />
        </div>
    );
}
