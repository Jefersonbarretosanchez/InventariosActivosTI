

import React, { useState } from 'react';
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import "../Estilos/asiglicencias.css";
import BarAdmin from '../subcomponentes/administracion/barAdmin';
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
    const [isAnimating, setIsAnimating] = useState(false);
    const handleTablaClick = (tabla) => {
        setTablaActiva(tabla);
    };
    const handleLogoutAnimation = () => {
        setIsAnimating(true);
    };
    return (
        <div className={`LicenciasBody ${isAnimating ? 'fade-out' : ''}`}>
            <Header onLogout={handleLogoutAnimation} />
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
