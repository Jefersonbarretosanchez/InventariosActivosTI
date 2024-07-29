

import React, { useState, useEffect, useCallback } from 'react';
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import "../Estilos/asiglicencias.css";
import TarjetasAsigLicencias from '../subcomponentes/asigLicencias/tarjetasAsigLicencias';
import BarAsigLicencias from '../subcomponentes/asigLicencias/barAsigLicencias';
import TablaAsigLicPersonas from '../subcomponentes/asigLicencias/TablaAsigLicPersonas';
import TablaAsigLicEquipos from '../subcomponentes/asigLicencias/TablaAsigLicEquipos';
import TablaAsigLicPersonaBack from '../subcomponentes/asigLicencias/TablaAsigLicPersonaBack';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import TablaAsigLicEquiposBack from '../subcomponentes/asigLicencias/TablaAsigLicEquiposBack';

export default function Asiglicencias() {

    const [totalLicPersonasAsignadas, setTotalLicPersonasAsignadas] = useState(0);
    const [totalLicPersonasDisponibles, setTotalLicPersonasDisponibles] = useState(0);
    const [totalLicEquiposAsignados, setTotalLicEquiposAsignados] = useState(0);
    const [totalLicEquiposDisponibles, setTotalLicEquiposDisponibles] = useState(0);

    const [licpersonas, setLicPersonas] = useState([]);
    const [licequipos, setLicEquipos] = useState([]);

    const fetchLicPersona = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/licencias/persona/");
            setLicPersonas(response.data);

        } catch (error) {
            console.error("Error fetching Licencias data:", error);
        }
    };
    const fetchLicEquipos = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/licencias/equipo/");
            setLicEquipos(response.data);

        } catch (error) {
            console.error("Error fetching Licencias data:", error);
        }
    };
    const fetchData = useCallback(() => {
        fetchLicPersona();
        fetchLicEquipos();
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const licPersonasAsignadas = licpersonas.filter(
            (licpersona) => licpersona.nombre_estado_licencia === "Asignada"
        ).length;
        const licPersonasDisponibles = licpersonas.filter(
            (licpersona) => licpersona.nombre_estado_licencia === "Sin Asignar"
        ).length;
        const licEquiposAsignados = licequipos.filter(
            (licequipo) => licequipo.nombre_estado_licencia === "Asignada"
        ).length;
        const licEquiposDisponibles = licequipos.filter(
            (licequipo) => licequipo.nombre_estado_licencia === "Sin Asignar"
        ).length;
        setTotalLicPersonasAsignadas(licPersonasAsignadas);
        setTotalLicPersonasDisponibles(licPersonasDisponibles);
        setTotalLicEquiposAsignados(licEquiposAsignados);
        setTotalLicEquiposDisponibles(licEquiposDisponibles);
    }, [licpersonas, licequipos]);

    const [tablaActiva, setTablaActiva] = useState('licenciaPersonas'); // Estado para la tabla activa

    const handleTablaClick = (tabla) => {
        setTablaActiva(tabla);
    };

    return (
        <div className="LicenciasBody">
            <Header />
            <Sidebar />
            <div style={{ marginTop: '20vh', position: 'fixed' }}>
                <BarAsigLicencias onClickTabla={handleTablaClick} />
            </div>
            {tablaActiva === 'licenciaPersonas' ?
                (<TablaAsigLicPersonaBack
                    totalLicPersonasAsignadas={totalLicPersonasAsignadas}
                    totalLicPersonasDisponibles={totalLicPersonasDisponibles}
                    totalLicEquiposAsignados={totalLicEquiposAsignados}
                    totalLicEquiposDisponibles={totalLicEquiposDisponibles}
                    fetchData={fetchData} />) :
                (<TablaAsigLicEquiposBack
                    totalLicPersonasAsignadas={totalLicPersonasAsignadas}
                    totalLicPersonasDisponibles={totalLicPersonasDisponibles}
                    totalLicEquiposAsignados={totalLicEquiposAsignados}
                    totalLicEquiposDisponibles={totalLicEquiposDisponibles}
                    fetchData={fetchData} />)}
            <ToastContainer />
            <Paginate />
            <Footer />
        </div>
    );
}
