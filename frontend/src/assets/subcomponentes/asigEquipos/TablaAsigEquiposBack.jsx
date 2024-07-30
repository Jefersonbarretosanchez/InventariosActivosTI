import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faPlus, faPenToSquare, faMagnifyingGlass, faPlusCircle, faCircleMinus, faMinus, faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import Modal from "../generales/modal";
import ModalDesasignacion from "../generales/modalDesasignacion";
import ModalFiltros from "../generales/modalFiltros";
import styled from "styled-components";
import { formFields, formFields2, filterFields, ALL_INPUT_IDS } from "./formConfig";
import FormDinamico from "../generales/formDinamico";
import Paginate from "../generales/paginate";
import FiltroDinamico from "../generales/filtroDinamico";
import TarjetasAsigEquipos from "./tarjetasAsigEquipos";

function TablaAsigEquiposBack({ totalequiposAsignados, totalEquiposDisponibles, totalperifericosAsignados, totalperifericosDisponibles, fetchData }) {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [modalConfig, cambiarModalConfig] = useState({
    titulo: "",
    contenido: null,
  });

  const [asigequipos, setAsigEquipos] = useState([]);
  const [desasigequipos, setDesasigEquipos] = useState([]);
  const [asigEquiposSeleccionado, setasigEquiposSeleccionado] = useState(null);
  const [desasigEquiposSeleccionado, setDesasigEquiposSeleccionado] = useState(null);
  const [equipo, setEquipo] = useState([]);
  const [equipoFiltrado, setEquipoFiltrado] = useState([]);
  const [trabajador, setTrabajador] = useState([]);
  const [trabajadorFiltrado, setTrabajadorFiltrado] = useState([]);
  const [perifericos, setPerifericos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCatalogsLoading, setIsCatalogsLoading] = useState(false);
  const [newAsigEquipoData, setnewAsigEquipoData] = useState({});
  const [newDesasigEquipoData, setnewDesasigEquipoData] = useState({});
  const [actionType, setActionType] = useState("");


  const [coordinadores, setCoordinadores] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);


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

  const fetchasigEquipos = async () => {
    setIsLoading(true);
    try {
      const responseasigEquipos = await axios.get(
        `${API_URL}/api/asignar_equipo/`
      );
      setAsigEquipos(responseasigEquipos.data);
    } catch (error) {
      toast.error("Hubo un error en la carga de datos de Asignacion Equipos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchasigEquipos();
  }, []);

  const fetchCatalogos = async () => {
    setIsLoading(true);
    setIsCatalogsLoading(true);
    try {
      const responseEquipos = await axios.get(
        `${API_URL}/api/equipos/`
      );
      const equiposData = responseEquipos.data.map((item) => ({
        value: item.id_equipo,
        label: item.nombre_equipo,
      }));
      setEquipo(equiposData);

      const responseTrabajador = await axios.get(
        `${API_URL}/api/licencias/responsables/`
      );
      const trabajadoresData = responseTrabajador.data.map((item) => ({
        value: item.id_trabajador,
        label: item.nombres,
      }));
      setTrabajador(trabajadoresData);

      const responsePerifericos = await axios.get(
        `${API_URL}/api/kit_perifericos/`
      );
      setPerifericos(
        responsePerifericos.data.map((item) => ({
          value: item.id_kit_perifericos,
          label: item.id_kit_perifericos,
        }))
      );

      const responseCoordinadores = await axios.get(
        `${API_URL}/api/coordinadores/`
      );
      setCoordinadores(
        responseCoordinadores.data.map((item) => ({
          value: item.id_coordinadores,
          label: item.nombre,
        }))
      );

      const responseUbicaciones = await axios.get(
        `${API_URL}/api/ubicaciones/`
      );
      setUbicaciones(
        responseUbicaciones.data.map((item) => ({
          value: item.id_ubicacion,
          label: item.nombre,
        }))
      );

      // Fetch only unassigned equipos and trabajadores
      const responseEquiposFiltrados = await axios.get(
        `${API_URL}/api/equipos_en_bodega/`
      );
      setEquipoFiltrado(
        responseEquiposFiltrados.data.map((item) => ({
          value: item.id_equipo,
          label: item.nombre_equipo,
        }))
      );

      const responseTrabajadorFiltrados = await axios.get(
        `${API_URL}/api/personas_sin_asignacion/`
      );
      setTrabajadorFiltrado(
        responseTrabajadorFiltrados.data.map((item) => ({
          value: item.id_trabajador,
          label: item.nombres,
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
    setnewAsigEquipoData((prevData) => ({ ...prevData, [name]: value }));
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

  const createasigEquipo = async () => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...newAsigEquipoData,
        id_equipo: parseInt(newAsigEquipoData.id_equipo, 10),
        id_trabajador: parseInt(newAsigEquipoData.id_trabajador, 10),
        id_kit_perifericos: parseInt(newAsigEquipoData.id_kit_perifericos, 10),
      };

      const response = await axios.post(
        `${API_URL}/api/asignar_equipo/`,
        formattedData
      );
      const nuevaasigEquipo = response.data;
      setAsigEquipos([...asigequipos, nuevaasigEquipo]);
      setnewAsigEquipoData({});
      cambiarEstadoModal(false);
      toast.success("La Asignacion de equipo creada exitosamente!");
      fetchData(); // Actualizar los datos
      fetchasigEquipos();
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

  const createDesasigEquipo = async () => {
    setIsLoading(true);
    try {

      const updatedData = {
        ...desasigEquiposSeleccionado,
        ...newAsigEquipoData,
      };

      const formattedData = {
        ...updatedData,
        id_equipo: parseInt(newAsigEquipoData.id_equipo, 10),
        id_trabajador: parseInt(newAsigEquipoData.id_trabajador, 10),
        id_coordinadores: parseInt(newAsigEquipoData.id_coordinadores, 10),
        id_ubicacion: parseInt(newAsigEquipoData.id_ubicacion, 10),
      };
      console.log("id equipo:" + formattedData.id_equipo);

      const response = await axios.put(
        `${API_URL}/api/desasignar_equipo/${desasigEquiposSeleccionado.id_asignacion}/`,
        formattedData
      );

      const nuevaDesasigEquipo = response.data;
      setDesasigEquipos(
        desasigequipos.map((desasigequipo) =>
          desasigequipo.id_asignacion === nuevaDesasigEquipo.id_asignacion
            ? nuevaDesasigEquipo
            : desasigequipo
        ));
      setnewDesasigEquipoData({});
      cambiarEstadoModalDesasignacion(false);
      toast.success("La Desasignacion del equipo fue exitosa!");
      fetchData(); // Actualizar los datos
      fetchasigEquipos();
      fetchCatalogos(); // Actualizar los catálogos
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
          { position: "bottom-center", }
        );
      } else {
        toast.error(`${errorMessage} (Código de error: ${statusCode})`);
      }
      cambiarEstadoModalDesasignacion(false);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAsigEquipo = async () => {
    setIsLoading(true);
    try {
      const updatedData = {
        ...asigEquiposSeleccionado,
        ...newAsigEquipoData,
      };

      const formattedData = {
        ...updatedData,
        id_equipo: parseInt(newAsigEquipoData.id_equipo, 10),
        id_trabajador: parseInt(newAsigEquipoData.id_trabajador, 10),
        id_kit_perifericos: parseInt(newAsigEquipoData.id_kit_perifericos, 10),
      };

      const response = await axios.put(
        `${API_URL}/api/actualizar_asignacion_equipo/${asigEquiposSeleccionado.id_asignacion}/`,
        formattedData
      );
      const updatedasigEquipo = response.data;
      setAsigEquipos(
        asigequipos.map((asigequipo) =>
          asigequipo.id_asignacion === updatedasigEquipo.id_asignacion
            ? updatedasigEquipo
            : asigequipo
        )
      );
      setnewAsigEquipoData({});
      cambiarEstadoModal(false);
      toast.success("La Asignacion del equipo fue actualizada exitosamente!");
      fetchData(); // Actualizar los datos
      fetchasigEquipos();
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
      if (field.id === "id_equipo") {
        return { ...field, options: action === "create" ? equipoFiltrado : equipo };
      } else if (field.id === "id_trabajador") {
        return { ...field, options: action === "create" ? trabajadorFiltrado : trabajador };
      } else if (field.id === "id_kit_perifericos") {
        return { ...field, options: perifericos };
      }
      return field;
    });
    console.log("Fields with options:", fieldsWithOptions);
    if (action === "degree") {
      setnewDesasigEquipoData(initialValues);
    } else {
      setnewAsigEquipoData(initialValues);
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
    const fieldsWithOptions = formFields.map((field) => {
      if (field.id === "id_equipo") {
        return { ...field, options: equipo };
      } else if (field.id === "id_trabajador") {
        return { ...field, options: trabajador };
      } else if (field.id === "id_coordinadores") {
        return { ...field, options: coordinadores };
      } else if (field.id === "id_ubicacion") {
        return { ...field, options: ubicaciones };
      }
      return field;
    });
    console.log("Fields with options:", fieldsWithOptions);

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
    abrirModal("Crear Asignacion Equipo", formFields, [], {}, "create");
  };

  const handleEdit = (asigequipo) => {
    setasigEquiposSeleccionado(asigequipo);
    abrirModal(
      `Actualizar ${asigequipo.id_asignacion}`,
      formFields,
      ["id_equipo", "id_trabajador"],
      asigequipo,
      "update"
    );
  };

  const handleDesgree = (desasigequipo) => {
    setDesasigEquiposSeleccionado(desasigequipo);
    abrirModal(
      "Desasignar Equipo",
      formFields2.map((field) => {
        if (field.id === "id_trabajador") {
          return { ...field, options: trabajador };
        } else if (field.id === "id_coordinadores") {
          return { ...field, options: coordinadores };
        } else if (field.id === "id_ubicacion") {
          return { ...field, options: ubicaciones };
        }
        return field;
      }),
      ["id_trabajador", "id_equipo"],
      desasigequipo,
      "degree"
    );
  };

  const handleInfo = (asigequipo) => {
    setasigEquiposSeleccionado(asigequipo);
    abrirModal(
      `Información de ${asigequipo.id_asignacion}`,
      formFields,
      ALL_INPUT_IDS,
      asigequipo,
      "detail"
    );
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredasigEquipos = asigequipos.filter((asigequipo) => {
    const searchString = `${asigequipo.id_asignacion} ${asigequipo.nombre_equipo} ${asigequipo.nombre_trabajador} ${asigequipo.id_kit_perifericos}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());

    const matchesFilters = Object.keys(filtroValues).every((key) => {
      if (!filtroValues[key]) return true;
      return String(asigequipo[key]) === String(filtroValues[key]);
    });

    return matchesSearch && matchesFilters;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredasigEquipos.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredasigEquipos.length / recordsPerPage);

  return (
    <>
      <div style={{ marginTop: '-2.4vh' }}>
        < TarjetasAsigEquipos
          totalequiposAsignados={totalequiposAsignados}
          totalEquiposDisponibles={totalEquiposDisponibles}
          totalperifericosAsignados={totalperifericosAsignados}
          totalperifericosDisponibles={totalperifericosDisponibles} />
      </div>
      <div style={{ marginTop: '5.7vh' }} className="contenedor-activos">
        <div className="row-activos">
          <div className="asigEquipos">
            <h1>Asignacion Equipos</h1>
          </div>
          <div style={{ marginLeft: '0.5vw' }} className="contbuscador-asigEquipos">
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
                  <th style={{ paddingLeft: "6vw" }}>Empleado</th>
                  <th style={{ paddingLeft: "3vw" }}>Equipo</th>
                  <th style={{ paddingLeft: "1vw" }}>Fecha Entrega</th>
                  <th style={{ paddingLeft: "5.8vw" }}>Acciones</th>
                </tr>
              </thead>
              <tbody >
                {isLoading ? (
                  <tr>
                    <td></td>
                    <td style={{ paddingLeft: "13vw" }}></td>
                    <td style={{ paddingLeft: "1vw" }}>
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
                  currentRecords.map((asigequipo) => (
                    <tr key={asigequipo.id_asignacion}>
                      <td style={{ paddingLeft: "8.5vw" }}>{asigequipo.id_asignacion}</td>
                      <td>{asigequipo.nombre_trabajador} {asigequipo.apellido_trabajador}</td>
                      <td style={{ paddingLeft: "1vw" }}>{asigequipo.nombre_equipo}</td>
                      <td style={{ paddingLeft: "2vw" }}>{asigequipo.fecha_entrega_equipo}</td>
                      <td>
                        <button
                          className="btn-accion"
                          onClick={() => handleEdit(asigequipo)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button
                          className="btn-accion"
                          onClick={() => handleInfo(asigequipo)}
                        >
                          <FontAwesomeIcon icon={faFileLines} />
                        </button>

                        <button
                          className="btn-accion"
                          onClick={() => handleDesgree(asigequipo)}

                        >
                          <FontAwesomeIcon icon={faMinus} />
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
        onCreate={createasigEquipo}
        onUpdate={updateAsigEquipo}
        onDegree={createDesasigEquipo}
      >
        {modalConfig.contenido}
      </Modal>

      <ModalDesasignacion
        estado={estadoModalDesasignacion}
        cambiarEstado={cambiarEstadoModalDesasignacion}
        titulo={modalConfig.titulo}
        actionType={actionType}
        onCreate={createasigEquipo}
        onUpdate={updateAsigEquipo}
        onDegree={createDesasigEquipo}
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
            } else if (field.id === "id_coordinadores") {
              return { ...field, options: coordinadores };
            } else if (field.id === "id_ubicacion") {
              return { ...field, options: ubicaciones };
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

export default TablaAsigEquiposBack;

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
