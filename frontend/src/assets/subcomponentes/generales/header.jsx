import { faArrowRightToBracket, faGears, faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons/faUserTie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

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
    return (
        <header className="header">
            <div>
                <h1>Bienvenido al Sistema Integrado de Gestión Scala</h1>
                <p>{formattedDate}</p>
            </div>
            <div class="menu-login">
                <button class="boton-usuario-gen">
                    <FontAwesomeIcon icon={faUserTie} size='2xl' style={{}} />
                    <div class="usuario-info-princ">
                        <div class="nombre-usuario-princ">Fabrizzio Garzon</div>
                        <div class="cargo-usuario-princ">Gerente de Tecnologia</div>
                    </div>
                    <i class="icono-desplegable-princ">▼</i>
                </button>
                <div class="contenido-desplegable-princ">
                    {/* <a href="#"><FontAwesomeIcon icon={faGears} style={{ width: '30px' }} />Settings</a> */}
                    <Link to="/logout" >
                        <a href="#" style={{ color: 'red' }}><FontAwesomeIcon icon={faArrowRightToBracket} style={{ width: '30px', color: 'red' }} />Logout</a>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;