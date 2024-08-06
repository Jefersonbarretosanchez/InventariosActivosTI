import React, { useState, useRef, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { login } from '../../api';
import logo from '../imagenes/login.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../Estilos/Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(AuthContext); // Asegúrate de importar y usar setUser
  const navigate = useNavigate();
  const submitButtonRef = useRef(null);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(username, password);
      if (user) {
        console.log("Inicio de sesión OK"); // Mensaje de éxito
        setUser(user); // Establece el usuario en el contexto
        navigate("/activos"); // Redirige al usuario a la página principal después del inicio de sesión exitoso
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      alert("Error de inicio de sesión. Verifique sus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitButtonRef.current.click();
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
          <p className="editemail-login">Usuario</p>
          <input
            className="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="email-login"
            name="email"
            placeholder="Ingresa tu Usuario"
            required
            onKeyPress={handleKeyPress}
          />
          <p className="editpass-login">Contraseña</p>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password-login"
              name="password"
              placeholder="Contraseña"
              required
              onKeyPress={handleKeyPress}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="password-toggle-icon"
            />
          </div>
        </div>
        <div style={{ marginTop: '2vh' }} className="buttons-login">
          <button
            ref={submitButtonRef}
            className="button1-login"
            type="submit"
            disabled={loading}
          >
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
