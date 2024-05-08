
import React from 'react'
import '../Estilos/activos.css'
import '../Estilos/estilosGlobal.css'
import TarjetasActivos from '../subcomponentes/activos/tarjetasActivos';
import TablaActivos from '../subcomponentes/activos/tablaActivos';
import Header from '../subcomponentes/generales/header';
import Sidebar from '../subcomponentes/generales/sidebar';
import Footer from '../subcomponentes/generales/footer';

export default function Activos() {
    return (
        <div className='ActivosBody'>
            <Header />
            <Sidebar />
            <TarjetasActivos />
            <TablaActivos />
            <Footer />
        </div>
    );
}
