import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faPlus, faPenToSquare, faMagnifyingGlass, faPlusCircle, faCircleMinus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../generales/modal";
import ModalDesasignacion from "../generales/modalDesasignacion"
import ModalFiltros from "../generales/modalFiltros";
import styled from "styled-components";
import { formFields1, filterFields, ALL_INPUT_IDS } from "./formConfig";
import FormDinamico from "../generales/formDinamico";
import Paginate from "../generales/paginate";
import FiltroDinamico from "../generales/filtroDinamico";
import TarjetasAplicaciones from "./tarjetasAplicaciones";



function TablaAsigAplicacionesBack({ totalPersonasActivas, totalPersonasInactivas, totalAplicaciones, totalAplicacionesAsig, fetchData }) {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [modalConfig, cambiarModalConfig] = useState({
    titulo: "",
    contenido: null,
  });

  const [asigaplicaciones, setAsigAplicaciones] = useState([]);
  const [desasigaplicaciones, setDesasigAplicaciones] = useState([]);
  const [asigAplicacionSeleccionada, setasigAplicacionSeleccionada] = useState(null);
  const [desasigAplicacionSeleccionada, setDesasigAplicacioneleccionado] = useState(null);
  const [aplicacion, setAplicacion] = useState([]);
  const [AplicacionFiltrada, setAplicacionFiltrada] = useState([]);
  const [trabajador, setTrabajador] = useState([]);
  const [trabajadorFiltrado, setTrabajadorFiltrado] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCatalogsLoading, setIsCatalogsLoading] = useState(false);
  const [newAsigAplicacionData, setnewAsigAplicacionData] = useState({});
  const [newDesAsigAplicacionData, setnewDesAsigAplicacionData] = useState({});
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

  const fetchasigAplicacion = async () => {
    setIsLoading(true);
    try {
      const responseasigAplicacion = await axios.get(
        "http://localhost:8000/api/aplicaciones/asignar/"
      );
      setAsigAplicaciones(responseasigAplicacion.data);
    } catch (error) {
      toast.error("Hubo un error en la carga de datos de Asignacion de Aplicaciones");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchasigAplicacion();
  }, []);

  const fetchCatalogos = async () => {
    setIsLoading(true);
    setIsCatalogsLoading(true);
    try {
      const responseAplicaciones = await axios.get(
        "http://localhost:8000/api/aplicaciones/"
      );
      setAplicacion(
        responseAplicaciones.data.map((item) => ({
          value: item.id_aplicacion,
          label: item.nombre_aplicativo,
        }))
      );

      const responseTrabajador = await axios.get(
        "http://localhost:8000/api/licencias/responsables/"
      );
      setTrabajador(
        responseTrabajador.data.map((item) => ({
          value: item.id_trabajador,
          label: item.nombres, // Mantener el nombre original en el valor
        }))
      );

      const responseAplicacionesFiltradas = await axios.get(
        "http://localhost:8000/api/licencias_sin_asignar/"
      );
      setAplicacionFiltrada(
        responseAplicacionesFiltradas.data.map((item) => ({
          value: item.id_aplicacion,
          label: item.nombre_aplicacion,
        }))
      );

      const responseTrabajadorFiltrados = await axios.get(
        "http://localhost:8000/api/personas_sin_asignacion_licencia/"
      );
      setTrabajadorFiltrado(
        responseTrabajadorFiltrados.data.map((item) => ({
          value: item.id_trabajador,
          label: item.nombres, // Mantener el nombre original en el valor
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
    setnewAsigAplicacionData((prevData) => ({ ...prevData, [name]: value }));
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

  const createasigAplicacion = async () => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...newAsigAplicacionData,
        id_aplicacion: parseInt(newAsigAplicacionData.id_aplicacion, 10),
        id_trabajador: parseInt(newAsigAplicacionData.id_trabajador, 10),
      };
      console.log("id licencia:" + formattedData.id_aplicacion);

      const response = await axios.post(
        "http://localhost:8000/api/aplicaciones/asignar/",
        formattedData
      );
      const nuevaasigAplacion = response.data;
      setAsigAplicaciones([...asigaplicaciones, nuevaasigAplacion]);
      setnewAsigAplicacionData({});
      cambiarEstadoModal(false);
      toast.success("La Asignacion de la Aplicacion fue creada exitosamente!");
      await fetchData();
      fetchasigAplicacion();
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

  const createDesasigAplicaciones = async () => {
    setIsLoading(true);
    try {

      const updatedData = {
        ...desasigAplicacionSeleccionada,
        ...newAsigAplicacionData,
      };

      const formattedData = {
        ...updatedData,
        id_aplicacion: parseInt(newAsigAplicacionData.id_aplicacion, 10),
        id_trabajador: parseInt(newAsigAplicacionData.id_trabajador, 10),
      };
      console.log("id licencia:" + formattedData.id_aplicacion);

      const response = await axios.put(
        `http://localhost:8000/api/aplicaciones/desasignar/${desasigAplicacionSeleccionada.id}/`,
        formattedData
      );

      const nuevaDesasigAplicacion = response.data;
      setDesasigAplicaciones(
        desasigaplicaciones.map((desasigaplicaciones) =>
          desasigaplicaciones.id === nuevaDesasigAplicacion.id
            ? nuevaDesasigAplicacion
            : desasigaplicaciones
        ));
      setnewDesAsigAplicacionData({});
      cambiarEstadoModalDesasignacion(false);
      toast.success("La Desasignacion de la Aplicacion fue exitosa!");
      fetchData();
      fetchasigAplicacion();
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
      if (field.id === "id_aplicacion") {
        return { ...field, options: action === "create" ? aplicacion : aplicacion };
      } else if (field.id === "id_trabajador") {
        return { ...field, options: action === "create" ? trabajador : trabajador };
      }
      return field;
    });

    if (action === "degree") {
      setnewDesAsigAplicacionData(initialValues);
    } else {
      setnewAsigAplicacionData(initialValues);
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
    abrirModal("Crear Asignacion Licencia", formFields1, [], {}, "create");
  };

  const handleDesgree = (desasigaplicaciones) => {
    setDesasigAplicacioneleccionado(desasigaplicaciones);
    abrirModal(
      `Desasignar Aplicacion`,
      formFields1.map((field) => {
        if (field.id === "id_aplicacion") {
          return { ...field, options: aplicacion };
        } else if (field.id === "id_trabajador") {
          return { ...field, options: trabajador };
        }
        return field;
      }),
      ["id_trabajador", "id_aplicacion", "fecha_instalacion"],
      desasigaplicaciones,
      "degree"
    );
  };


  const handleInfo = (asigaplicaciones) => {
    setasigAplicacionSeleccionada(asigaplicaciones);
    abrirModal(
      `Información de ${asigaplicaciones.id}`,
      formFields1,
      ALL_INPUT_IDS,
      asigaplicaciones,
      "detail"
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredasigAplicaciones = asigaplicaciones.filter((asigaplicaciones) => {
    const searchString = `${asigaplicaciones.id} ${asigaplicaciones.nombre_trabajador} ${asigaplicaciones.nombre_aplicacion}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());

    const matchesFilters = Object.keys(filtroValues).every((key) => {
      if (!filtroValues[key]) return true;
      return String(asigaplicaciones[key]) === String(filtroValues[key]);
    });

    return matchesSearch && matchesFilters;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredasigAplicaciones.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredasigAplicaciones.length / recordsPerPage);

  return (
    <>
      <div style={{ marginTop: '-2.5vh' }}>
        < TarjetasAplicaciones
          totalPersonasActivas={totalPersonasActivas}
          totalPersonasInactivas={totalPersonasInactivas}
          totalAplicaciones={totalAplicaciones}
          totalAplicacionesAsig={totalAplicacionesAsig} />
      </div>
      <div style={{ marginTop: '5.7vh' }} className="contenedor-activos">
        <div className="row-activos">
          <div className="asigEquipos">
            <h1>Asignacion Aplicaciones</h1>
          </div>
          <div style={{ marginLeft: '4.5vw' }} className="contbuscador-asigEquipos">
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
              style={{ marginLeft: '39vw' }}
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
                  <th style={{ paddingLeft: "0vw" }}>Nombre Trabajador</th>
                  <th style={{ paddingLeft: "3vw" }}>Aplicaciones</th>
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
                  currentRecords.map((asigaplicaciones) => (
                    <tr key={asigaplicaciones.id}>
                      <td style={{ paddingLeft: "9vw" }}>{asigaplicaciones.id}</td>
                      <td>{asigaplicaciones.nombre_trabajador} {asigaplicaciones.apellido_trabajador}</td>
                      <td style={{ paddingLeft: "0vw" }}>{asigaplicaciones.nombre_aplicacion}</td>
                      <td>
                        <button
                          className="btn-accion"
                          onClick={() => handleDesgree(asigaplicaciones)}
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
        onCreate={createasigAplicacion}
        onDegree={createDesasigAplicaciones}
      >
        {modalConfig.contenido}
      </Modal>

      <ModalDesasignacion
        estado={estadoModalDesasignacion}
        cambiarEstado={cambiarEstadoModalDesasignacion}
        titulo={modalConfig.titulo}
        actionType={actionType}
        onCreate={createasigAplicacion}
        onDegree={createDesasigAplicaciones}
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

export default TablaAsigAplicacionesBack;

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
