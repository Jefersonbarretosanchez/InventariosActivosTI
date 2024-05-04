function Header() {
    return (
        <header>
            <div>
                <h1>Bienvenido, Fabrizzio Garzon</h1>
                <p>Lunes, 08 de Abril 2024</p>
            </div>
            <div class="menu-login">
                <button class="boton-usuario ">
                    <img src="imagenperfil.png" alt="Fabrizzio Garzon" class="imagen-usuario" />
                    <div class="usuario-info">
                        <div class="nombre-usuario">Fabrizzio Garzon</div>
                        <div class="cargo-usuario">Gerente Tecnologia</div>
                    </div>
                    <i class="icono-desplegable">▼</i>
                </button>
                <div class="contenido-desplegable">
                    <a href="#">Profile</a>
                    <a href="#">Settings</a>
                    <a href="#">Logout</a>
                </div>
            </div>
        </header>
    );
}

export default Header;