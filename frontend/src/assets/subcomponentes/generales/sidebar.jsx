import React, { useState, useEffect, memo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faDesktop, faGlobe, faIdCard, faTruckRampBox, faUsers, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { faBoxesStacked, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../imagenes/login.png';
import nuevaimagen from '../../imagenes/logopeq.jpg';

function Sidebar() {
    const [width, setWidth] = useState('17vw');
    const [iconWidth, setIconWidth] = useState('2.2vw');
    const [imagen, setImagen] = useState(logo);
    const [imagenWidth, setImagenWidth] = useState('13vw');
    const [imagenHeight, setImagenHeight] = useState('9.5vh');
    const [posicionImg, setPosicionImg] = useState('2vw');
    const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMovement = e => {
            if (e.clientX < 50) {
                setWidth('17vw');
                setIconWidth('2.2vw');
                setImagen(logo);
                setImagenHeight('9.5vh');
                setImagenWidth('13vw');
                setPosicionImg('2vw');
            } else {
                setWidth('3.75vw');
                setIconWidth('2.2vw');
                setImagen(nuevaimagen);
                setImagenHeight('10.6vh');
                setImagenWidth('3.5vw');
                setPosicionImg('.3vw');
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
        { name: 'Asignación Licencias', icon: faBoxesStacked, route: '/asignacion-licencias' },
        { name: 'Historico Logs', icon: faClipboard, route: '/historico-logs' },
        { name: 'Administración', icon: faUserTie, route: '/administracion' },
    ];

    return (
        <aside id="menu-lateral" className="menu-lateral-gen" style={{ width }}>
            <div className="logo-menulateral">
                <img src={imagen} alt="Logo Scala" style={{ width: imagenWidth, height: imagenHeight, marginLeft: posicionImg }} />
            </div>
            <nav>
                <ul>
                    {menuItems.map(item => (
                        <li key={item.name} className={location.pathname === item.route ? 'active-icono' : ''}
                            onClick={() => {
                                navigate(item.route);
                            }}>
                            <i className="icono"><FontAwesomeIcon icon={item.icon} style={{ width: iconWidth, height: iconWidth }} /></i>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
