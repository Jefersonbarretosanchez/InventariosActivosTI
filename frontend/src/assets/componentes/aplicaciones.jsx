

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
import TarjetasAplicaciones from '../subcomponentes/aplicaciones/tarjetasAplicaciones';
import BarAplicaciones from '../subcomponentes/aplicaciones/barAplicaciones';
import TablaAplicaciones from '../subcomponentes/aplicaciones/TablaAplicaciones';
import TablaAsigAplicaciones from '../subcomponentes/aplicaciones/TablaAsigAplicaciones';
import TablaAplicacionesBack from '../subcomponentes/aplicaciones/TablaAplicacionesBack';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
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


    const fetchAplicaciones = async () => {
        try {
            const responseAplicaciones = await axios.get(
                "http://localhost:8000/api/aplicaciones/"
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


    const fetchAplicacionesAsig = async () => {
        try {
            const responseAplicaciones = await axios.get(
                "http://localhost:8000/api/aplicaciones/asignar/"
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

    const fetchData = useCallback(() => {
        fetchAplicaciones();
        fetchAplicacionesAsig();
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="LicenciasBody">
            <Header />
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
