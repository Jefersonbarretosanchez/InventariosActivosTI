import React from "react";
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import TarjetasEquipos from "../subcomponentes/equipos/tarjetasEquipos";
import TablaEquipos from "../subcomponentes/equipos/TablaEquipos";
import "../Estilos/personas.css"


export default function Equipos() {
    return (
        <div className="EquiposBody">
            <Header />
            <Sidebar />
            <TarjetasEquipos />
            <TablaEquipos />
            <Paginate />
            <Footer />
        </div>
    );
}
