

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
import TablaCatUbicacionBackend from '../subcomponentes/administracion/catalogos/TablaCatUbicacionBackend';
import TablaCatRegionBack from '../subcomponentes/administracion/catalogos/TablaCatRegionBack';
import TablaCatCoordinadoresBack from '../subcomponentes/administracion/catalogos/TablaCatCoordinadoresBack';
import TablaCatMarcaEquipoBack from '../subcomponentes/administracion/catalogos/TablaCatMarcaEquipoBack';
import TablaCatSOBack from '../subcomponentes/administracion/catalogos/TablaCatSOBack';
import TablaCatDiscoDuroBack from '../subcomponentes/administracion/catalogos/TablaCatDiscoDuroBack';
import TablaCatRamBack from '../subcomponentes/administracion/catalogos/TablaCatRamBack';

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
            {tablaActiva === 'licenciaPersonas' ? (<TablaCatAlianzaBack />) : tablaActiva === 'licenciaEquipos' ? (<TablaCatAreaBack />) : tablaActiva === 'licenciaAreas' ? (<TablaCatPuestoBack />) : tablaActiva === 'ubicacion' ? (<TablaCatUbicacionBackend />) :
                tablaActiva === 'region' ? (<TablaCatRegionBack />) : tablaActiva === 'coordinador' ? (<TablaCatCoordinadoresBack />) :
                    tablaActiva === 'marcaequipo' ? (<TablaCatMarcaEquipoBack />) : tablaActiva === 'so' ? (<TablaCatSOBack />) : tablaActiva === 'discoduro' ? (<TablaCatDiscoDuroBack />) : (<TablaCatRamBack />)}
            <ToastContainer />
            <Paginate />
            <Footer />
        </div>
    );
}
