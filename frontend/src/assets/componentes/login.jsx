import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { login } from '../../api';
import logo from '../imagenes/login.png';

import '../Estilos/Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(username, password); // Usa la función `login` aquí
      if (res.access) {
        localStorage.setItem(ACCESS_TOKEN, res.access);
        localStorage.setItem(REFRESH_TOKEN, res.refresh);

        // Redirige al usuario a la página principal después del inicio de sesión exitoso
        navigate("/activos");
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      alert("Error de inicio de sesión. Verifique sus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contenedor-login">
      <div>
        <img src={logo} alt="Logo Scala" className="logo-login" />
      </div>
      <div className="inicio-login">
        <h2>Bienvenido a SIGS</h2>
        <p>Por favor ingrese Usuario y Contraseña</p>
      </div>
      <form onSubmit={handleSubmit} method="post">
        <div className="grupos-input-login">
          <p className="editemail-login">Username</p>
          <input
            className="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="email-login"
            name="email"
            placeholder="Enter Username"
            required
          />
          <p className="editpass-login">PassWord</p>
          <input
            className="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password-login"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="checkboxs-login">
          <input type="checkbox" id="remember" name="remember" />
          <label htmlFor="remember">Remember me</label>
          <a href="#" className="forgot-password-login">
            I forgot my password
          </a>
        </div>
        <div className="buttons-login">
          <button className="button1-login" type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
          <button type="button" className="botonreg-login">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
