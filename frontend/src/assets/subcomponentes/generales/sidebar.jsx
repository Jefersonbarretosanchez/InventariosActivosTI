import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faDesktop, faFileContract, faFileSignature, faGear, faGlobe, faIdCard, faPaste, faRectangleList, faScrewdriverWrench, faTruckRampBox, faUserGear, faUserLock, faUsersGear, faUsersLine, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { faBoxesStacked, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../imagenes/login.png';
import nuevaimagen from '../../imagenes/logopeq.jpg';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from '../../../AuthContext';

function Sidebar() {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const permisos = JSON.parse(localStorage.getItem('permisos'));

    useEffect(() => {
        const handleMouseMovement = e => {
            if (e.clientX < 50) {
                setExpanded(true);
            } else if (e.clientX > 200) {
                setExpanded(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMovement);
        return () => window.removeEventListener('mousemove', handleMouseMovement);
    }, []);

    // Definimos los ítems del menú con sus permisos correspondientes
    const menuItems = [
        { name: 'Activos', icon: faGlobe, route: '/activos', permiso: permisos?.activos },
        { name: 'Personas', icon: faUsersLine, route: '/personas', permiso: permisos?.personas },
        { name: 'Equipos', icon: faDesktop, route: '/equipos', permiso: permisos?.equipos },
        { name: 'Asignación Equipos', icon: faTruckRampBox, route: '/asigEquipos', permiso: permisos?.asignacion_equipos },
        { name: 'Licencias', icon: faIdCard, route: '/licencias', permiso: permisos?.licencias },
        { name: 'Asignación Licencias', icon: faBoxesStacked, route: '/asiglicencias', permiso: permisos?.asignacion_licencias },
        { name: 'Aplicaciones', icon: faMicrosoft, route: '/aplicaciones', permiso: permisos?.aplicaciones },
        { name: 'Contratos', icon: faFileContract, route: '/contratos', permiso: permisos?.contratos },
        { name: 'Historico Logs', icon: faRectangleList, route: '/historicoLogs', permiso: permisos?.logs },
        { name: 'Administración', icon: faGear, route: '/administracion', permiso: permisos?.administracion },
        // { name: 'Config Usuarios', icon: faUsersGear, route: '/config_usuarios', permiso: permisos?.config_usuarios },
    ];

    const filteredMenuItems = menuItems.filter(item => item.permiso !== 'n/a');
    const visibleItemsCount = filteredMenuItems.length;
    const dynamicPadding = `${(11 - visibleItemsCount)}vh`;

    return (
        <aside id="menu-lateral" className={`menu-lateral-gen ${expanded ? 'expanded' : ''}`}>
            <div className="logo-menulateral">
                <img src={expanded ? logo : nuevaimagen} alt="Logo" className="sidebar-logo" />
            </div>
            <nav style={{ paddingTop: dynamicPadding, marginTop: '-1vh' }}>
                <ul>
                    {filteredMenuItems.map(item => (
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
