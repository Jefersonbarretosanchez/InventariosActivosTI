import { faArrowRightToBracket, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

function Header() {
    const today = new Date(); // Get the current date

    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const day = dayNames[today.getDay()];
    const date = today.getDate().toString().padStart(2, '0'); // Ensure two digits
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();

    // Format the date string
    const formattedDate = `${day}, ${date} de ${month} ${year}`;

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <header className="header">
            <div>
                <h1>Bienvenido al Sistema Integrado de Gestión Scala</h1>
                <p>{formattedDate}</p>
            </div>
            <div className="menu-login">
                <button className="boton-usuario-gen">
                    <FontAwesomeIcon icon={faUserTie} size='2xl' style={{}} />
                    <div className="usuario-info-princ">
                        <div className="nombre-usuario-princ">{user ? `${user.nombre} ${user.apellidos}` : 'Usuario'}</div>
                        <div className="cargo-usuario-princ" style={{textAlign:"center"}}>Scala Learning TI</div>
                    </div>
                    <i className="icono-desplegable-princ">▼</i>
                </button>
                <div className="contenido-desplegable-princ">
                    <Link to="/logout" style={{ color: 'red' }} >
                         <FontAwesomeIcon icon={faArrowRightToBracket} style={{ width: '30px', color: 'red' }} />Logout
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
