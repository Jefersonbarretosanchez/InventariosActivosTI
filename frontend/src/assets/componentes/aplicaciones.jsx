import React, { useState, useEffect, useCallback } from 'react';
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import { fetchPersonas } from "../../api";
import "../Estilos/asiglicencias.css";
import BarAplicaciones from '../subcomponentes/aplicaciones/barAplicaciones';
import TablaAplicacionesBack from '../subcomponentes/aplicaciones/TablaAplicacionesBack';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";
import TablaAsigAplicacionesBack from '../subcomponentes/aplicaciones/TablaAsigAplicacionesBack';

export default function Aplicaciones() {
    const [tablaActiva, setTablaActiva] = useState('licenciaPersonas'); // Estado para la tabla activa
    const [totalPersonasActivas, setTotalPersonasActivas] = useState(0);
    const [totalPersonasInactivas, setTotalPersonasInactivas] = useState(0);
    const [totalAplicaciones, setTotalAplicaciones] = useState(0);
    const [totalAplicacionesAsig, setTotalAplicacionesAsig] = useState(0);
    const [personas, setPersonas] = useState([]);
    const [aplicaciones, setAplicaciones] = useState([]);
    const [aplicacionesasig, setAplicacionesAsig] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false); // Estado para manejar la animación de logout
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchAplicaciones = async () => {
        try {
            const responseAplicaciones = await api.get(
                `${API_URL}/api/aplicaciones/`
            );
            setAplicaciones(responseAplicaciones.data);
        } catch (error) {
            toast.error("Hubo un error en la carga de datos de las Aplicaciones");
        } finally {
        }
    };

    useEffect(() => {
        fetchAplicaciones();
    }, []);

    useEffect(() => {
        const naplicaciones = aplicaciones.length;
        setTotalAplicaciones(naplicaciones);
    }, [aplicaciones]);

    useEffect(() => {
        const loadPersonas = async () => {
            setIsLoading(true);
            try {
                const data = await fetchPersonas();
                setPersonas(data);
            } catch (error) {
                console.error("Error loading persons:", error);
                toast.error(`Hubo un error en la carga de datos de las personas: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        loadPersonas();
    }, []);

    useEffect(() => {
        const totalActivas = personas.filter(
            persona => persona.nombre_estado_persona === "Activo"
        ).length;
        const totalInactivas = personas.filter(
            persona => persona.nombre_estado_persona === "Inactivo"
        ).length;

        setTotalPersonasActivas(totalActivas);
        setTotalPersonasInactivas(totalInactivas);
    }, [personas]);

    const fetchAplicacionesAsig = async () => {
        try {
            const responseAplicaciones = await api.get(
                `${API_URL}/api/aplicaciones/asignar/`
            );
            setAplicacionesAsig(responseAplicaciones.data);
        } catch (error) {
            toast.error("Hubo un error en la carga de datos de las Aplicaciones Asignadas");
        } finally {
        }
    };

    useEffect(() => {
        fetchAplicacionesAsig();
    }, []);

    useEffect(() => {
        const naplicacionesAsig = aplicacionesasig.length;
        setTotalAplicacionesAsig(naplicacionesAsig);
    }, [aplicacionesasig]);

    const handleTablaClick = (tabla) => {
        setTablaActiva(tabla);
    };

    const handleLogoutAnimation = () => {
        setIsLoggingOut(true);
    };

    const fetchData = useCallback(() => {
        fetchAplicaciones();
        fetchAplicacionesAsig();
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className={`LicenciasBody ${isLoggingOut ? 'fade-out' : ''}`}>
            <Header onLogout={handleLogoutAnimation} />
            <Sidebar />
            <div style={{ marginTop: '19.9vh', position: 'fixed' }}>
                <BarAplicaciones onClickTabla={handleTablaClick} />
            </div>
            {tablaActiva === 'licenciaPersonas' ?
                (<TablaAplicacionesBack totalPersonasActivas={totalPersonasActivas}
                    totalPersonasInactivas={totalPersonasInactivas}
                    totalAplicaciones={totalAplicaciones}
                    totalAplicacionesAsig={totalAplicacionesAsig}
                    fetchData={fetchData} />)
                : (<TablaAsigAplicacionesBack
                    totalPersonasActivas={totalPersonasActivas}
                    totalPersonasInactivas={totalPersonasInactivas}
                    totalAplicaciones={totalAplicaciones}
                    totalAplicacionesAsig={totalAplicacionesAsig}
                    fetchData={fetchData} />)}
            <ToastContainer />
            <Paginate />
            <Footer />
        </div>
    );
}
