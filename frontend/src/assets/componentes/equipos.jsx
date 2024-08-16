import React, { useState, useEffect } from 'react';
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import "../Estilos/equipos.css";
import TablaEquiposBack from "../subcomponentes/equipos/TablaEquiposBack";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";

const API_URL = import.meta.env.VITE_API_URL;

export default function Equipos() {
    const [totalLicenciasEquipos, setTotalLicenciasEquipos] = useState(0);
    const [isLoggingOut, setIsLoggingOut] = useState(false); // Estado para manejar la animación de logout

    useEffect(() => {
        // Fetch total licenses data when the component mounts
        const fetchTotalLicencias = async () => {
            try {
                const responseEquipos = await api.get(`${API_URL}/api/licencias/equipo/`);
                setTotalLicenciasEquipos(responseEquipos.data.length);
            } catch (error) {
                console.error("Error fetching total licenses data:", error);
            }
        };

        fetchTotalLicencias();
    }, []);

    const handleLogoutAnimation = () => {
        setIsLoggingOut(true);
    };

    return (
        <div className={`EquiposBody ${isLoggingOut ? 'fade-out' : ''}`}>
            <Header onLogout={handleLogoutAnimation} />
            <Sidebar />
            <TablaEquiposBack totalLicenciasEquipos={totalLicenciasEquipos} />
            <ToastContainer />
            <div style={{ marginTop: '3.5vh' }}>
                <Footer />
            </div>
        </div>
    );
}
