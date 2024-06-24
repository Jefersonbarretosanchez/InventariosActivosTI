import React from "react";
import "../Estilos/activos.css";
import Header from "../subcomponentes/generales/header";
import Sidebar from "../subcomponentes/generales/sidebar";
import Footer from "../subcomponentes/generales/footer";
import Paginate from "../subcomponentes/generales/paginate";
import TarjetasEquipos from "../subcomponentes/equipos/tarjetasEquipos";
import TablaEquipos from "../subcomponentes/equipos/TablaEquipos";
import "../Estilos/equipos.css"
import TablaEquiposBack from "../subcomponentes/equipos/TablaEquiposBack";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Equipos() {
    return (
        <div className="EquiposBody">
            <Header />
            <Sidebar />
            <TablaEquiposBack />
            <ToastContainer />
            <div style={{ marginTop: '3.5vh' }}>
                <Footer />
            </div>
        </div>
    );
}
