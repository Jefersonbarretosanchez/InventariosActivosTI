

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
import BarHistLogs from '../subcomponentes/historicoLogs/barHistLogs';
import TablaLicPersonasBack from '../subcomponentes/licencias/TablaLicPersonasBack';
import TablaLicEquiposBack from '../subcomponentes/licencias/TablaLicEquiposBack';
import TablaLicAreasBack from '../subcomponentes/licencias/TablaLicAreasBack';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Licencias() {
    const [tablaActiva, setTablaActiva] = useState('licenciaPersonas'); // Estado para la tabla activa

    const handleTablaClick = (tabla) => {
        setTablaActiva(tabla);
    };


    return (
        <div className="LicenciasBody">
            <Header />
            <Sidebar />
            <div style={{ marginTop: '20.5vh', position: 'fixed' }}>
                <BarLicencias onClickTabla={handleTablaClick} />
            </div>
            {tablaActiva === 'licenciaPersonas' ? (<TablaLicPersonasBack />) : tablaActiva === 'licenciaEquipos' ? (<TablaLicEquiposBack />) : (<TablaLicAreasBack />)}
            <ToastContainer />
            <Paginate />
            <Footer />
        </div>
    );
}
