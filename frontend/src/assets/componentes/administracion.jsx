

import React, { useState } from 'react';
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import "../Estilos/asiglicencias.css";
import TarjetasAdmin from '../subcomponentes/administracion/tarjetasAdmin';
import BarAdmin from '../subcomponentes/administracion/barAdmin';
import TablaCatAlianza from '../subcomponentes/administracion/catalogos/TablaCatAlianza';
import TablaCatArea from '../subcomponentes/administracion/catalogos/TablaCatArea';
import TablaCatPuesto from '../subcomponentes/administracion/catalogos/TablaCatPuesto';
import TablaCatUbicacion from '../subcomponentes/administracion/catalogos/TablaCatUbicacion';
import TablaCatRegion from '../subcomponentes/administracion/catalogos/TablaCatRegion';
import TablaCatLicPersonas from '../subcomponentes/administracion/catalogos/TablaCatLicPersonas';
import TablaCatLicEquipo from '../subcomponentes/administracion/catalogos/TablaCatLicEquipo';
import TablaCatCoordinadores from '../subcomponentes/administracion/catalogos/TablaCatCoordinadores';
import TablaCatMarcaEquipo from '../subcomponentes/administracion/catalogos/TablaCatMarcaEquipo';
import TablaCatSO from '../subcomponentes/administracion/catalogos/TablaCatSO';
import TablaCatDiscoDuro from '../subcomponentes/administracion/catalogos/TablaCatDiscoDuro';
import TablaCatRam from '../subcomponentes/administracion/catalogos/TablaCatRam';
import TablaCatAlianzaBack from '../subcomponentes/administracion/catalogos/TablaCatAlianzaBack';
import TablaCatAreaBack from '../subcomponentes/administracion/catalogos/TablaCatAreaBack';
import { ToastContainer } from 'react-toastify';
import TablaCatPuestoBack from '../subcomponentes/administracion/catalogos/TablaCatPuestoBack';

export default function Administracion() {
    const [tablaActiva, setTablaActiva] = useState('licenciaPersonas'); // Estado para la tabla activa

    const handleTablaClick = (tabla) => {
        setTablaActiva(tabla);
    };

    return (
        <div className="LicenciasBody">
            <Header />
            <Sidebar />
            <BarAdmin onClickTabla={handleTablaClick} />
            {tablaActiva === 'licenciaPersonas' ? (<TablaCatAlianzaBack />) : tablaActiva === 'licenciaEquipos' ? (<TablaCatAreaBack />) : tablaActiva === 'licenciaAreas' ? (<TablaCatPuestoBack />) : tablaActiva === 'ubicacion' ? (<TablaCatUbicacion />) :
                tablaActiva === 'region' ? (<TablaCatRegion />) : tablaActiva === 'licenciapersona' ? (<TablaCatLicPersonas />) : tablaActiva === 'licenciaequipo' ? (<TablaCatLicEquipo />) : tablaActiva === 'coordinador' ? (<TablaCatCoordinadores />) :
                    tablaActiva === 'marcaequipo' ? (<TablaCatMarcaEquipo />) : tablaActiva === 'so' ? (<TablaCatSO />) : tablaActiva === 'discoduro' ? (<TablaCatDiscoDuro />) : (<TablaCatRam />)}
            <ToastContainer />
            <Paginate />
            <Footer />
        </div>
    );
}
