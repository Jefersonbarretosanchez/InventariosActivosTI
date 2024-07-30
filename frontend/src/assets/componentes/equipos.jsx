import React, { useState, useEffect } from 'react';
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import TarjetasEquipos from "../subcomponentes/equipos/tarjetasEquipos";
import TablaEquipos from "../subcomponentes/equipos/TablaEquipos";
import "../Estilos/equipos.css"
import TablaEquiposBack from "../subcomponentes/equipos/TablaEquiposBack";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

export default function Equipos() {
    const [totalLicenciasEquipos, setTotalLicenciasEquipos] = useState(0);

    useEffect(() => {
        // Fetch total licenses data when the component mounts
        const fetchTotalLicencias = async () => {
            try {
                const responseEquipos = await axios.get(`${API_URL}/api/licencias/equipo/`);
                setTotalLicenciasEquipos(responseEquipos.data.length);
            } catch (error) {
                console.error("Error fetching total licenses data:", error);
            }
        };

        fetchTotalLicencias();
    }, []);

    return (
        <div className="EquiposBody">
            <Header />
            <Sidebar />
            <TablaEquiposBack totalLicenciasEquipos={totalLicenciasEquipos} />
            <ToastContainer />
            <div style={{ marginTop: '3.5vh' }}>
                <Footer />
            </div>
        </div>
    );
}
