import React from "react";
import "../Estilos/activos.css";
import TarjetasPersonas from "../subcomponentes/personas/tarjetasPersonas";
import TablaPersonas from "../subcomponentes/personas/tablaPersonas";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import "../Estilos/personas.css"

export default function Personas() {
    return (
        <div className="PersonasBody">
            <Header />
            <Sidebar />
            <TarjetasPersonas />
            <TablaPersonas />
            <Footer />
        </div>
    );
}
