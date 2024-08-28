import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsProgress, faFileLines, faMagnifyingGlass, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "../generales/modal";
import ModalFiltros from "../generales/modalFiltros";
import styled from "styled-components";
import { formFields, filterFields, ALL_INPUT_IDS } from "../historicoLogs/formConfig";
import FormDinamico from "../generales/formDinamico";
import FiltroDinamico from "../generales/filtroDinamico";
import Paginate from "../generales/paginate";
import api from "../../../api";
import { toast } from "react-toastify";

function TablaHistoricosBack() {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [modalConfig, cambiarModalConfig] = useState({
    titulo: "",
    contenido: null,
  });
  const [historicos, setHistoricos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(15);

  const [estadoModalFiltros, cambiarEstadoModalFiltros] = useState(false);
  const [filtroValues, setFiltroValues] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL

  const [filterFields, setFilterFields] = useState([
    {
      id: "nombre_usuario",
      label: "Nombre de Usuario",
      type: "select",
      required: true,
      options: [], // Opciones iniciales vacías
    },
    {
      id: "correo_usuario",
      label: "Correo de Usuario",
      type: "select",
      required: true,
      options: [], // Opciones iniciales vacías
    },
    {
      id: "tipo_cambio",
      label: "Tipo de Cambio",
      type: "select",
      required: true,
      options: [], // Opciones iniciales vacías
    },
    {
      id: "tipo_activo",
      label: "Tipo de Activo",
      type: "select",
      required: true,
      options: [], // Opciones iniciales vacías
    },
  ]);


  const handleResize = () => {
    const width = window.innerWidth;
    if (width > 0) {
      setRecordsPerPage(150);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchHistoricos();
  }, []);

  const fetchHistoricos = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`${API_URL}/api/log/`); // URL de la API
      setHistoricos(response.data);

      // Extraer las opciones de los campos de filtro
      const nombresUsuarios = response.data.map(historico => historico.nombre_usuario).filter(n => n);
      const correosUsuarios = response.data.map(historico => historico.correo_usuario).filter(n => n);
      const tiposCambio = response.data.map(historico => historico.tipo_cambio);
      const tiposActivo = response.data.map(historico => historico.tipo_activo);

      const uniqueNombresUsuarios = [...new Set(nombresUsuarios)];
      const uniqueCorreosUsuarios = [...new Set(correosUsuarios)];
      const uniqueTiposCambio = [...new Set(tiposCambio)];
      const uniqueTiposActivo = [...new Set(tiposActivo)];

      // Asignar las opciones a los campos de filtro
      const updatedFilterFields = filterFields.map(field => {
        if (field.id === "nombre_usuario") {
          return {
            ...field,
            options: uniqueNombresUsuarios.map(option => ({ value: option, label: option }))
          };
        }
        if (field.id === "correo_usuario") {
          return {
            ...field,
            options: uniqueCorreosUsuarios.map(option => ({ value: option, label: option }))
          };
        }
        if (field.id === "tipo_cambio") {
          return {
            ...field,
            options: uniqueTiposCambio.map(option => ({ value: option, label: option }))
          };
        }
        if (field.id === "tipo_activo") {
          return {
            ...field,
            options: uniqueTiposActivo.map(option => ({ value: option, label: option }))
          };
        }
        return field;
      });
      setFilterFields(updatedFilterFields);

    } catch (error) {
      toast.error("Error cargando los historicos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiltroChange = (event) => {
    const { name, value } = event.target;
    setFiltroValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInfo = (historico) => {
    abrirModal(`Descripcion del Historico`, historico.descripcion);
  };

  const abrirModal = (titulo, contenido) => {
    cambiarModalConfig({
      titulo: titulo,
      contenido: (
        <div>
          <p style={{ width: '90%' }}>{contenido}</p>
        </div>
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredHistoricos = historicos.filter((historico) => {
    const searchString = `${historico.fecha} ${historico.nombre_usuario} ${historico.correo_usuario} ${historico.tipo_cambio} ${historico.tipo_activo} ${historico.activo_modificado}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());

    const matchesFilters = Object.keys(filtroValues).every((key) => {
      if (!filtroValues[key]) return true;
      return String(historico[key]) === String(filtroValues[key]);
    });

    return matchesSearch && matchesFilters;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredHistoricos.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredHistoricos.length / recordsPerPage);

  return (
    <>
      <div className="contenedor-activos" style={{ marginTop: '0.8vh' }}>
        <div className="row-activos">
          <div className="asigPerifericos">
            <h1>Historicos</h1>
          </div>
          <div className="contenedor-principal">
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
              <FontAwesomeIcon title="Agregar Filtros" style={{ marginLeft: '1vw' }} className="agregar-filtros" icon={faBarsProgress} onClick={abrirModalFiltros}></FontAwesomeIcon>

            </div>
          </div>
          <Divtabla style={{ maxHeight: "62.4vh", overflowY: "auto", display: "block" }} className="contenedor-tabla-activos">
            <table style={{ width: "100%" }} className="table-personas">
              <thead style={{ position: 'sticky', top: '0' }}>
                <tr>
                  <th style={{ paddingLeft: '4vw' }}>Fecha</th>
                  <th>Usuario</th>
                  <th>Correo</th>
                  <th >Tipo Cambio</th>
                  <th>Tipo Activo</th>
                  <th>Activo Modificado</th>
                  <th style={{ paddingLeft: '1vw' }}>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td></td>
                    <td style={{ paddingLeft: "0vw" }}></td>
                    <td style={{ paddingLeft: "0vw" }}></td>
                    <td style={{ paddingLeft: "10vw" }}><Loading>
                      <Spinner />
                      <span>Loading..</span>
                    </Loading></td>
                    <td style={{ paddingLeft: "8vw" }}></td>
                  </tr>
                ) : (
                  currentRecords.map((historico) => (
                    <tr key={historico.id}>
                      <td style={{ paddingLeft: '1vw' }}>{historico.fecha}</td>
                      <td>{historico.nombre_usuario}</td>
                      <td >{historico.correo_usuario}</td>
                      <td >{historico.tipo_cambio}</td>
                      <td>{historico.tipo_activo}</td>
                      <td >{historico.activo_modificado}</td>
                      <td>
                        <button

                          className="btn-accion"
                          onClick={() => handleInfo(historico)}
                          title="Detalle"
                        >
                          <FontAwesomeIcon className="icon-accion" icon={faFileLines} />
                        </button>
                      </td>
                      <td style={{ paddingLeft: '1vw' }}></td>
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

export default TablaHistoricosBack;

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
