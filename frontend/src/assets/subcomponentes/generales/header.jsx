import { faArrowRightToBracket, faGears, faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons/faUserTie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Header() {
    return (
        <header>
            <div>
                <h1>Bienvenido, Fabrizzio Garzon</h1>
                <p>Lunes, 08 de Abril 2024</p>
            </div>
            <div class="menu-login">
                <button class="boton-usuario ">
                    <FontAwesomeIcon icon={faUserTie} size='2xl' style={{}} />
                    <div class="usuario-info">
                        <div class="nombre-usuario">Fabrizzio Garzon</div>
                        <div class="cargo-usuario">Gerente de Tecnologia</div>
                    </div>
                    <i class="icono-desplegable">▼</i>
                </button>
                <div class="contenido-desplegable">
                    <a href="#" ><FontAwesomeIcon icon={faUser} style={{ width: '30px' }} />Profile</a>
                    <a href="#"><FontAwesomeIcon icon={faGears} style={{ width: '30px' }} />Settings</a>
                    <a href="#" style={{ color: 'red' }}><FontAwesomeIcon icon={faArrowRightToBracket} style={{ width: '30px', color: 'red' }} />Logout</a>
                </div>
            </div>
        </header>
    );
}

export default Header;