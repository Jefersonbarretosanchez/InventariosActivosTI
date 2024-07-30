import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faPlus, faPenToSquare, faMagnifyingGlass, faPlusCircle, faCircleMinus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../generales/modal";
import ModalDesasignacion from "../generales/modalDesasignacion"
import ModalFiltros from "../generales/modalFiltros";
import styled from "styled-components";
import { formFields1, formFields2, filterFields, ALL_INPUT_IDS } from "./formConfig";
import FormDinamico from "../generales/formDinamico";
import Paginate from "../generales/paginate";
import FiltroDinamico from "../generales/filtroDinamico";
import TarjetasAsigLicencias from "./tarjetasAsigLicencias";


function TablaAsigLicEquiposBack({ totalLicPersonasAsignadas, totalLicPersonasDisponibles, totalLicEquiposAsignados, totalLicEquiposDisponibles, fetchData }) {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [modalConfig, cambiarModalConfig] = useState({
    titulo: "",
    contenido: null,
  });

  const [asiglicequipos, setAsigLicEquipos] = useState([]);
  const [desasiglicequipos, setDesasigLicEquipos] = useState([]);
  const [asiglicEquipoSeleccionado, setasigLicEquipoSeleccionado] = useState(null);
  const [desasiglicEquipoSeleccionado, setDesasigLicEquipoSeleccionado] = useState(null);
  const [licencia, setLicencia] = useState([]);
  const [lienciaFiltrada, setLicnciaFiltrada] = useState([]);
  const [equipo, setEquipo] = useState([]);
  const [equipoFiltrado, setEquipoFiltrado] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCatalogsLoading, setIsCatalogsLoading] = useState(false);
  const [newAsigLicEquipoData, setnewAsigLicEquipoData] = useState({});
  const [newDesAsigLicEquipoData, setnewDesAsigLicEquipoData] = useState({});
  const [actionType, setActionType] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(15); // Cambiado a 15

  const [estadoModalFiltros, cambiarEstadoModalFiltros] = useState(false);
  const [estadoModalDesasignacion, cambiarEstadoModalDesasignacion] = useState(false);
  const [filtroValues, setFiltroValues] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL

  const handleResize = () => {
    const width = window.innerWidth;
    if (width > 0) {
      setRecordsPerPage(20);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchasigLicEquipo = async () => {
    setIsLoading(true);
    try {
      const responseasigLicEquipo = await axios.get(
        `${API_URL}/api/licencias/asignar_licencia_equipo/`
      );
      setAsigLicEquipos(responseasigLicEquipo.data);
    } catch (error) {
      toast.error("Hubo un error en la carga de datos de Asignacion de Licencias Equipos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchasigLicEquipo();
  }, []);

  const fetchCatalogos = async () => {
    setIsLoading(true);
    setIsCatalogsLoading(true);
    try {
      const responseLicEquipo = await axios.get(
        `${API_URL}/api/licencias/equipo/`
      );
      setLicencia(
        responseLicEquipo.data.map((item) => ({
          value: item.id_licencia,
          label: item.nombre_licencia,
        }))
      );

      const responseEquipo = await axios.get(
        `${API_URL}/api/equipos/`
      );
      setEquipo(
        responseEquipo.data.map((item) => ({
          value: item.id_equipo,
          label: item.nombre_equipo, // Mantener el nombre original en el valor
        }))
      );

      const responseLicEquiposFiltradas = await axios.get(
        `${API_URL}/api/licencias_sin_asignar_equipos/`
      );
      setLicnciaFiltrada(
        responseLicEquiposFiltradas.data.map((item) => ({
          value: item.id_licencia,
          label: item.nombre_licencia,
        }))
      );

      const responseEquiposFiltrados = await axios.get(
        `${API_URL}/api/equipos_sin_asignacion_licencia/`
      );
      setEquipoFiltrado(
        responseEquiposFiltrados.data.map((item) => ({
          value: item.id_equipo,
          label: item.nombre_equipo,
        }))
      );

    } catch (error) {
      toast.error("Hubo un error en la carga de datos de los catalogos.");
    } finally {
      setIsLoading(false);
      setIsCatalogsLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogos();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setnewAsigLicEquipoData((prevData) => ({ ...prevData, [name]: value }));
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

  const createasigLicEquipo = async () => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...newAsigLicEquipoData,
        id_licencia: parseInt(newAsigLicEquipoData.id_licencia, 10),
        id_equipo: parseInt(newAsigLicEquipoData.id_equipo, 10),
      };

      const response = await axios.post(
        `${API_URL}/api/licencias/asignar_licencia_equipo/`,
        formattedData
      );
      const nuevaasigLicEquipo = response.data;
      setAsigLicEquipos([...asiglicequipos, nuevaasigLicEquipo]);
      setnewAsigLicEquipoData({});
      cambiarEstadoModal(false);
      toast.success("La Asignacion de la Licencia fue creada exitosamente!");
      fetchData();
      fetchasigLicEquipo();
      fetchCatalogos();
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

  const createDesasigLicEquipo = async () => {
    setIsLoading(true);
    try {

      const updatedData = {
        ...desasiglicEquipoSeleccionado,
        ...newAsigLicEquipoData,
      };

      const formattedData = {
        ...updatedData,
        id_licencia: parseInt(newAsigLicEquipoData.id_licencia, 10),
        id_equipo: parseInt(newAsigLicEquipoData.id_equipo, 10),
      };
      console.log("id licencia:" + formattedData.id_licencia);

      const response = await axios.put(
        `${API_URL}/api/licencias/desasignar_licencia_equipo/${desasiglicEquipoSeleccionado.id}/`,
        formattedData
      );

      const nuevaDesasigLicEquipo = response.data;
      setDesasigLicEquipos(
        desasiglicequipos.map((desasiglicequipo) =>
          desasiglicequipo.id === nuevaDesasigLicEquipo.id
            ? nuevaDesasigLicEquipo
            : desasiglicequipo
        ));
      setnewDesAsigLicEquipoData({});
      cambiarEstadoModalDesasignacion(false);
      toast.success("La Desasignacion de la licencia fue exitosa!");
      fetchData();
      fetchasigLicEquipo();
      fetchCatalogos();
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
          </div>,
          { position: "bottom-center" }
        );
      } else {
        toast.error(`${errorMessage} (Código de error: ${statusCode})`);
      }
      cambiarEstadoModalDesasignacion(false);
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
      if (field.id === "id_licencia") {
        return { ...field, options: action === "create" ? lienciaFiltrada : licencia };
      } else if (field.id === "id_equipo") {
        return { ...field, options: action === "create" ? equipo : equipo };
      }
      return field;
    });

    if (action === "degree") {
      setnewDesAsigLicEquipoData(initialValues);
    } else {
      setnewAsigLicEquipoData(initialValues);
    }

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
    if (action === "degree") {
      cambiarEstadoModalDesasignacion(true);
    } else {
      cambiarEstadoModal(true);
    }

  };

  const abrirModalFiltros = () => {
    const fieldsWithOptions = filterFields.map((field) => {
      if (field.id === "id_equipo") {
        return { ...field, options: equipo };
      } else if (field.id === "id_trabajador") {
        return { ...field, options: trabajador };
      } else if (field.id === "id_kit_perifericos") {
        return { ...field, options: perifericos };
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
    abrirModal("Crear Asignacion Licencia", formFields2, [], {}, "create");
  };

  const handleDesgree = (desasiglicequipo) => {
    setDesasigLicEquipoSeleccionado(desasiglicequipo);
    abrirModal(
      `Desasignar Licencia`,
      formFields2.map((field) => {
        if (field.id === "id_licencia") {
          return { ...field, options: licencia };
        } else if (field.id === "id_equipo") {
          return { ...field, options: equipo };
        }
        return field;
      }),
      ["id_equipo", "id_licencia"],
      desasiglicequipo,
      "degree"
    );
  };


  const handleInfo = (asiglicequipo) => {
    setasigLicEquipoSeleccionado(asiglicequipo);
    abrirModal(
      `Información de ${asiglicequipo.id}`,
      formFields2,
      ["id_equipo", "id_licencia"],
      asiglicequipo,
      "detail"
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredasigLicEquipos = asiglicequipos.filter((asiglicequipo) => {
    const searchString = `${asiglicequipo.id} ${asiglicequipo.nombre_equipo} ${asiglicequipo.nombre_licencia}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());

    const matchesFilters = Object.keys(filtroValues).every((key) => {
      if (!filtroValues[key]) return true;
      return String(asiglicequipo[key]) === String(filtroValues[key]);
    });

    return matchesSearch && matchesFilters;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredasigLicEquipos.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredasigLicEquipos.length / recordsPerPage);

  return (
    <>
      <div style={{ marginTop: '-2.5vh' }}>
        < TarjetasAsigLicencias
          totalLicPersonasAsignadas={totalLicPersonasAsignadas}
          totalLicPersonasDisponibles={totalLicPersonasDisponibles}
          totalLicEquiposAsignados={totalLicEquiposAsignados}
          totalLicEquiposDisponibles={totalLicEquiposDisponibles} />
      </div>
      <div style={{ marginTop: '5.7vh' }} className="contenedor-activos">
        <div className="row-activos">
          <div className="asigEquipos">
            <h1>Asignacion Licencias Persona</h1>
          </div>
          <div style={{ marginLeft: '1.5vw' }} className="contbuscador-asigEquipos">
            <input
              className="contbuscador-licenciasPer"
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
              style={{ marginLeft: '37vw' }}
              className="agregar-licPersonas"
              onClick={() => handleCreate()}
              icon={faPlus}
            />
          </div>

          <Divtabla style={{ maxHeight: "36.4vh", overflowY: "auto", display: "block" }} className="contenedor-tabla-activos">
            <table style={{ width: "100%" }} className="table-personas">
              <thead style={{ position: 'sticky', top: '0' }}>
                <tr>
                  <th style={{ paddingLeft: "5vw" }}>ID Asignacion</th>
                  <th style={{ paddingLeft: "0vw" }}>Licencia</th>
                  <th style={{ paddingLeft: "3vw" }}>Equipos</th>
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
                    <td style={{ paddingLeft: "30vw" }}></td>
                    <td></td>
                    <td></td>
                  </tr>
                ) : (
                  currentRecords.map((asiglicequipo) => (
                    <tr key={asiglicequipo.id}>
                      <td style={{ paddingLeft: "9vw" }}>{asiglicequipo.id}</td>
                      <td style={{ paddingLeft: "0vw" }}>{asiglicequipo.nombre_licencia}</td>
                      <td>{asiglicequipo.nombre_equipo}</td>

                      <td>
                        <button
                          className="btn-accion"
                          onClick={() => handleDesgree(asiglicequipo)}

                        >
                          <FontAwesomeIcon icon={faMinus}
                            style={{ marginLeft: '1.4vw' }} />
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
        onCreate={createasigLicEquipo}
        onDegree={createDesasigLicEquipo}
      >
        {modalConfig.contenido}
      </Modal>

      <ModalDesasignacion
        estado={estadoModalDesasignacion}
        cambiarEstado={cambiarEstadoModalDesasignacion}
        titulo={modalConfig.titulo}
        actionType={actionType}
        onCreate={createasigLicEquipo}
        onDegree={createDesasigLicEquipo}
      >
        {modalConfig.contenido}
      </ModalDesasignacion>

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
            if (field.id === "id_equipo") {
              return { ...field, options: equipo };
            } else if (field.id === "id_trabajador") {
              return { ...field, options: trabajador };
            } else if (field.id === "id_kit_perifericos") {
              return { ...field, options: perifericos };
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

export default TablaAsigLicEquiposBack;

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


const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const FilterOptionButton = styled.button`
  background: linear-gradient(to right, #14add6, #384295);
  width: 20vw;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 9px;
  margin: 4px 0;
  cursor: pointer;

  &:hover {
    background: linear-gradient(to right, #384295, #14add6);
    transform: scale(1.05);
  }
`;

const AgregarFiltroContainer = styled.div`
  display: flex;
  justify-content: center;
  color: #384295;
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
