import React, { useState } from 'react';
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import "../Estilos/asiglicencias.css";
import TablaHistoricosBack from '../subcomponentes/historicoLogs/TablaHistoricosBack';

export default function HistLogs() {
    const [tablaActiva, setTablaActiva] = useState('licenciaPersonas'); // Estado para la tabla activa
    const [isLoggingOut, setIsLoggingOut] = useState(false); // Estado para manejar la animación de logout

    const handleTablaClick = (tabla) => {
        setTablaActiva(tabla);
    };

    const handleLogoutAnimation = () => {
        setIsLoggingOut(true);
    };

    return (
        <div className={`LicenciasBody ${isLoggingOut ? 'fade-out' : ''}`}>
            <Header onLogout={handleLogoutAnimation} />
            <Sidebar />
            <TablaHistoricosBack />
            <Paginate />
            <Footer />
        </div>
    );
}
