import { faArrowRightToBracket, faGears, faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons/faUserTie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <div>
                <h1>Bienvenido, Fabrizzio Garzon</h1>
                <p>Lunes, 08 de Abril 2024</p>
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
                    <a href="#"><FontAwesomeIcon icon={faGears} style={{ width: '30px' }} />Settings</a>
                    <Link to="/logout" >
                        <a href="#" style={{ color: 'red' }}><FontAwesomeIcon icon={faArrowRightToBracket} style={{ width: '30px', color: 'red' }} />Logout</a>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;