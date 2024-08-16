import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faDesktop, faFileContract, faFileSignature, faGlobe, faIdCard, faPaste, faRectangleList, faTruckRampBox, faUserGear, faUsers, faUsersLine, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { faBoxesStacked, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../imagenes/login.png';
import nuevaimagen from '../../imagenes/logopeq.jpg';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';

function Sidebar() {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMovement = e => {
            if (e.clientX < 50) {
                setExpanded(true);
            } else if (e.clientX > 200) {  // Ajusta este valor si es necesario para un mejor comportamiento
                setExpanded(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMovement);
        return () => window.removeEventListener('mousemove', handleMouseMovement);
    }, []);

    const menuItems = [
        { name: 'Activos', icon: faGlobe, route: '/activos' },
        { name: 'Personas', icon: faUsersLine, route: '/personas' },
        { name: 'Equipos', icon: faDesktop, route: '/equipos' },
        { name: 'Asignación Equipos', icon: faTruckRampBox, route: '/asigEquipos' },
        { name: 'Licencias', icon: faIdCard, route: '/licencias' },
        { name: 'Asignación Licencias', icon: faBoxesStacked, route: '/asiglicencias' },
        { name: 'Aplicaciones', icon: faMicrosoft, route: '/aplicaciones' },
        { name: 'Contratos', icon: faFileContract, route: '/contratos' },
        { name: 'Historico Logs', icon: faRectangleList, route: '/historicoLogs' },
        { name: 'Administración', icon: faUserGear, route: '/administracion' },
    ];

    return (
        <aside id="menu-lateral" className={`menu-lateral-gen ${expanded ? 'expanded' : ''}`}>
            <div className="logo-menulateral">
                <img src={expanded ? logo : nuevaimagen} alt="Logo" className="sidebar-logo" />
            </div>
            <nav>
                <ul>
                    {menuItems.map(item => (
                        <li key={item.name} className={location.pathname === item.route ? 'active-icono' : ''}
                            onClick={() => navigate(item.route)}>
                            <i className="icono"><FontAwesomeIcon icon={item.icon} /></i>
                            <span className="menu-text">{item.name}</span>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
