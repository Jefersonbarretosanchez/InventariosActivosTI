import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faPlus,
  faPenToSquare,
  faMagnifyingGlass,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../generales/modal";
import styled from "styled-components";
import { formFields, filterFields, ALL_INPUT_IDS } from "./formConfig";
import FormDinamico from "../generales/formDinamico";
import TarjetasEquipos from "./tarjetasEquipos";
import Paginate from "../generales/paginate";
import FiltroDinamico from "../generales/filtroDinamico";

function TablaEquiposBack({ totalLicenciasEquipos }) {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [modalConfig, cambiarModalConfig] = useState({
    titulo: "",
    contenido: null,
  });

  const [equipos, setEquipos] = useState([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [TotalEquipos, setTotalEquipos] = useState([]);
  const [SO, setSO] = useState([]);
  const [marcaEquipo, setMarcaEquipo] = useState([]);
  const [memoriaRam, setMemoriaRam] = useState([]);
  const [discoDuro, setDiscoDuro] = useState([]);
  const [tipoPropiedad, setTipoPropiedad] = useState([]);
  const [tipoEquipo, setTipoEquipo] = useState([]);
  const [coordinadores, setCoordinadores] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [estadoEquipo, setEstadoEquipo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCatalogsLoading, setIsCatalogsLoading] = useState(true); // Estado de carga de catálogos
  const [newEquipoData, setNewEquipoData] = useState({});
  const [actionType, setActionType] = useState("");
  const [totalequiposAsignados, setTotalequiposAsignados] = useState(0);
  const [totalEquiposDisponibles, setTotalEquiposDisponibles] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(15); // Cambiado a 15

  const [estadoModalFiltros, cambiarEstadoModalFiltros] = useState(false);
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

  const fetchEquipos = async () => {
    setIsLoading(true);
    try {
      const responseEquipos = await axios.get(
        `${API_URL}/api/equipos/`
      );
      setEquipos(responseEquipos.data);
    } catch (error) {
      toast.error("Hubo un error en la carga de datos de los equipos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipos();
  }, []);

  useEffect(() => {
    const fetchCatalogos = async () => {
      setIsCatalogsLoading(true);
      try {
        const responseEstadoEquipo = await axios.get(
          "http://localhost:8000/api/estado_equipo/"
        );
        setEstadoEquipo(
          responseEstadoEquipo.data.map((item) => ({
            value: item.id_estadoequipo,
            label: item.nombre,
          }))
        );

        const responseSO = await axios.get(
          "http://localhost:8000/api/so/"
        );
        setSO(
          responseSO.data.map((item) => ({
            value: item.id_so,
            label: item.nombre,
          }))
        );

        const responseMarcaEquipo = await axios.get(
          "http://localhost:8000/api/marca_equipo/"
        );
        setMarcaEquipo(
          responseMarcaEquipo.data.map((item) => ({
            value: item.id_marcaequipo,
            label: item.nombre,
          }))
        );

        const responseMemoriaRam = await axios.get(
          "http://localhost:8000/api/memoria_ram/"
        );
        setMemoriaRam(
          responseMemoriaRam.data.map((item) => ({
            value: item.id_ram,
            label: item.nombre,
          }))
        );

        const responseDiscoDuro = await axios.get(
          "http://localhost:8000/api/disco_duro/"
        );
        setDiscoDuro(
          responseDiscoDuro.data.map((item) => ({
            value: item.id_discoduro,
            label: item.nombre,
          }))
        );

        const responseTipoPropiedad = await axios.get(
          "http://localhost:8000/api/tipo_propiedad/"
        );
        setTipoPropiedad(
          responseTipoPropiedad.data.map((item) => ({
            value: item.id_tipopropiedad,
            label: item.nombre,
          }))
        );

        const responseTipoEquipo = await axios.get(
          "http://localhost:8000/api/tipo_equipo/"
        );
        setTipoEquipo(
          responseTipoEquipo.data.map((item) => ({
            value: item.id_tipoequipo,
            label: item.nombre,
          }))
        );

        const responseCoordinadores = await axios.get(
          "http://localhost:8000/api/coordinadores/"
        );
        setCoordinadores(
          responseCoordinadores.data.map((item) => ({
            value: item.id_coordinadores,
            label: item.nombre,
          }))
        );

        const responseUbicaciones = await axios.get(
          "http://localhost:8000/api/ubicaciones/"
        );
        setUbicaciones(
          responseUbicaciones.data.map((item) => ({
            value: item.id_ubicacion,
            label: item.nombre,
          }))
        );
      } catch (error) {
        toast.error("Hubo un error en la carga de datos de los catalogos.");
      } finally {
        setIsCatalogsLoading(false);
      }
    };

    fetchCatalogos();
  }, []);

  useEffect(() => {
    const totalEquipos = equipos.length;
    const equiposAsignados = equipos.filter(
      (equipo) => equipo.nombre_estado_equipo === "Asignado"
    ).length;
    const equiposDisponibles = equipos.filter(
      (equipo) => equipo.nombre_estado_equipo === "En Bodega"
    ).length;
    setTotalEquipos(totalEquipos);
    setTotalequiposAsignados(equiposAsignados);
    setTotalEquiposDisponibles(equiposDisponibles);
  }, [equipos]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEquipoData((prevData) => ({ ...prevData, [name]: value }));
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

  const createEquipo = async () => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...newEquipoData,
        id_marcaequipo: parseInt(newEquipoData.id_marcaequipo, 10),
        id_so: parseInt(newEquipoData.id_so, 10),
        id_ram: parseInt(newEquipoData.id_ram, 10),
        id_discoduro: parseInt(newEquipoData.id_discoduro, 10),
        id_tipopropiedad: parseInt(newEquipoData.id_tipopropiedad, 10),
        id_tipoequipo: parseInt(newEquipoData.id_tipoequipo, 10),
        id_coordinadores: parseInt(newEquipoData.id_coordinadores, 10),
        id_ubicacion: parseInt(newEquipoData.id_ubicacion, 10),
        id_estadoequipo: parseInt(newEquipoData.id_estadoequipo, 10),
      };


      const response = await axios.post(
        `${API_URL}/api/equipos/`,
        formattedData
      );
      const nuevoEquipo = response.data;
      setEquipos([...equipos, nuevoEquipo]);
      setNewEquipoData({});
      cambiarEstadoModal(false);
      toast.success("Equipo creado exitosamente!");
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

  const updateEquipo = async () => {
    setIsLoading(true);
    try {
      const updatedData = {
        ...equipoSeleccionado,
        ...newEquipoData,
      };

      const formattedData = {
        ...updatedData,
        id_marcaequipo: parseInt(newEquipoData.id_marcaequipo, 10),
        id_so: parseInt(newEquipoData.id_so, 10),
        id_ram: parseInt(newEquipoData.id_ram, 10),
        id_discoduro: parseInt(newEquipoData.id_discoduro, 10),
        id_tipopropiedad: parseInt(newEquipoData.id_tipopropiedad, 10),
        id_tipoequipo: parseInt(newEquipoData.id_tipoequipo, 10),
        id_coordinadores: parseInt(newEquipoData.id_coordinadores, 10),
        id_ubicacion: parseInt(newEquipoData.id_ubicacion, 10),
        id_estadoequipo: parseInt(newEquipoData.id_estadoequipo, 10),
      };
      console.log("id equipo:" + formattedData.id_coordinadores);

      const response = await axios.put(
        `${API_URL}/api/equipos/${equipoSeleccionado.id_equipo}/`,
        formattedData
      );
      const updatedEquipo = response.data;
      setEquipos(
        equipos.map((equipo) =>
          equipo.id_equipo === updatedEquipo.id_equipo
            ? updatedEquipo
            : equipo
        )
      );
      setNewEquipoData({});
      cambiarEstadoModal(false);
      toast.success("Equipo actualizado exitosamente!");
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
      if (field.id === "id_marcaequipo") {
        return { ...field, options: marcaEquipo };
      } else if (field.id === "id_so") {
        return { ...field, options: SO };
      } else if (field.id === "id_ram") {
        return { ...field, options: memoriaRam };
      } else if (field.id === "id_discoduro") {
        return { ...field, options: discoDuro };
      } else if (field.id === "id_tipopropiedad") {
        return { ...field, options: tipoPropiedad };
      } else if (field.id === "id_tipoequipo") {
        return { ...field, options: tipoEquipo };
      } else if (field.id === "id_estadoequipo") {
        return { ...field, options: estadoEquipo };
      } else if (field.id === "id_coordinadores") {
        return { ...field, options: coordinadores };
      } else if (field.id === "id_ubicacion") {
        return { ...field, options: ubicaciones };
      }
      return field;
    });

    if (action === "create") {
      initialValues.id_estadoequipo = estadoEquipo.find(e => e.label === "En Bodega")?.value || "";
      fieldsWithOptions = fieldsWithOptions.filter(field => field.id !== "id_estadoequipo");
    }

    setNewEquipoData(initialValues);
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
      if (field.id === "id_marcaequipo") {
        return { ...field, options: marcaEquipo };
      } else if (field.id === "id_so") {
        return { ...field, options: SO };
      } else if (field.id === "id_ram") {
        return { ...field, options: memoriaRam };
      } else if (field.id === "id_discoduro") {
        return { ...field, options: discoDuro };
      } else if (field.id === "id_tipopropiedad") {
        return { ...field, options: tipoPropiedad };
      } else if (field.id === "id_tipoequipo") {
        return { ...field, options: tipoEquipo };
      } else if (field.id === "id_estadoequipo") {
        return { ...field, options: estadoEquipo };
      } else if (field.id === "id_coordinadores") {
        return { ...field, options: coordinadores };
      } else if (field.id === "id_ubicacion") {
        return { ...field, options: ubicaciones };
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
    abrirModal("Registrar Equipo", formFields, [], {}, "create");
  };

  const handleEdit = (equipo) => {
    setEquipoSeleccionado(equipo);
    abrirModal(
      `Actualizar ${equipo.nombre_equipo} `,
      formFields,
      ["nombre_equipo", "sereal"],
      equipo,
      "update"
    );
  };

  const handleInfo = (equipo) => {
    setEquipoSeleccionado(equipo);
    abrirModal(
      `Información de ${equipo.nombre_equipo}`,
      formFields,
      ALL_INPUT_IDS,
      equipo,
      "detail"
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredEquipos = equipos.filter((equipo) => {
    const searchString = `${equipo.id_equipo} ${equipo.nombre_equipo} ${equipo.modelo} ${equipo.sereal} ${equipo.nombre_estado_equipo}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());

    const matchesFilters = Object.keys(filtroValues).every((key) => {
      if (!filtroValues[key]) return true;
      return String(equipo[key]) === String(filtroValues[key]);
    });

    return matchesSearch && matchesFilters;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredEquipos.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredEquipos.length / recordsPerPage);

  return (
    <>
      <TarjetasEquipos
        TotalEquipos={TotalEquipos}
        totalequiposAsignados={totalequiposAsignados}
        totalEquiposDisponibles={totalEquiposDisponibles}
        totalLicenciasEquipos={totalLicenciasEquipos}
      />

      <div className="contenedor-activos">
        <div className="row-activos">
          <div className="equipos">
            <h1>Equipos</h1>
          </div>
          <div className="contbuscador-equipos">
            <input
              className="buscador-equipos"
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
              className="agregar-equipos"
              onClick={() => handleCreate()}
              icon={faPlus}
            />
          </div>
          <Divtabla style={{ maxHeight: "42.4vh", overflowY: "auto", display: "block" }} className="contenedor-tabla-activos">
            <table style={{ width: "100%" }} className="table-personas">
              <thead style={{ position: 'sticky', top: '0' }}>
                <tr>
                  <th style={{ paddingLeft: "0vw" }}>ID Equipo</th>
                  <th style={{ paddingLeft: "3.2vw" }}>Nombre Equipo</th>
                  <th style={{ paddingLeft: "6vw" }}>Numero Serial</th>
                  <th style={{ paddingLeft: "2.6vw" }}>Modelo</th>
                  <th style={{ paddingLeft: "0.5vw" }}>Estado</th>
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
                  currentRecords.map((equipo) => (
                    <tr key={equipo.id_equipo}>
                      <td>{equipo.id_equipo}</td>
                      <td style={{ paddingLeft: "4vw" }}>{equipo.nombre_equipo}</td>
                      <td>{equipo.sereal}</td>
                      <td>{equipo.modelo}</td>
                      <td
                        style={{
                          color:
                            equipo.nombre_estado_equipo === "Asignado"
                              ? "#10A142"
                              : "#ff0000",
                          paddingLeft: "0vw"
                        }}
                      >
                        {equipo.nombre_estado_equipo}
                      </td>
                      <td>
                        <button
                          className="btn-accion"
                          onClick={() => handleEdit(equipo)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button
                          className="btn-accion"
                          onClick={() => handleInfo(equipo)}
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
        onCreate={createEquipo}
        onUpdate={updateEquipo}
      >
        {modalConfig.contenido}
      </Modal>

      <Modal
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
            if (field.id === "id_marcaequipo") {
              return { ...field, options: marcaEquipo };
            } else if (field.id === "id_so") {
              return { ...field, options: SO };
            } else if (field.id === "id_ram") {
              return { ...field, options: memoriaRam };
            } else if (field.id === "id_discoduro") {
              return { ...field, options: discoDuro };
            } else if (field.id === "id_tipopropiedad") {
              return { ...field, options: tipoPropiedad };
            } else if (field.id === "id_tipoequipo") {
              return { ...field, options: tipoEquipo };
            } else if (field.id === "id_estadoequipo") {
              return { ...field, options: estadoEquipo };
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
      </Modal>
    </>
  );
}

export default TablaEquiposBack;

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
    background: #72b1d8;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #3a9ee1;
  }
`;
