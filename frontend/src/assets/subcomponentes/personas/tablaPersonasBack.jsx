import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchPersonas } from "../../../api";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faPlus,
  faPenToSquare,
  faMagnifyingGlass,
  faPlusCircle,
  faBarsProgress
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../generales/modal";
import ModalFiltros from "../generales/modalFiltros";
import styled from "styled-components";
import { formFields, filterFields, ALL_INPUT_IDS } from "./formConfig";
import FormDinamico from "../generales/formDinamico";
import TarjetasPersonas from "./tarjetasPersonas";
import Paginate from "../generales/paginate";
import FiltroDinamico from "../generales/filtroDinamico";

function TablaPersonasBack({ totalequiposAsignados, totalLicenciasPersonas, fetchData }) {
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
  const [isLoading, setIsLoading] = useState(false);
  const [newPersonData, setNewPersonData] = useState({});
  const [actionType, setActionType] = useState("");
  const [totalActivos, setTotalActivos] = useState(0); // Estado para el total de personas activas
  const [totalInactivos, setTotalInactivos] = useState(0); // Estado para el total de personas inactivas

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(15); // Cambiado a 15

  const [estadoModalFiltros, cambiarEstadoModalFiltros] = useState(false);
  const [filtroValues, setFiltroValues] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [isCatalogsLoading, setIsCatalogsLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL


  const handleResize = () => {
    const width = window.innerWidth;
    if (width > 0) {
      setRecordsPerPage(50);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadPersonas = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPersonas();
        setPersonas(data);
      } catch (error) {
        console.error("Error loading persons:", error);
        toast.error(`Hubo un error en la carga de datos de las personas: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadPersonas();
  }, []);

  useEffect(() => {
    const fetchCatalogos = async () => {
      setIsLoading(true);
      setIsCatalogsLoading(true);
      try {
        const responseEstado = await axios.get(
          `${API_URL}/api/estado_persona/`
        );
        setEstado(
          responseEstado.data.map((item) => ({
            value: item.id_estado_persona,
            label: item.nombre,
          }))
        );

        const responseCentroCostos = await axios.get(
          `${API_URL}/api/centro_costos/`
        );
        setCentroCostos(
          responseCentroCostos.data.map((item) => ({
            value: item.id_centro_costo,
            label: item.nombre, // Mantener el nombre original en el valor
          }))
        );

        const responseAreas = await axios.get(
          `${API_URL}/api/area/`
        );
        setArea(
          responseAreas.data.map((item) => ({
            value: item.id_area,
            label: item.nombre,
          }))
        );

        const responseRegion = await axios.get(
          `${API_URL}/api/region/`
        );
        setRegion(
          responseRegion.data.map((item) => ({
            value: item.id_region,
            label: item.nombre,
          }))
        );

        const responseCargo = await axios.get(
          `${API_URL}/api/cargo/`
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
        setIsLoading(false);
        setIsCatalogsLoading(false);  // Añadido
      }
    };

    fetchCatalogos();
  }, []);

  // Nuevo useEffect para actualizar los totales cada vez que cambie la lista de personas
  useEffect(() => {
    const activos = personas.filter(
      (persona) => persona.nombre_estado_persona === "Activo"
    ).length;
    const inactivos = personas.filter(
      (persona) => persona.nombre_estado_persona === "Inactivo"
    ).length;

    setTotalActivos(activos);
    setTotalInactivos(inactivos);
  }, [personas]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPersonData((prevData) => ({ ...prevData, [name]: value }));
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

  const createPersona = async () => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...newPersonData,
        id_centro_costo: parseInt(newPersonData.id_centro_costo, 10),
        id_area: parseInt(newPersonData.id_area, 10),
        id_region: parseInt(newPersonData.id_region, 10),
        id_cargo: parseInt(newPersonData.id_cargo, 10),
        id_estado_persona: parseInt(newPersonData.id_estado_persona, 10),
      };

      const response = await axios.post(
        `${API_URL}/api/personas/`,
        formattedData
      );
      const nuevaPersona = response.data;
      setPersonas([...personas, nuevaPersona]);
      setNewPersonData({});
      cambiarEstadoModal(false);
      toast.success("Persona creada exitosamente!");
      fetchData();
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

  const updatePerson = async () => {
    setIsLoading(true);
    try {
      const updatedData = {
        ...personaSeleccionada,
        ...newPersonData,
      };

      const formattedData = {
        ...updatedData,
        id_centro_costo: parseInt(newPersonData.id_centro_costo, 10),
        id_area: parseInt(newPersonData.id_area, 10),
        id_region: parseInt(newPersonData.id_region, 10),
        id_cargo: parseInt(newPersonData.id_cargo, 10),
        id_estado_persona: parseInt(newPersonData.id_estado_persona, 10),
      };

      const response = await axios.put(
        `${API_URL}/api/personas/${personaSeleccionada.id_trabajador}/`,
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
      fetchData();
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

  const abrirModal = (
    titulo,
    fields,
    disabledFields = [],
    initialValues = {},
    action = ""
  ) => {
    if (isCatalogsLoading) {
      toast.info("Espere a que los datos se carguen completamente.");
      return;
    }

    let fieldsWithOptions = fields.map((field) => {
      if (field.id === "id_centro_costo") {
        return { ...field, label: "Alianza", options: centroCostos.map(option => ({ ...option })) };
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

    if (action === "create") {
      initialValues.id_estado_persona = estado.find(e => e.label === "Activo")?.value || "";
      fieldsWithOptions = fieldsWithOptions.filter(field => field.id !== "id_estado_persona");
    }

    setNewPersonData(initialValues);
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

  const abrirModalFiltros = () => {
    const fieldsWithOptions = filterFields.map((field) => {
      if (field.id === "id_centro_costo") {
        return { ...field, label: "Alianza", options: centroCostos.map(option => ({ ...option })) };
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



    cambiarModalConfig({
      titulo: "Agregar Filtros",
      contenido: (
        <FiltroDinamico
          activeFilters={activeFilters}
          onAddFilter={handleAddFilter}
          onRemoveFilter={handleRemoveFilter}
          onFiltroChange={handleFiltroChange}
          filtroValues={filtroValues}
          fieldsWithOptions={fieldsWithOptions}
        />
      ),
    });
    cambiarEstadoModalFiltros(true);
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
      console.log("Filter added:", filterId);
      console.log("Active filters:", activeFilters);
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
    abrirModal("Registrar Trabajador", formFields, [], {}, "create");
  };

  const handleEdit = (persona) => {
    setPersonaSeleccionada(persona);
    abrirModal(
      `Actualizar ${persona.nombres}  ${persona.apellidos}`,
      formFields,
      ["identificacion", "correo_institucional", "correo_personal"],
      persona,
      "update"
    );
  };

  const handleInfo = (persona) => {
    setPersonaSeleccionada(persona);
    abrirModal(
      `Información de ${persona.nombres}`,
      formFields,
      ALL_INPUT_IDS,
      persona,
      "detail"
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredPersonas = personas.filter((persona) => {
    const searchString = `${persona.id_trabajador} ${persona.nombres} ${persona.identificacion} ${persona.correo_institucional} ${persona.nombre_estado_persona}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());

    const matchesFilters = Object.keys(filtroValues).every((key) => {
      if (!filtroValues[key]) return true;
      return String(persona[key]) === String(filtroValues[key]);
    });

    return matchesSearch && matchesFilters;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredPersonas.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredPersonas.length / recordsPerPage);

  return (
    <>
      <TarjetasPersonas
        totalActivos={totalActivos}
        totalInactivos={totalInactivos}
        totalequiposAsignados={totalequiposAsignados}
        totalLicenciasPersonas={totalLicenciasPersonas}
      />
      <div style={{ marginTop: '-1.5vh' }} className="contenedor-activos">
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
            <FontAwesomeIcon className="agregar-filtros" icon={faBarsProgress} onClick={abrirModalFiltros}></FontAwesomeIcon>
          </div>
          <Divtabla style={{ maxHeight: "42.4vh", overflowY: "auto", display: "block" }} className="contenedor-tabla-activos">
            <table style={{ width: "100%" }} className="table-personas">
              <thead style={{ position: 'sticky', top: '0' }}>
                <tr>
                  <th style={{ paddingLeft: "0vw" }}>ID Trabajador</th>
                  <th style={{ paddingLeft: "3.2vw" }}>Nombre Completo</th>
                  <th style={{ paddingLeft: "0vw" }}>Numero Identificación</th>
                  <th style={{ paddingLeft: "5vw" }}>Correo Institucional</th>
                  <th style={{ paddingLeft: "2.5vw" }}>Estado</th>
                  <th style={{ paddingLeft: "4vw" }}>Acciones</th>
                </tr>
              </thead>
              <tbody >
                {isLoading ? (
                  <tr>
                    <td></td>
                    <td style={{ paddingLeft: "13vw" }}></td>
                    <td style={{ paddingLeft: "13vw" }}>
                      <Loading>
                        <Spinner />
                        <span>Loading..</span>
                      </Loading>
                    </td>
                    <td style={{ paddingLeft: "13vw" }}></td>
                    <td></td>
                    <td></td>
                  </tr>
                ) : (
                  currentRecords.map((persona) => (
                    <tr key={persona.id_trabajador}>
                      <td>{persona.id_trabajador}</td>
                      <td style={{ paddingLeft: "2vw" }}>{persona.nombres} {persona.apellidos}</td>
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
        onCreate={createPersona}
        onUpdate={updatePerson}
      >
        {modalConfig.contenido}
      </Modal>

      <ModalFiltros
        estado={estadoModalFiltros}
        cambiarEstado={cambiarEstadoModalFiltros}
        titulo="Agregar Filtros"
        onCreate={applyFiltros}
        onClear={clearFiltros}
        actionType={"Clear"}
      >
        <FiltroDinamico
          activeFilters={activeFilters}
          onAddFilter={handleAddFilter}
          onRemoveFilter={handleRemoveFilter}
          onFiltroChange={handleFiltroChange}
          filtroValues={filtroValues}
          fieldsWithOptions={filterFields.map((field) => {
            if (field.id === "id_centro_costo") {
              return { ...field, label: "Alianza", options: centroCostos.map(option => ({ ...option })) }; // Renombrar a Alianza en la etiqueta
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
          })}
        />
        {showFilterOptions && (
          <FilterOptions>
            {filterFields
              .filter((field) => !activeFilters.includes(field.id))
              .map((field) => (
                <FilterOptionButton
                  style={{ marginLeft: "1vw" }}
                  key={field.id}
                  onClick={() => handleAddFilter(field.id)}
                >
                  {field.label}
                </FilterOptionButton>
              ))}
          </FilterOptions>
        )}
        <AgregarFiltroContainer>
          <FontAwesomeIcon
            icon={faPlusCircle}
            style={{ width: "4vw", height: "4vh", marginLeft: "-3.5vw" }}
            className="add-filter-icon"
            onClick={() => setShowFilterOptions((prev) => !prev)}
          />
        </AgregarFiltroContainer>
      </ModalFiltros>
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
const LoadingRow = styled.tr`
  height: 200px; /* Ajusta esta altura según sea necesario */
`;

const LoadingCell = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #545c8c;
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
  }
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const FilterOptionButton = styled.button`
  background: #545c8c;
  width: 20vw;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 9px;
  margin: 4px 0;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const AgregarFiltroContainer = styled.div`
  display: flex;
  justify-content: center;
  color: #545c8c;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
const Divtabla = styled.div`
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #545c8c;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #3a9ee1;
  }
`;
