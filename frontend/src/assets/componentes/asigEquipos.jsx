import React from "react";
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import "../Estilos/asigEquipos.css"
import TablaAsigEquipos from "../subcomponentes/asigEquipos/TablaAsigEquipos";
import TarjetasAsigEquipos from "../subcomponentes/asigEquipos/tarjetasAsigEquipos";
import Bar from "../subcomponentes/generales/bar";


export default function AsigEquipos() {
    return (
        <div className="asigEquiposBody">
            <Header />
            <Sidebar />
            <TarjetasAsigEquipos />
            <Bar />
            <TablaAsigEquipos />
            <Paginate />
            <Footer />
        </div>
    );
}
