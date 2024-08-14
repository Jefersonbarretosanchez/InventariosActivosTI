import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenToSquare, faMagnifyingGlass, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../generales/modal";
import ModalFiltros from "../../generales/modalFiltros";
import styled from "styled-components";
import { formFields, filterFields, ALL_INPUT_IDS } from "../formConfig";
import FormDinamico from "../../generales/formDinamico";
import FiltroDinamico from "../../generales/filtroDinamico";
import Paginate from "../../generales/paginate";
import api from "../../../../api";
import { toast } from "react-toastify";

function TablaCatAlianzaBack() {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [modalConfig, cambiarModalConfig] = useState({
    titulo: "",
    contenido: null,
  });
  const [alianzas, setAlianzas] = useState([]);
  const [alianzaSeleccionada, setAlianzaSeleccionada] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newAlianzaData, setNewAlianzaData] = useState({});
  const [actionType, setActionType] = useState("");
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

  useEffect(() => {
    fetchAlianzas();
  }, []);

  const fetchAlianzas = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`${API_URL}/api/centro_costos/`);
      setAlianzas(response.data);
    } catch (error) {
      toast.error("Error cargando las alianzas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAlianzaData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFiltroChange = (event) => {
    const { name, value } = event.target;
    setFiltroValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const createAlianza = async () => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...newAlianzaData,
      };
      const response = await api.post(`${API_URL}/api/centro_costos/`, formattedData);
      const nuevaAlianza = response.data;
      setAlianzas([...alianzas, nuevaAlianza]);
      setNewAlianzaData({});
      cambiarEstadoModal(false);
      toast.success("Alianza creada exitosamente!");
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

  const updateAlianza = async () => {
    setIsLoading(true);
    try {
      const updatedData = {
        ...alianzaSeleccionada,
        ...newAlianzaData,
      };

      const formattedData = {
        ...updatedData,
      };

      const response = await api.put(
        `${API_URL}/api/centro_costos/${alianzaSeleccionada.id_centro_costo}/`,
        formattedData
      );
      const updatedAlianza = response.data;
      setAlianzas(
        alianzas.map((alianza) =>
          alianza.id_centro_costo === updatedAlianza.id_centro_costo
            ? updatedAlianza
            : alianza
        )
      );
      setNewAlianzaData({});
      cambiarEstadoModal(false);
      toast.success("Alianza actualizada exitosamente!");
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
    let fieldsWithOptions = fields.map((field) => {
      return field;
    });
    setNewAlianzaData(initialValues);
    setActionType(action);
    cambiarModalConfig({
      titulo: titulo,
      contenido: (
        <FormDinamico
          fields={fieldsWithOptions}
          disabledFields={disabledFields || []}
          initialValues={initialValues}
          onInputChange={handleInputChange}
          errors={{}}
          setErrors={() => { }}
          showAddPerifericoButton={false}
          actionType={action}
        />
      ),
    });
    cambiarEstadoModal(true);
  };

  const abrirModalFiltros = () => {
    cambiarModalConfig({
      titulo: "Agregar Filtros",
      contenido: (
        <FiltroDinamico
          activeFilters={activeFilters}
          onAddFilter={handleAddFilter}
          onRemoveFilter={handleRemoveFilter}
          onFiltroChange={handleFiltroChange}
          filtroValues={filtroValues}
          fieldsWithOptions={filterFields.map((field) => field)}
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
      setShowFilterOptions(false);
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
    abrirModal("Agregar Alianza", formFields, [], {}, "create");
  };

  const handleEdit = (alianza) => {
    setAlianzaSeleccionada(alianza);
    abrirModal(
      `Editar ${alianza.nombre}`,
      formFields,
      [],
      alianza,
      "update"
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredAlianzas = alianzas.filter((alianza) => {
    const searchString = `${alianza.id_centro_costo} ${alianza.fecha_registro} ${alianza.nombre}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());

    const matchesFilters = Object.keys(filtroValues).every((key) => {
      if (!filtroValues[key]) return true;
      return String(alianza[key]) === String(filtroValues[key]);
    });

    return matchesSearch && matchesFilters;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredAlianzas.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredAlianzas.length / recordsPerPage);

  return (
    <>
      <div style={{ marginTop: '-2vh' }} className="contenedor-activos">
        <div className="row-activos">
          <div className="asigPerifericos">
            <h1>Catalogo Centro de Costos</h1>
          </div>
          <div className="contbuscador-asigEquipos" style={{ marginLeft: '-3.5vw' }}>
            <input
              className="contbuscador-asigLicenciasEquip"
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
              style={{ marginLeft: '41.8vw' }}
              className="agregar-asigLicenciasEquip "
              onClick={handleCreate}
              icon={faPlus}
            />
          </div>
          <Divtabla style={{ maxHeight: "52.4vh", overflowY: "auto", display: "block" }} className="contenedor-tabla-activos">
            <table style={{ width: "100%" }} className="table-personas">
              <thead>
                <tr>
                  <th style={{ paddingLeft: '10vw' }}>ID</th>
                  <th>Nombre</th>
                  <th style={{ paddingLeft: "9vw" }}>Fecha Registro</th>
                  <th style={{ paddingLeft: '5vw' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td></td>
                    <td style={{ paddingLeft: "5vw" }}></td>
                    <td style={{ paddingLeft: "5vw" }}>
                      <Loading>
                        <Spinner />
                        <span>Loading..</span>
                      </Loading>
                    </td>
                    <td style={{ paddingLeft: "20vw" }}></td>
                    <td></td>
                    <td></td>
                  </tr>
                ) : (
                  currentRecords.map((alianza) => (
                    <tr key={alianza.id_centro_costo}>

                      <td style={{ paddingLeft: "10vw" }}>{alianza.id_centro_costo}</td>

                      <div style={{ width: '100%' }}>
                        <td style={{ paddingLeft: "3.1vw" }}>{alianza.nombre}</td>
                      </div>
                      <td style={{ paddingLeft: "10vw", width: '100%' }}>{alianza.fecha_registro}</td>
                      <td>
                        <button
                          style={{ marginLeft: '3vw' }}
                          className="btn-accion"
                          onClick={() => handleEdit(alianza)}
                        >
                          <FontAwesomeIcon className="icon-accion" icon={faPenToSquare} />
                        </button>
                      </td>
                      <td style={{ paddingLeft: '20vw' }} ></td>
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
        onCreate={createAlianza}
        onUpdate={updateAlianza}
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
          fieldsWithOptions={filterFields.map((field) => field)}
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

export default TablaCatAlianzaBack;

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
