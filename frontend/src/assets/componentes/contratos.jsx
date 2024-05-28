import React from "react";
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import "../Estilos/equipos.css"
import TarjetasContratos from "../subcomponentes/contratos/tarjetasContratos";
import TablaContratos from "../subcomponentes/contratos/TablaContratos";


export default function Contratos() {
    return (
        <div className="EquiposBody">
            <Header />
            <Sidebar />
            <TarjetasContratos />
            <TablaContratos />
            <Paginate />
            <Footer />
        </div>
    );
}
