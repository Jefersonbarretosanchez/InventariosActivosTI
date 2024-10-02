import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import api from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faPenToSquare,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../generales/modal";
import FormDinamico from "../generales/formDinamico";
import styled from "styled-components";
import Paginate from "../generales/paginate";
import { formFields, formFields2, passwordFields, ALL_INPUT_IDS } from "./formConfig";

function ModConfigUsuario() {
  const permisos = JSON.parse(localStorage.getItem('permisos')); // Recuperamos los permisos
  const [usuarios, setUsuarios] = useState([]);
  const [rolesusuarios, setRolesUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rolesOptions, setRolesOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUserData, setNewUserData] = useState({});
  const [actionType, setActionType] = useState("");
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [filtroValues, setFiltroValues] = useState({});
  const [modalConfig, cambiarModalConfig] = useState({ titulo: "", contenido: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(100);


  const API_URL = import.meta.env.VITE_API_URL;

  // Obtener usuarios
  const fetchUsuarios = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`${API_URL}/api/usuarios/crear/`);
      setUsuarios(response.data);
    } catch (error) {
      toast.error("Hubo un error al cargar los usuarios.");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchData = useCallback(() => {
    fetchUsuarios();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchRoles = async () => {
    try {
      const response = await api.get(`${API_URL}/api/usuarios/roles/`);
      setRolesUsuarios(response.data);
    } catch (error) {
      toast.error("Hubo un error al cargar los Roles.");
    }
  };
  useEffect(() => {
    fetchRoles();
  }, []);





  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFiltroChange = (event) => {
    const { name, value } = event.target;
    setFiltroValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };


  // Crear usuario
  const createUsuario = async () => {
    setIsLoading(true);

    try {
      const formattedData = {
        ...newUserData,
      }
      const response = await api.post(
        `${API_URL}/api/usuarios/crear/`,
        formattedData
      );
      const nuevoUsuario = response.data;
      setUsuarios([...usuarios, nuevoUsuario]);
      setNewUserData({});
      fetchData();
      toast.success("Usuario creado exitosamente!");
      cambiarEstadoModal(false);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      const statusCode = error.response ? error.response.status : 500;

      if (error.response && error.response.data.errors) {
        const specificErrors = error.response.data.errors;

        const formattedErrors = Object.keys(specificErrors)
          .map((key) => `${key}: ${specificErrors[key]}`)
          .join("<br />");

        toast.error(
          <div>
            {errorMessage} <br />
            <br />
            <div>Los siguientes datos ya se encuentran registrados en el sistema:</div>
            <br />
            <strong>
              <div dangerouslySetInnerHTML={{ __html: formattedErrors }} />
              <br />
            </strong>
            {/* (Código de error: {statusCode}) */}
          </div>,
          { position: "bottom-center" }
        );
      } else {
        toast.error(`${errorMessage} (Código de error: ${statusCode})`);
      }
      cambiarEstadoModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Editar usuario
  const updateUsuario = async () => {
    setIsLoading(true);
    try {
      const updatedData = {
        ...usuarioSeleccionado,
        ...newUserData,
      };

      const formattedData = {
        ...updatedData
      };

      const response = await api.put(
        `${API_URL}/api/usuarios/actualizar/${usuarioSeleccionado.id}/`,
        formattedData
      );
      const updatedUsuario = response.data;
      setUsuarios(
        usuarios.map((usuario) =>
          usuario.id === updatedUsuario.id
            ? updatedUsuario
            : usuario
        )
      );
      fetchData();
      setNewUserData({});
      cambiarEstadoModal(false);
      toast.success("Usuario actualizado exitosamente!");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      const statusCode = error.response ? error.response.status : 500;

      if (error.response && error.response.data.errors) {
        const specificErrors = error.response.data.errors;

        const formattedErrors = Object.keys(specificErrors)
          .map((key) => `${key}: ${specificErrors[key]}`)
          .join("<br />");

        toast.error(
          <div>
            {errorMessage} <br />
            <br />
            <div>Los siguientes datos ya se encuentran registrados en el sistema:</div>
            <br />
            <strong>
              <div dangerouslySetInnerHTML={{ __html: formattedErrors }} />
              <br />
            </strong>
            {/* (Código de error: {statusCode}) */}
          </div>,
          { position: "bottom-center", }
        );
      } else {
        toast.error(`${errorMessage} (Código de error: ${statusCode})`);
      }
      cambiarEstadoModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async () => {
    setIsLoading(true);
    try {
      const passwordData = {
        new_password: newUserData.new_password,
        confirm_password: newUserData.confirm_password,
      };

      if (!passwordData.new_password || !passwordData.confirm_password) {
        toast.error("Por favor, ingrese y confirme la nueva contraseña.");
        setIsLoading(false);
        return;
      }

      const response = await api.put(
        `${API_URL}/api/usuarios/cambio/${usuarioSeleccionado.id}/`,
        passwordData
      );

      toast.success(`Contraseña de ${usuarioSeleccionado.username} actualizada correctamente!`);
      setNewUserData({});
      cambiarEstadoModal(false); // Close the modal after success
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      const statusCode = error.response ? error.response.status : 500;

      if (error.response && error.response.data.errors) {
        const specificErrors = error.response.data.errors;

        const formattedErrors = Object.keys(specificErrors)
          .map((key) => `${key}: ${specificErrors[key]}`)
          .join("<br />");

        toast.error(
          <div>
            {errorMessage} <br />
            <br />
            <div>Errores encontrados:</div>
            <strong>
              <div dangerouslySetInnerHTML={{ __html: formattedErrors }} />
            </strong>
          </div>,
          { position: "bottom-center" }
        );
      } else {
        toast.error(`las contraseñas no coinciden`);
      }
      cambiarEstadoModal(false);
    } finally {
      setIsLoading(false);
    }
  };


  const abrirModal = (
    titulo,
    fields,
    disabledFields = [],
    initialValues = {},
    action = ""
  ) => {
    let fieldsWithOptions = fields.map((field) => {
      if (field.id === "group") {
        return { ...field, options: rolesusuarios };
      }
      return field;
    });
    setNewUserData(initialValues);
    setActionType(action);
    cambiarModalConfig({
      titulo: titulo,
      contenido: (
        <FormDinamico
          fields={fieldsWithOptions}
          disabledFields={disabledFields}
          initialValues={initialValues}
          onInputChange={handleInputChange}
        />
      ),
    });
    cambiarEstadoModal(true);
  };


  const applyFiltros = () => {
    cambiarEstadoModalFiltros(false);
  };

  const clearFiltros = () => {
    setFiltroValues({});
    setActiveFilters([]);
  };

  const handleAddFilter = (filterId) => {
    if (!activeFilters.includes(filterId)) {
      setActiveFilters((prevFilters) => [...prevFilters, filterId]);
      setTriggerUpdate((prev) => !prev);
      setShowFilterOptions(false); // Ocultar opciones después de seleccionar una
    }
  };

  const handleRemoveFilter = (filterId) => {
    setActiveFilters((prevFilters) =>
      prevFilters.filter((id) => id !== filterId)
    );
    setFiltroValues((prevValues) => {
      const newValues = { ...prevValues };
      delete newValues[filterId];
      return newValues;
    });
    setTriggerUpdate((prev) => !prev);
  };

  const handleCreate = () => {
    abrirModal("Registrar Usuario", formFields, [], {}, "create");
  };

  const handleEdit = (usuario) => {
    const rol = localStorage.getItem('rol');
    const camposParaOcultar = rol === 'Administrador' ? [] : ["sereal"];

    setUsuarioSeleccionado(usuario);
    abrirModal(
      `Actualizar ${usuario.username}`,
      formFields2,
      camposParaOcultar,
      usuario,
      "update"
    );
  };
  const handleEditPassword = (usuario) => {
    setUsuarioSeleccionado(usuario);
    abrirModal(`Cambiar Contraseña de ${usuario.username}`, passwordFields, [], usuario, "updatePassword");
  };

  // Cambiar contraseña

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  // Filtro de búsqueda
  const filteredUsuarios = usuarios.filter((usuario) => {
    const searchString = `${usuario.id} ${usuario.username} ${usuario.email} ${usuario.first_name} ${usuario.last_name} ${usuario.group}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());

    const matchesFilters = Object.keys(filtroValues).every((key) => {
      if (!filtroValues[key]) return true;
      return String(usuario[key]) === String(filtroValues[key]);
    });

    return matchesSearch && matchesFilters;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredUsuarios.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredUsuarios.length / recordsPerPage);

  return (
    <>
      <div className="contenedor-activos" style={{ marginTop: "0.8vh" }}>
        <div className="row-activos">
          <div className="asigPerifericos">
            <h1>Configuración de Usuarios</h1>
          </div>
          <div className="contenedor-principal" style={{ paddingLeft: "15vw" }}>
            <div className="contbuscador-personas">
              <input
                className="buscador-personas"
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} className="buscador-icon-activos" />
            </div>
            <div className="iconos-acciones">
              {permisos && permisos.config_usuarios === 'rw' && (
                <FontAwesomeIcon
                  className="agregar-personas"
                  onClick={() => handleCreate()}
                  icon={faPlus}
                  title="Agregar Usuario"
                />
              )}
            </div>
          </div>
          <Divtabla style={{ maxHeight: "62.4vh", overflowY: "auto", display: "block" }} className="contenedor-tabla-activos">
            <table style={{ width: "100%" }} className="table-personas">
              <thead style={{ position: "sticky", top: "0" }}>
                <tr>
                  <th style={{ paddingLeft: "2vw" }}>Usuario</th>
                  <th style={{ paddingLeft: "4vw" }}>Nombres</th>
                  <th style={{ paddingLeft: "7vw" }}>Apellidos</th>
                  <th style={{ paddingLeft: "7vw" }}>Correo</th>
                  <th style={{ paddingLeft: "5vw" }}>Rol</th>
                  <th style={{ paddingLeft: "9.2vw" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6">
                      <Loading>
                        <Spinner />
                        <span>Loading..</span>
                      </Loading>
                    </td>
                  </tr>
                ) : (
                  currentRecords.map((usuario) => (
                    <tr key={usuario.id}>
                      <td style={{ paddingLeft: "2vw" }}>{usuario.username}</td>
                      <td style={{ paddingLeft: "4vw" }}>{usuario.first_name}</td>
                      <td style={{ paddingLeft: "7vw" }}>{usuario.last_name}</td>
                      <td style={{ paddingLeft: "7vw" }}>{usuario.email}</td>
                      <td>{usuario.group}</td>
                      <td style={{ paddingLeft: "8vw" }}>
                        {permisos && permisos.config_usuarios && permisos.config_usuarios === 'rw' && (
                          <button
                            className="btn-accion"
                            onClick={() => handleEdit(usuario)}
                            title="Actualizar Usuario"
                          >
                            <FontAwesomeIcon className="icon-accion" icon={faPenToSquare} />
                          </button>
                        )}
                        <button className="btn-accion" onClick={() => handleEditPassword(usuario)} title="Cambiar Contraseña">
                          <FontAwesomeIcon className="icon-accion" icon={faKey} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Divtabla>
        </div>
      </div>

      <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Modal
        estado={estadoModal}
        cambiarEstado={cambiarEstadoModal}
        titulo={modalConfig.titulo}
        actionType={actionType}
        onCreate={createUsuario}
        onUpdate={updateUsuario}
        onUpdatePassword={updatePassword}
      >
        {modalConfig.contenido}
      </Modal>
    </>
  );
}

export default ModConfigUsuario;


const Divtabla = styled.div`
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #545c8c;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #3a9ee1;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #545c8c;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  animation: spin 1s ease infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
