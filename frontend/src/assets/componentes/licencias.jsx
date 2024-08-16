import React, { useState, useEffect } from 'react';
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import "../Estilos/licencias.css";
import TablaLicPersonasBack from '../subcomponentes/licencias/TablaLicPersonasBack';
import TablaLicEquiposBack from '../subcomponentes/licencias/TablaLicEquiposBack';
import TablaLicAreasBack from '../subcomponentes/licencias/TablaLicAreasBack';
import BarLicencias from '../subcomponentes/licencias/barLicencias';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";

export default function Licencias() {
    const [tablaActiva, setTablaActiva] = useState('licenciaPersonas'); // Estado para la tabla activa
    const [totalLicenciasPersonas, setTotalLicenciasPersonas] = useState(0);
    const [totalLicenciasEquipos, setTotalLicenciasEquipos] = useState(0);
    const [isLoggingOut, setIsLoggingOut] = useState(false); // Estado para manejar la animación de logout

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // Fetch total licenses data when the component mounts
        const fetchTotalLicencias = async () => {
            try {
                const responseEquipos = await api.get(`${API_URL}/api/licencias/equipo/`);
                setTotalLicenciasEquipos(responseEquipos.data.length);

                const responsePersonas = await api.get(`${API_URL}/api/licencias/persona/`);
                setTotalLicenciasPersonas(responsePersonas.data.length);
            } catch (error) {
                console.error("Error fetching total licenses data:", error);
            }
        };

        fetchTotalLicencias();
    }, []);

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
            <div style={{ marginTop: '20vh', position: 'fixed' }}>
                <BarLicencias onClickTabla={handleTablaClick} />
            </div>
            {tablaActiva === 'licenciaPersonas' ?
                (<TablaLicPersonasBack
                    setTotalLicenciasPersonas={setTotalLicenciasPersonas}
                    totalLicenciasPersonas={totalLicenciasPersonas}
                    totalLicenciasEquipos={totalLicenciasEquipos} />)
                : tablaActiva === 'licenciaEquipos' ?
                    (<TablaLicEquiposBack
                        setTotalLicenciasEquipos={setTotalLicenciasEquipos}
                        totalLicenciasEquipos={totalLicenciasEquipos}
                        totalLicenciasPersonas={totalLicenciasPersonas} />)
                    : (<TablaLicAreasBack
                        totalLicenciasPersonas={totalLicenciasPersonas}
                        totalLicenciasEquipos={totalLicenciasEquipos}
                    />)}
            <ToastContainer />
            <Paginate />
            <Footer />
        </div>
    );
}
