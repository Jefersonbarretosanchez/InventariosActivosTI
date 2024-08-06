import React, { useState, useEffect, useCallback } from 'react';
import "../Estilos/activos.css";
import TarjetasPersonas from "../subcomponentes/personas/tarjetasPersonas";
import TablaPersonas from "../subcomponentes/personas/tablaPersonas";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import "../Estilos/personas.css"
import TablaPersonasBack from "../subcomponentes/personas/tablaPersonasBack";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";

export default function Personas() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [totalequiposAsignados, setTotalequiposAsignados] = useState(0);
    const [totalLicenciasPersonas, setTotalLicenciasPersonas] = useState(0);
    const [equipos, setEquipos] = useState([]);

    const fetchEquipos = async () => {
        try {
            const response = await api.get(`${API_URL}/api/equipos/`);
            setEquipos(response.data);
        } catch (error) {
            console.error("Error fetching equipos data:", error);
        }
    };

    const fetchData = useCallback(() => {
        fetchEquipos();
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const equiposAsignados = equipos.filter(
            (equipo) => equipo.nombre_estado_equipo === "Asignado"
        ).length;
        setTotalequiposAsignados(equiposAsignados);
    }, [equipos]);

    useEffect(() => {
        // Fetch total licenses data when the component mounts
        const fetchTotalLicencias = async () => {
            try {
                const responsePersonas = await api.get(`${API_URL}/api/licencias/persona/`);
                setTotalLicenciasPersonas(responsePersonas.data.length);
            } catch (error) {
                console.error("Error fetching total licenses data:", error);
            }
        };

        fetchTotalLicencias();
    }, []);

    return (
        <div className="PersonasBody">
            <Header />
            <Sidebar />
            <TablaPersonasBack
                totalequiposAsignados={totalequiposAsignados}
                totalLicenciasPersonas={totalLicenciasPersonas}
                fetchData={fetchData} />
            <ToastContainer />
            <Paginate />
            <Footer />
        </div>
    );
}
