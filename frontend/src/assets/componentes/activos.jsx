
import React from 'react'
import Header from './subcomponentes/header';
import '../Estilos/activos.css'
import Sidebar from '../componentes/subcomponentes/sidebar';
import Statistics from './subcomponentes/statistics';
import ActiveUsers from './subcomponentes/activeusers';
import Footer from './subcomponentes/footer';

export default function Activos() {
    return (
        <div className="Activos">
            <Header />
            <Sidebar />
            <Statistics />
            <ActiveUsers />
            <Footer />
        </div>
    );
}
