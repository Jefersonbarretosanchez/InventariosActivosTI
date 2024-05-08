import React from 'react';
import logo from '../imagenes/login.png';
import '../Estilos/Login.css'

export default function Login() {
    return (
        <div className='contenedor-login'>
            <div>
                <img src={logo} alt="Logo Scala" className="logo-login" />
            </div>
            <div className='inicio-login'>
                <h2>Bienvenido</h2>
                <p>Por favor ingrese Usuario y Contraseña</p>
            </div>
            <form action='#' method="post">
                <div className='grupos-input-login'>
                    <p className='editemail-login'>Email Adress</p>
                    <input type="email" id='email-login' name="email" placeholder='Enter email addresss' required />
                    <p className="editpass-login">Password</p>
                    <input type="password" id="password-login" name="password" placeholder="Password" required />
                </div>
                <div className='"checkboxs-login'>
                    <input type='checkbox' id='remember' name='remember' />
                    <label for="remember">Remember me</label>
                    <a href='#' className='forgot-password-login'> I forgot my password</a>
                </div>
                <div className='buttons-login'>
                    <button className='button1-login' type='submit'>Iniciar Sesión</button>
                    <button type="submit" className="botonreg-login">Registrar</button>
                </div>
            </form>
        </div>
    )
}