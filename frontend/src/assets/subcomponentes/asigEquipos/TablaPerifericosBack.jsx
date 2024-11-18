import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../../api";
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
import { formFields, formFields2, filterFields, ALL_INPUT_IDS } from "./formConfigKitPerifericos";
import FormDinamico from "../generales/formDinamico";
import Paginate from "../generales/paginate";
import FiltroDinamico from "../generales/filtroDinamico";
import TarjetasAsigEquipos from "./tarjetasAsigEquipos";

function TablaPerifericosBack({ totalequiposAsignados, totalEquiposDisponibles, totalperifericosAsignados, totalperifericosDisponibles, fetchData }) {
  const permisos = JSON.parse(localStorage.getItem('permisos')); // Recuperamos los permisos
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [modalConfig, cambiarModalConfig] = useState({
    titulo: "",
    contenido: null,
  });

  const [perifericos, setPerifericos] = useState([]);
  const [perifericoSeleccionado, setPerifericoSeleccionado] = useState(null);
  const [TotalPerifericos, setTotalPerifericos] = useState([]);
  const [estadoPeriferico, setEstadoPeriferico] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCatalogsLoading, setIsCatalogsLoading] = useState(true); // Estado de carga de catálogos
  const [newPerifericoData, setNewPerifericoData] = useState({});
  const [actionType, setActionType] = useState("");
  const [totalPerifericosAsignados, setTotalperifericosAsignados] = useState(0);
  const [totalPerifericosDisponibles, setTotalPerifericosDisponibles] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(15);

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

  const fetchPerifericos = async () => {
    setIsLoading(true);
    try {
      const responsePerifericos = await api.get(
        `${API_URL}/api/perifericos/`
      );
      setPerifericos(responsePerifericos.data);
    } catch (error) {
      toast.error("Hubo un error en la carga de datos de los Perifericos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPerifericos();
  }, []);

  useEffect(() => {
    const fetchCatalogos = async () => {
      setIsCatalogsLoading(true);
      try {
        const responseEstadoPeriferico = await api.get(
          `${API_URL}/api/estado_perifericos/`
        );
        setEstadoPeriferico(
          responseEstadoPeriferico.data.map((item) => ({
            value: item.id_estado_periferico,
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
    const perifericosAsignados = perifericos.filter(
      (periferico) => periferico.nombre_estado_periferico === "Asignado"
    ).length;
    const perifericosDisponibles = perifericos.filter(
      (periferico) => periferico.nombre_estado_periferico === "En Bodega"
    ).length;
    setTotalperifericosAsignados(perifericosAsignados);
    setTotalPerifericosDisponibles(perifericosDisponibles);
  }, [perifericos]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPerifericoData((prevData) => ({ ...prevData, [name]: value }));
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

  const createPeriferico = async () => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...newPerifericoData,
        id_estado_periferico: parseInt(newPerifericoData.id_estado_periferico, 10),
      };


      const response = await api.post(
        `${API_URL}/api/perifericos/`,
        formattedData
      );
      const nuevoPeriferico = response.data;
      setPerifericos([...perifericos, nuevoPeriferico]);
      setNewPerifericoData({});
      cambiarEstadoModal(false);
      toast.success("Periferico creado exitosamente!");
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

  const updatePeriferico = async () => {
    setIsLoading(true);
    try {
      const updatedData = {
        ...perifericoSeleccionado,
        ...newPerifericoData,
      };

      const formattedData = {
        ...updatedData,
        id_estado_periferico: parseInt(newPerifericoData.id_estado_periferico, 10),
      };

      const response = await api.put(
        `${API_URL}/api/perifericos/${perifericoSeleccionado.id_perifericos}/`,
        formattedData
      );
      const updatedPeriferico = response.data;
      setPerifericos(
        perifericos.map((periferico) =>
          periferico.id_perifericos === updatedPeriferico.id_perifericos
            ? updatedPeriferico
            : periferico
        )
      );
      setNewPerifericoData({});
      cambiarEstadoModal(false);
      toast.success("Periferico actualizado exitosamente!");
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
      if (field.id === "id_estado_periferico") {
        return { ...field, options: estadoPeriferico };
      }
      return field;
    });

    if (action === "create") {
      initialValues.id_estado_periferico = estadoPeriferico.find(e => e.label === "Sin Asignar")?.value || "";
      fieldsWithOptions = fieldsWithOptions.filter(field => field.id !== "id_estado_periferico");
    }

    setNewPerifericoData(initialValues);
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
      if (field.id === "id_estado_periferico") {
        return { ...field, options: estadoPeriferico };
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
    abrirModal("Registrar Periferico", formFields2, [], {}, "create");
  };
  const handleEdit = (periferico) => {
    const rol = localStorage.getItem('rol');
    const camposParaOcultar = rol === 'Administrador' ? [] : ["nombre_periferico", "modelo", "sereal"];

    setPerifericoSeleccionado(periferico);
    abrirModal(
      `Actualizar ${periferico.nombre_periferico} `,
      formFields2,
      camposParaOcultar,
      periferico,
      "update"
    );
  };


  const handleInfo = (periferico) => {
    setPerifericoSeleccionado(periferico);
    abrirModal(
      `Información de ${periferico.nombre_periferico}`,
      formFields2,
      ALL_INPUT_IDS,
      periferico,
      "detail"
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredPerifericos = perifericos.filter((periferico) => {
    const searchString = `${periferico.id_perifericos} ${periferico.nombre_periferico} ${periferico.modelo} ${periferico.sereal} ${periferico.nombre_estado_periferico}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());

    const matchesFilters = Object.keys(filtroValues).every((key) => {
      if (!filtroValues[key]) return true;
      return String(periferico[key]) === String(filtroValues[key]);
    });

    return matchesSearch && matchesFilters;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredPerifericos.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredPerifericos.length / recordsPerPage);

  return (
    <>
      <div style={{ marginTop: '-2.5vh' }}>
        <TarjetasAsigEquipos
          totalequiposAsignados={totalequiposAsignados}
          totalEquiposDisponibles={totalEquiposDisponibles}
          totalperifericosAsignados={totalperifericosAsignados}
          totalperifericosDisponibles={totalperifericosDisponibles}
        />
      </div>
      <div style={{ marginTop: '5.7vh' }} className="contenedor-activos">
        <div className="row-activos">
          <div className="equipos">
            <h1>Perifericos</h1>
          </div>
          <div style={{ marginLeft: '1vw' }} className="contenedor-principal">
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
            <div className="iconos-acciones">
            {permisos && permisos.asignacion_equipos && permisos.asignacion_equipos === 'rw' && (
              <FontAwesomeIcon
                style={{ marginRight: '58vw' }}
                className="agregar-personas"
                onClick={() => handleCreate()}
                icon={faPlus}
                title="Crear Periferico"
              />
            )}
            </div>
          </div>
          <Divtabla style={{ maxHeight: "36.5vh", overflowY: "auto", display: "block" }} className="contenedor-tabla-activos">
            <table style={{ width: "100%" }} className="table-personas">
              <thead style={{ position: 'sticky', top: '0' }}>
                <tr>
                  <th style={{ paddingLeft: "4vw" }}>ID Periferico</th>
                  <th style={{ paddingLeft: "0vw" }}>Nombre Periferico</th>
                  <th style={{ paddingLeft: "0vw" }}>Modelo</th>
                  <th style={{ paddingLeft: "1vw" }}>Numero Serial</th>
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
                    <td style={{ paddingLeft: "25vw" }}></td>
                    <td></td>
                    <td></td>
                  </tr>
                ) : (
                  currentRecords.map((periferico) => (
                    <tr key={periferico.id_perifericos}>
                      <td style={{ paddingLeft: "6.8vw" }}>{periferico.id_perifericos}</td>
                      <td style={{ paddingLeft: "1vw" }}>{periferico.nombre_periferico}</td>
                      <td style={{ paddingLeft: "0vw" }}>{periferico.modelo}</td>
                      <td style={{ paddingLeft: "1.1vw" }}>{periferico.sereal}</td>
                      <td
                        style={{
                          color:
                            periferico.nombre_estado_periferico === "Asignado"
                              ? "#10A142"
                              : "#ff0000",
                          paddingLeft: "0vw"
                        }}
                      >
                        {periferico.nombre_estado_periferico}
                      </td>
                      <td>
                        {permisos && permisos.asignacion_equipos && permisos.asignacion_equipos === 'rw' && (
                          <button
                            className="btn-accion"
                            onClick={() => handleEdit(periferico)}
                            title="Editar Periferico"
                          >
                            <FontAwesomeIcon className="icon-accion" icon={faPenToSquare} />
                          </button>
                        )}
                        {permisos && permisos.asignacion_equipos !== 'n/a' && (
                          <button
                            className="btn-accion"
                            onClick={() => handleInfo(periferico)}
                            title="Detalle Periferico"
                          >
                            <FontAwesomeIcon className="icon-accion" icon={faFileLines} />
                          </button>
                        )}
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
        onCreate={createPeriferico}
        onUpdate={updatePeriferico}
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
            if (field.id === "id_estado_periferico") {
              return { ...field, options: estadoPeriferico };
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

export default TablaPerifericosBack;

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
