import { useState, useEffect } from 'react';
import Modal from '../generales/modal'; // Suponiendo que Modal está en el mismo directorio
import FormDinamico from '../generales/formDinamico'; // Importar el formulario dinámico
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faGears, faLock, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

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
    const [formData, setFormData] = useState({ old_password: '', new_password: '' }); // Estado del formulario
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
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.old_password) {
            newErrors.old_password = 'La contraseña actual es obligatoria';
        }
        if (!formData.new_password) {
            newErrors.new_password = 'La nueva contraseña es obligatoria';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Función para manejar el cambio de contraseña
    const handlePasswordChange = async () => {
        if (!validateForm()) return; // Valida los campos antes de continuar

        try {
            const response = await fetch('/api/usuarios/cambio/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Asumiendo que usas autenticación por token
                },
                body: JSON.stringify({
                    old_password: formData.old_password,
                    new_password: formData.new_password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al cambiar la contraseña');
            }

            // Manejo exitoso
            alert('Contraseña cambiada con éxito');
            setIsModalOpen(false); // Cierra el modal
        } catch (error) {
            alert(error.message); // Mostrar error en caso de fallo
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
                    {/* <Link to="#" onClick={() => setIsModalOpen(true)} style={{ color: '#545c8c' }}>
                        <FontAwesomeIcon icon={faLock} style={{ width: '30px', color: '#545c8c' }} />Cambio Contraseña
                    </Link> */}
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
                onUpdatePassword={handlePasswordChange}
            >
                <FormDinamico
                    fields={[
                        { id: 'old_password', label: 'Contraseña Anterior', type: 'password' },
                        { id: 'new_password', label: 'Nueva Contraseña', type: 'password' }
                    ]}
                    disabledFields={[]}
                    initialValues={{ old_password: '', new_password: '' }}
                    onInputChange={handleInputChange}
                    errors={errors}
                    setErrors={setErrors}
                />
            </Modal>
        </header>
    );
}

export default Header;
