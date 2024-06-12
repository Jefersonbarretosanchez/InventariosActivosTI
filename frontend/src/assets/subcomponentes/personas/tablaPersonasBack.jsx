import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faPlus,
  faPenToSquare,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../generales/modal";
import styled from "styled-components";
import { formFields, ALL_INPUT_IDS } from "./formConfig";
import FormDinamico from "../generales/formDinamico";
import TarjetasPersonas from "./tarjetasPersonas";
import Paginate from "../generales/paginate"; // Asegúrate de que la ruta sea correcta

function TablaPersonasBack() {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [modalConfig, cambiarModalConfig] = useState({
    titulo: "",
    contenido: null,
  });
  const [personas, setPersonas] = useState([]);
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
  const [centroCostos, setCentroCostos] = useState([]);
  const [area, setArea] = useState([]);
  const [region, setRegion] = useState([]);
  const [cargo, setCargo] = useState([]);
  const [estado, setEstado] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [newPersonData, setNewPersonData] = useState({});
  const [actionType, setActionType] = useState(""); // Nuevo estado para manejar el tipo de acción
  const [totalActivos, setTotalActivos] = useState(0);
  const [totalInactivos, setTotalInactivos] = useState(0);

  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Estado de la página actual y número de registros por página
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(3);

  // Función para ajustar recordsPerPage basado en el tamaño de la pantalla
  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 1366) {
      setRecordsPerPage(4);
    } else if (width < 2800) {
      setRecordsPerPage(5);
    } else {
      setRecordsPerPage(8);
    }
  };

  // Ejecutar handleResize en el montaje y en el cambio de tamaño de la ventana
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calcular los registros que se mostrarán en la página actual
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = personas.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(personas.length / recordsPerPage);

  useEffect(() => {
    const fetchPersonas = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const responsePersonas = await axios.get(
          "http://localhost:8000/api/personas/"
        );
        setPersonas(responsePersonas.data);

        const activos = responsePersonas.data.filter(
          (persona) => persona.nombre_estado_persona === "Activo"
        ).length;
        const inactivos = responsePersonas.data.filter(
          (persona) => persona.nombre_estado_persona === "Inactivo"
        ).length;

        setTotalActivos(activos);
        setTotalInactivos(inactivos);

        console.log("Total de registros activos:", activos);
        console.log("Total de registros inactivos:", inactivos);
      } catch (error) {
        toast.error("Hubo un error en la carga de datos de las personas");
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
      }
    };
    fetchPersonas();
  }, []);

  useEffect(() => {
    const fetchCatalogos = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const responseEstado = await axios.get(
          "http://localhost:8000/api/estado_persona/"
        );
        setEstado(
          responseEstado.data.map((item) => ({
            value: item.id_estado_persona,
            label: item.nombre,
          }))
        );

        const responseCentroCostos = await axios.get(
          "http://localhost:8000/api/centro_costos/"
        );
        setCentroCostos(
          responseCentroCostos.data.map((item) => ({
            value: item.id_centro_costo,
            label: item.nombre,
          }))
        );

        const responseAreas = await axios.get(
          "http://localhost:8000/api/area/"
        );
        setArea(
          responseAreas.data.map((item) => ({
            value: item.id_area,
            label: item.nombre,
          }))
        );

        const responseRegion = await axios.get(
          "http://localhost:8000/api/region/"
        );
        setRegion(
          responseRegion.data.map((item) => ({
            value: item.id_region,
            label: item.nombre,
          }))
        );

        const responseCargo = await axios.get(
          "http://localhost:8000/api/cargo/"
        );
        setCargo(
          responseCargo.data.map((item) => ({
            value: item.id_cargo,
            label: item.nombre,
          }))
        );
      } catch (error) {
        toast.error("Hubo un error en la carga de datos de los catalogos.");
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
      }
    };

    fetchCatalogos();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPersonData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const createPersona = async () => {
    setIsLoading(true);

    // Convertir valores de campos relacionados a enteros
    const formattedData = {
      ...newPersonData,
      id_centro_costo: parseInt(newPersonData.id_centro_costo, 10),
      id_area: parseInt(newPersonData.id_area, 10),
      id_region: parseInt(newPersonData.id_region, 10),
      id_cargo: parseInt(newPersonData.id_cargo, 10),
      id_estado_persona: parseInt(newPersonData.id_estado_persona, 10),
    };

    console.log("Datos a enviar:", formattedData); // Log para depuración

    try {
      const response = await axios.post(
        "http://localhost:8000/api/personas/",
        formattedData
      );
      const nuevaPersona = response.data;
      setPersonas([...personas, nuevaPersona]);
      setNewPersonData({});
      cambiarEstadoModal(false);
      toast.success("Persona creada exitosamente!");
    } catch (error) {
      console.error("Error al crear persona:", error);
      console.log("Datos Nueva Persona:", formattedData);
      toast.error("Hubo un error al crear la persona.");
    } finally {
      setIsLoading(false);
    }
  };

  const updatePerson = async () => {
    setIsLoading(true);

    // Combinar newPersonData con los datos actuales de la persona seleccionada
    const updatedData = {
      ...personaSeleccionada,
      ...newPersonData,
    };

    // Convertir valores de campos relacionados a enteros
    const formattedData = {
      ...updatedData,
      id_centro_costo: parseInt(newPersonData.id_centro_costo, 10),
      id_area: parseInt(newPersonData.id_area, 10),
      id_region: parseInt(newPersonData.id_region, 10),
      id_cargo: parseInt(newPersonData.id_cargo, 10),
      id_estado_persona: parseInt(newPersonData.id_estado_persona, 10),
    };

    console.log("Datos a enviar:", formattedData); // Log para depuración

    try {
      const response = await axios.put(
        `http://localhost:8000/api/personas/${personaSeleccionada.id_trabajador}/`,
        formattedData
      );
      const updatedPersona = response.data;
      setPersonas(
        personas.map((persona) =>
          persona.id_trabajador === updatedPersona.id_trabajador
            ? updatedPersona
            : persona
        )
      );
      setNewPersonData({});
      cambiarEstadoModal(false);
      toast.success("Persona actualizada exitosamente!");
    } catch (error) {
      console.error("Error al actualizar persona:", error);
      console.log("Datos Nueva Persona:", formattedData);
      toast.error("Hubo un error al actualizar la persona.");
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
    // Asignar opciones a los campos de selección en formFields
    const fieldsWithOptions = fields.map((field) => {
      if (field.id === "id_centro_costo") {
        return { ...field, options: centroCostos };
      } else if (field.id === "id_area") {
        return { ...field, options: area };
      } else if (field.id === "id_region") {
        return { ...field, options: region };
      } else if (field.id === "id_cargo") {
        return { ...field, options: cargo };
      } else if (field.id === "id_estado_persona") {
        return { ...field, options: estado };
      }
      return field;
    });

    setNewPersonData(initialValues); // Inicializar con valores iniciales
    setActionType(action); // Establecer el tipo de acción
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

  const handleCreate = () => {
    abrirModal("Registrar Trabajador", formFields, [], {}, "create");
  };

  const handleEdit = (persona) => {
    setPersonaSeleccionada(persona);
    abrirModal(
      `Actualizar ${persona.nombres}  ${persona.apellidos}`,
      formFields,
      ["identificacion", "correo_institucional"],
      persona,
      "update"
    );
  };

  const handleInfo = (persona) => {
    setPersonaSeleccionada(persona);
    abrirModal(
      `Información de ${persona.nombres} ${persona.apellidos}`,
      formFields,
      ALL_INPUT_IDS,
      persona,
      "detail"
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filtrar personas basadas en el término de búsqueda
  const filteredPersonas = personas.filter((persona) => {
    const searchString = `${persona.id_trabajador} ${persona.nombres} ${persona.identificacion} ${persona.correo_institucional} ${persona.nombre_estado_persona}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <TarjetasPersonas
        totalActivos={totalActivos}
        totalInactivos={totalInactivos}
      />
      <div className="contenedor-activos">
        <div className="row-activos">
          <div className="Personas">
            <h1>Personas</h1>
          </div>
          <div className="contbuscador-personas">
            <input
              className="buscador-personas"
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="buscador-icon-activos"
            />
          </div>
          <div>
            <FontAwesomeIcon
              className="agregar-personas"
              onClick={() => handleCreate()}
              icon={faPlus}
            />
          </div>
          <div className="contenedor-tabla-activos">
            <table className="table-personas">
              <thead>
                <tr>
                  <th style={{ paddingLeft: "0vw" }}>ID Trabajador</th>
                  <th style={{ paddingLeft: "3.5vw" }}>Nombres</th>
                  <th style={{ paddingLeft: "0vw" }}>Numero Identificación</th>
                  <th style={{ paddingLeft: "5vw" }}>Correo Institucional</th>
                  <th style={{ paddingLeft: "2.5vw" }}>Estado</th>
                  <th style={{ paddingLeft: "4vw" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <Loading>
                      <Spinner />
                      <span>Loading..</span>
                    </Loading>
                  </tr>
                ) : (
                  filteredPersonas
                    .slice(indexOfFirstRecord, indexOfLastRecord)
                    .map((persona) => (
                      <tr key={persona.id_trabajador}>
                        <td>{persona.id_trabajador}</td>
                        <td>{persona.nombres}</td>
                        <td>{persona.identificacion}</td>
                        <td>{persona.correo_institucional}</td>
                        <td
                          style={{
                            color:
                              persona.nombre_estado_persona === "Activo"
                                ? "#10A142"
                                : "#ff0000",
                          }}
                        >
                          {persona.nombre_estado_persona}
                        </td>
                        <td>
                          <button
                            className="btn-accion"
                            onClick={() => handleEdit(persona)}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            className="btn-accion"
                            onClick={() => handleInfo(persona)}
                          >
                            <FontAwesomeIcon icon={faFileLines} />
                          </button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
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
        actionType={actionType} // Pasar el tipo de acción al modal
        onCreate={createPersona} // Pasar la función de creación
        onUpdate={updatePerson} // Pasar la función de actualización
      >
        {modalConfig.contenido}
      </Modal>
    </>
  );
}

export default TablaPersonasBack;

const Boton = styled.button`
  display: block;
  padding: 10px 30px;
  border-radius: 100px;
  color: #fff;
  background: #1766dc;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  transition: 0.3s ease all;
`;
const Loading = styled.tr`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  display: flex;
  align-items: center;
  justify-content: center;

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

const Contenido = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 10px;
  }`
  ;
