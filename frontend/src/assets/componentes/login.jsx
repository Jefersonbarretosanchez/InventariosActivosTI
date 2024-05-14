import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import api from "../../api";
import logo from "../imagenes/login.png";

import "../Estilos/Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const method = "login";
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("/api/token/", { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/activos");
      } else {
        navigate("/e");
      }
    } catch (error) {
      alert(error);
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
        <h1>{name}</h1>
        <h2>Bienvenido</h2>
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
        <div className='"checkboxs-login'>
          <input type="checkbox" id="remember" name="remember" />
          <label for="remember">Remember me</label>
          <a href="#" className="forgot-password-login">
            {" "}
            I forgot my password
          </a>
        </div>
        <div className="buttons-login">
          {/* <Link to="/activos"> */}
          <button className="button1-login" type="submit">
            Iniciar Sesión
          </button>
          {/* </Link> */}
          <button type="submit" className="botonreg-login">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
