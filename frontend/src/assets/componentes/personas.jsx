import React from "react";
import "../Estilos/activos.css";
import TarjetasPersonas from "../subcomponentes/personas/tarjetasPersonas";
import TablaPersonas from "../subcomponentes/personas/tablaPersonas";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import "../Estilos/personas.css"
import TablaPersonasBack from "../subcomponentes/personas/tablaPersonasBack";

export default function Personas() {
    return (
        <div className="PersonasBody">
            <Header />
            <Sidebar />
            <TarjetasPersonas />
            <TablaPersonas />
            <Paginate />
            <Footer />
        </div>
    );
}
