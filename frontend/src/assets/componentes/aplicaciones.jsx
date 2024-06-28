

import React, { useState, useEffect } from 'react';
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
import TarjetasAplicaciones from '../subcomponentes/aplicaciones/tarjetasAplicaciones';
import BarAplicaciones from '../subcomponentes/aplicaciones/barAplicaciones';
import TablaAplicaciones from '../subcomponentes/aplicaciones/TablaAplicaciones';
import TablaAsigAplicaciones from '../subcomponentes/aplicaciones/TablaAsigAplicaciones';
import TablaAplicacionesBack from '../subcomponentes/aplicaciones/TablaAplicacionesBack';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Aplicaciones() {
    const [tablaActiva, setTablaActiva] = useState('licenciaPersonas'); // Estado para la tabla activa
    const [totalPersonasActivas, setTotalPersonasActivas] = useState(0);
    const [totalPersonasInactivas, setTotalPersonasInactivas] = useState(0);
    const [totalAplicaciones, setTotalAplicaciones] = useState(0);
    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        const fetchPersonas = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/personas/");
                setPersonas(response.data); // Almacena todas las personas en el estado

            } catch (error) {
                console.error("Error fetching personas data:", error);
            }
        };

        fetchPersonas();
    }, []);

    useEffect(() => {
        // Calcula y actualiza los totales cada vez que cambie la lista de personas
        const totalActivas = personas.filter(
            persona => persona.nombre_estado_persona === "Activo"
        ).length;
        const totalInactivas = personas.filter(
            persona => persona.nombre_estado_persona === "Inactivo"
        ).length;

        setTotalPersonasActivas(totalActivas);
        setTotalPersonasInactivas(totalInactivas);
    }, [personas]); // Dependencia en el estado 'personas'

    const handleTablaClick = (tabla) => {
        setTablaActiva(tabla);
    };

    return (
        <div className="LicenciasBody">
            <Header />
            <Sidebar />
            <div style={{ marginTop: '20.3vh', position: 'fixed' }}>
                <BarAplicaciones onClickTabla={handleTablaClick} />
            </div>
            {tablaActiva === 'licenciaPersonas' ?
                (<TablaAplicacionesBack totalPersonasActivas={totalPersonasActivas}
                    totalPersonasInactivas={totalPersonasInactivas} />)
                : (<TablaAsigAplicaciones />)}
            <ToastContainer />
            <Paginate />
            <Footer />
        </div>
    );
}
