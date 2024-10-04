import React, { useState, useEffect } from 'react';
import Modal from '../generales/modal'; // Suponiendo que Modal está en el mismo directorio
import FormDinamico from '../generales/formDinamico'; // Importar el formulario dinámico
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faLock, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../api";  // Ajustar según cómo estés importando el cliente API

function Header({ onLogout }) {
    const rol = localStorage.getItem('rol');
    const today = new Date();

    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const day = dayNames[today.getDay()];
    const date = today.getDate().toString().padStart(2, '0');
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();

    const formattedDate = `${day}, ${date} de ${month} ${year}`;

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
    const [newUserData, setNewUserData] = useState({}); // Estado del formulario
    const [isLoading, setIsLoading] = useState(false); // Estado de carga
    const [errors, setErrors] = useState({}); // Estado para los errores

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
        setTimeout(() => {
            navigate('/logout');
        }, 1000);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEditPassword = (usuario) => {
        setUser(usuario);
        setNewUserData({
            old_password: "",
            new_password: "",
            confirm_password: ""
        });
        setIsModalOpen(true);
    };


    const updatePassword = async () => {
        setIsLoading(true);

        const passwordData = {
            old_password: newUserData.old_password,
            new_password: newUserData.new_password,
            confirm_password: newUserData.confirm_password,
        };

        if (!passwordData.old_password || !passwordData.new_password || !passwordData.confirm_password) {
            toast.error("Por favor, complete todos los campos.");
            setIsLoading(false);
            return;
        }

        if (passwordData.new_password !== passwordData.confirm_password) {
            toast.error("Las contraseñas no coinciden.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.put(`/api/usuarios/cambio/`, passwordData);

            toast.success("Contraseña actualizada correctamente!");
            setIsModalOpen(false);
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message
                : error.message;

            toast.error(`La Contraseña Anterior es Incorrecta`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <header className="header">
            <div>
                <h1>Bienvenido al Sistema Integrado de Gestión Scala</h1>
                <p>{formattedDate}</p>
            </div>
            <div className="menu-login">
                <button className="boton-usuario-gen">
                    <FontAwesomeIcon icon={faUserTie} size='2xl' />
                    <div className="usuario-info-princ">
                        <div className="nombre-usuario-princ">{user ? `${user.nombre} ${user.apellidos}` : 'Usuario'}</div>
                        <div className="cargo-usuario-princ" style={{ textAlign: "center" }}>{rol}</div>
                    </div>
                    <i className="icono-desplegable-princ">▼</i>
                </button>
                <div className="contenido-desplegable-princ">
                    <Link to="#" onClick={() => handleEditPassword(user)} style={{ color: '#545c8c' }}>
                        <FontAwesomeIcon icon={faLock} style={{ width: '30px', color: '#545c8c' }} />Cambio Contraseña
                    </Link>
                    <Link to="#" onClick={handleLogout} style={{ color: 'red' }}>
                        <FontAwesomeIcon icon={faArrowRightToBracket} style={{ width: '30px', color: 'red' }} />Salir
                    </Link>
                </div>
            </div>

            {/* Modal para el cambio de contraseña */}
            <Modal
                estado={isModalOpen}
                cambiarEstado={setIsModalOpen}
                titulo="Cambiar Mi Contraseña"
                actionType="updatePassword"
                onUpdatePassword={updatePassword}
            >
                <FormDinamico
                    fields={[
                        { id: 'old_password', label: 'Contraseña Anterior', type: 'password' },
                        { id: 'new_password', label: 'Nueva Contraseña', type: 'password' },
                        { id: 'confirm_password', label: 'Confirmar Nueva Contraseña', type: 'password' }
                    ]}
                    disabledFields={[]}
                    initialValues={newUserData}
                    onInputChange={handleInputChange}
                    errors={errors}
                    setErrors={setErrors}
                />
            </Modal>
        </header>
    );
}

export default Header;
