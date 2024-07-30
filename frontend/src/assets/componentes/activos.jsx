
import React, { useState, useEffect } from "react";
import { fetchPersonas } from "../../api";
import '../Estilos/activos.css'
import '../Estilos/estilosGlobal.css'
import TarjetasActivos from '../subcomponentes/activos/tarjetasActivos';
import TablaActivos from '../subcomponentes/activos/tablaActivos';
import Header from '../subcomponentes/generales/header';
import Sidebar from '../subcomponentes/generales/sidebar';
import Footer from '../subcomponentes/generales/footer';
import Paginate from '../subcomponentes/generales/paginate';
import TablaActivosBack from '../subcomponentes/activos/tablaActivosBack';
import axios from "axios";

export default function Activos() {
    const [totalPersonasActivas, setTotalPersonasActivas] = useState(0);
    const [personas, setPersonas] = useState([]);

    const [equipos, setEquipos] = useState([]);
    const [totalequiposAsignados, setTotalequiposAsignados] = useState(0);
    const [totalEquiposDisponibles, setTotalEquiposDisponibles] = useState(0);

    const [totalLicenciasPersonas, setTotalLicenciasPersonas] = useState(0);
    const API_URL = import.meta.env.VITE_API_URL

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
        const fetchEquipos = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/equipos/`);
                setEquipos(response.data);
            } catch (error) {
                console.error("Error fetching equipos data:", error);
            }
        };
        fetchEquipos();
    }, []);

    useEffect(() => {
        // Fetch total licenses data when the component mounts
        const fetchTotalLicencias = async () => {
            try {
                const responsePersonas = await axios.get(`${API_URL}/api/licencias/persona/`);
                setTotalLicenciasPersonas(responsePersonas.data.length);
            } catch (error) {
                console.error("Error fetching total licenses data:", error);
            }
        };

        fetchTotalLicencias();
    }, []);


    useEffect(() => {
        // Calcula y actualiza los totales cada vez que cambie la lista de personas
        const totalActivas = personas.filter(
            persona => persona.nombre_estado_persona === "Activo"
        ).length;
        const equiposAsignados = equipos.filter(
            (equipo) => equipo.nombre_estado_equipo === "Asignado"
        ).length;
        const equiposDisponibles = equipos.filter(
            (equipo) => equipo.nombre_estado_equipo === "En Bodega"
        ).length;
        setTotalPersonasActivas(totalActivas);
        setTotalequiposAsignados(equiposAsignados);
        setTotalEquiposDisponibles(equiposDisponibles);
    }, [personas, equipos]);


    return (
        <div className='ActivosBody'>
            <Header />
            <Sidebar />
            <TablaActivosBack
                totalPersonasActivas={totalPersonasActivas}
                totalequiposAsignados={totalequiposAsignados}
                totalEquiposDisponibles={totalEquiposDisponibles}
                totalLicenciasPersonas={totalLicenciasPersonas} />
            <Paginate />
            <Footer />
        </div>
    );
}
