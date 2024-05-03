import React, { useState, useEffect } from 'react';
import logo from '../../imagenes/login.png'

const Sidebar = () => {
    const [width, setWidth] = useState('0');

    useEffect(() => {
        const MoviemientoMouse = (e) => {
            if (e.clientX < 50) {
                setWidth('200px');
            } else {
                setWidth('0');
            }
        };

        window.addEventListener('mousemove', MoviemientoMouse);
        return () => {
            window.removeEventListener('mousemove', MoviemientoMouse);
        };
    }, []);

    return (
        <aside id="menu-lateral" className="menu-lateral" style={{ width }}>
            <div className="logo">
                <img src={logo} alt="Logo Scala" className="logo" />
            </div>
            <nav>
                <ul>
                    <li><i className="icono active-icono"></i> Personas</li>
                    <li><i className="icono"></i> Equipos</li>
                    <li><i className="icono"></i> Asignación Equipos</li>
                    <li><i className="icono"></i> Licencias</li>
                    <li><i className="icono"></i> Asignación Licencias</li>
                    <li><i className="icono"></i> Historico Logs</li>
                    <li><i className="icono"></i> Administración</li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
