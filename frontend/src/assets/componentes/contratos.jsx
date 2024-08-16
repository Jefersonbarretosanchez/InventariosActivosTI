import React, { useState, useEffect } from 'react';
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import "../Estilos/equipos.css";
import TablaContratosBack from "../subcomponentes/contratos/TablaContratosBack";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";

export default function Contratos() {
    const [totalLicenciasPersonas, setTotalLicenciasPersonas] = useState(0);
    const [totalLicenciasEquipos, setTotalLicenciasEquipos] = useState(0);
    const [totalLicenciasAreas, setTotalLicenciasAreas] = useState(0);
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

                const responseAreas = await api.get(`${API_URL}/api/licencias/area/`);
                setTotalLicenciasAreas(responseAreas.data.length);
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
            <TablaContratosBack
                totalLicenciasEquipos={totalLicenciasEquipos}
                totalLicenciasPersonas={totalLicenciasPersonas}
                totalLicenciasAreas={totalLicenciasAreas} />
            <ToastContainer />
            <Paginate />
            <Footer />
        </div>
    );
}
