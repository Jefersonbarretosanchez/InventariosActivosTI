import React from 'react';
import logo from '../imagenes/login.png';
import '../Estilos/Login.css'

export default function Login() {
    return (
        <div className='contenedor'>
            <div className='logo'>
                <img src={logo} alt="Logo Scala" className="logo" />
            </div>
            <div className='inicio'>
                <h2>Bienvenido</h2>
                <p>Por favor ingrese Usuario y Contraseña</p>
            </div>
            <form action='#' method="post">
                <div className='grupos-input'>
                    <p className='editemail'>Email Adress</p>
                    <input type="email" id='email' name="email" placeholder='Enter email addresss' required />
                    <p className="editpass">Password</p>
                    <input type="password" id="password" name="password" placeholder="Password" required />
                </div>
                <div className='"checkboxs'>
                    <input type='checkbox' id='remember' name='remember' />
                    <label for="remember">Remember me</label>
                    <a href='#' className='forgot-password'> I forgot my password</a>
                </div>
                <div className='buttons'>
                    <button className='button1' type='submit'>Iniciar Sesión</button>
                    <button type="submit" className="botonreg">Registrar</button>
                </div>
            </form>
        </div>
    )
}