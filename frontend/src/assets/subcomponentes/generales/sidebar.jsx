import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faDesktop, faGlobe, faIdCard, faTruckRampBox, faUsers, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import logo from '../../imagenes/login.png';
import nuevaimagen from '../../imagenes/logopeq.jpg';
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons/faBoxesStacked';
import { faUserTie } from '@fortawesome/free-solid-svg-icons/faUserTie';

const Sidebar = () => {
    const [width, setWidth] = useState('0');
    const [iconWidth, setIconWidth] = useState('0');
    const [imagen, setImagen] = useState(logo);
    const [imagenWith, setimagenWith] = useState('0');
    const [imagenHigth, setimagenHigth] = useState('0');
    const [posicionimg, setposicionimg] = useState('0');
    const [activeItem, setActiveItem] = useState('Activos');

    useEffect(() => {
        const handleMouseMovement = (e) => {
            if (e.clientX < 50) {
                setWidth('17vw');
                setIconWidth('2.2vw');
                setImagen(logo);
                setimagenHigth('9.5vh');
                setimagenWith('13vw');
                setposicionimg('2vw');
            } else {
                setWidth('3.75vw');
                setIconWidth('2.2vw');
                setImagen(nuevaimagen);
                setimagenHigth('10.6vh');
                setimagenWith('3.5vw');
                setposicionimg('.3vw');
            }
        };

        window.addEventListener('mousemove', handleMouseMovement);
        return () => window.removeEventListener('mousemove', handleMouseMovement);
    }, []);

    const menuItems = [
        { name: 'Activos', icon: faGlobe },
        { name: 'Personas', icon: faUsersLine },
        { name: 'Equipos', icon: faDesktop },
        { name: 'Asignación Equipos', icon: faTruckRampBox },
        { name: 'Licencias', icon: faIdCard },
        { name: 'Asignación Licencias', icon: faBoxesStacked },
        { name: 'Historico Logs', icon: faClipboard },
        { name: 'Administración', icon: faUserTie },
    ];

    return (
        <aside id="menu-lateral" className="menu-lateral-gen" style={{ width }}>
            <div className="logo-menulateral">
                <img src={imagen} alt="Logo Scala" style={{ width: imagenWith, height: imagenHigth, marginLeft: posicionimg }} />
            </div>
            <nav>
                <ul>
                    {menuItems.map(item => (
                        <li key={item.name} className={activeItem === item.name ? 'active-icono' : ''}
                            onClick={() => setActiveItem(item.name)}>
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
