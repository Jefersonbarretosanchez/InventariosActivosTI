import React, { useState, useEffect, useCallback } from 'react';
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import "../Estilos/asigEquipos.css";
import Bar from "../subcomponentes/asigEquipos/bar";
import TablaAsigEquiposBack from '../subcomponentes/asigEquipos/TablaAsigEquiposBack';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";
import TablaKitPerifericosBack from '../subcomponentes/asigEquipos/TablaKitPerifericosBack';
import TablaPerifericosBack from '../subcomponentes/asigEquipos/TablaPerifericosBack';

export default function AsigEquipos() {
    const [totalequiposAsignados, setTotalequiposAsignados] = useState(0);
    const [totalEquiposDisponibles, setTotalEquiposDisponibles] = useState(0);
    const [totalperifericosAsignados, setTotalPerifericosAsignados] = useState(0);
    const [totalperifericosDisponibles, setTotalPerifericosDisponibles] = useState(0);
    const [isLoggingOut, setIsLoggingOut] = useState(false); // Estado para manejar la animación de logout
    const [equipos, setEquipos] = useState([]);
    const [perifericos, setPerifericos] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchEquipos = async () => {
        try {
            const response = await api.get(`${API_URL}/api/equipos/`);
            setEquipos(response.data);
        } catch (error) {
            console.error("Error fetching equipos data:", error);
        }
    };

    const fetchPerifericos = async () => {
        try {
            const response = await api.get(`${API_URL}/api/perifericos/`);
            setPerifericos(response.data);
        } catch (error) {
            console.error("Error fetching perifericos data:", error);
        }
    };

    const fetchData = useCallback(() => {
        fetchEquipos();
        fetchPerifericos();
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const equiposAsignados = equipos.filter(
            (equipo) => equipo.nombre_estado_equipo === "Asignado"
        ).length;
        const equiposDisponibles = equipos.filter(
            (equipo) => equipo.nombre_estado_equipo === "En Bodega"
        ).length;
        const perifericosAsignados = perifericos.filter(
            (periferico) => periferico.nombre_estado_periferico === "Asignado"
        ).length;
        const PerifericosDisponibles = perifericos.filter(
            (periferico) => periferico.nombre_estado_periferico === "Sin Asignar"
        ).length;
        setTotalequiposAsignados(equiposAsignados);
        setTotalEquiposDisponibles(equiposDisponibles);
        setTotalPerifericosAsignados(perifericosAsignados);
        setTotalPerifericosDisponibles(PerifericosDisponibles);
    }, [equipos, perifericos]);

    const [tablaActiva, setTablaActiva] = useState('asignacionEquipos'); // Estado para la tabla activa

    const handleTablaClick = (tabla) => {
        setTablaActiva(tabla);
    };

    const handleLogoutAnimation = () => {
        setIsLoggingOut(true);
    };

    return (
        <div className={`asigEquiposBody ${isLoggingOut ? 'fade-out' : ''}`}>
            <Header onLogout={handleLogoutAnimation} />
            <Sidebar />
            <div style={{ marginTop: '20vh', position: 'fixed' }}>
                <Bar onClickTabla={handleTablaClick} />
            </div>
            {tablaActiva === 'asignacionEquipos' ? <TablaAsigEquiposBack
                totalequiposAsignados={totalequiposAsignados}
                totalEquiposDisponibles={totalEquiposDisponibles}
                totalperifericosAsignados={totalperifericosAsignados}
                totalperifericosDisponibles={totalperifericosDisponibles}
                fetchData={fetchData} // Propagar la función de actualización
            />
                : tablaActiva === 'asignacionPerifericos' ? <TablaKitPerifericosBack
                    totalequiposAsignados={totalequiposAsignados}
                    totalEquiposDisponibles={totalEquiposDisponibles}
                    totalperifericosAsignados={totalperifericosAsignados}
                    totalperifericosDisponibles={totalperifericosDisponibles}
                    fetchData={fetchData} // Propagar la función de actualización
                />
                    : <TablaPerifericosBack
                        totalequiposAsignados={totalequiposAsignados}
                        totalEquiposDisponibles={totalEquiposDisponibles}
                        totalperifericosAsignados={totalperifericosAsignados}
                        totalperifericosDisponibles={totalperifericosDisponibles}
                        fetchData={fetchData} // Propagar la función de actualización
                    />}
            <ToastContainer />
            <Paginate />
            <Footer />
        </div>
    );
}
