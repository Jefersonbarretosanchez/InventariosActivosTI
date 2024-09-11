import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { login, api } from '../../api';
import logo from '../imagenes/login.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../Estilos/Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [registerClicked, setRegisterClicked] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const submitButtonRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(username, password);
      if (user) {
        setUser(user);


        const response = await api.get('api/api/permisos/', {
          headers: {
            Authorization: `Bearer ${user.token}`, // 'token' esté en el objeto user
          },
        });

        const permisos = response.data.permisos;
        // Guardamos los permisos en localStorage
        localStorage.setItem('permisos', JSON.stringify(permisos));

        // Iniciar la animación después de un breve retardo
        setTimeout(() => {
          setAnimate(true);
        }, 100);

        // Deshabilitar la visualización del componente después de la animación
        setTimeout(() => {
          navigate("/activos");
        }, 1000);
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

  const handleRegisterClick = () => {
    setRegisterClicked(true);
    setTimeout(() => {
      setRegisterClicked(false);
      alert('Navegando al registro...');
    }, 400);
  };
  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      navigate('/logout');
    }, 1000);
  };

  return (
    <div className={`contenedor-login ${animate ? 'animacion-login' : ''}`}>
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
            className={`button1-login ${loading ? 'loading' : ''}`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
          <button
            type="button"
            className={`botonreg-login ${registerClicked ? 'clicked' : ''}`}
            onClick={handleRegisterClick}
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
