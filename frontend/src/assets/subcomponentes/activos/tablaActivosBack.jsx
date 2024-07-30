import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsProgress, faFileLines, faMagnifyingGlass, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "./modalActivos";
import ModalFiltros from "../generales/modalFiltros";
import styled from "styled-components";
import { formFields, ALL_INPUT_IDS } from "./formConfig";
import FormDinamico from "./formDinamicoActivos";
import FiltroDinamico from "../generales/filtroDinamico";
import Paginate from "../generales/paginate";
import axios from "axios";
import { toast } from "react-toastify";
import TarjetasActivos from "./tarjetasActivos";

function TablaActivosBack({ totalPersonasActivas, totalequiposAsignados, totalEquiposDisponibles, totalLicenciasPersonas }) {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [modalConfig, cambiarModalConfig] = useState({
    titulo: "",
    contenido: null,
  });
  const [activos, setActivos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [NomEquipo, setNomEquipo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(15);

  const [estadoModalFiltros, cambiarEstadoModalFiltros] = useState(false);
  const [filtroValues, setFiltroValues] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL

  const [filterFields, setFilterFields] = useState([
    {
      id: "nombre_centro_costo",
      label: "Centro de Costo",
      type: "select",
      required: true,
      options: [],
    },
    {
      id: "nombre_equipo",
      label: "Nombre del Equipo",
      type: "select",
      required: true,
      options: [],
    },
  ]);

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
    fetchActivos();
  }, []);

  const fetchActivos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/activos/`); // URL de la API
      setActivos(response.data);


      const centrosDeCosto = response.data.map(activo => activo.nombre_centro_costo);
      const uniqueCentrosDeCosto = [...new Set(centrosDeCosto)];


      const equipos = response.data.flatMap(activo => activo.equipos.map(equipo => equipo.nombre_equipo));
      const uniqueEquipos = [...new Set(equipos)];

      const updatedFilterFields = filterFields.map(field => {
        if (field.id === "nombre_centro_costo") {
          return {
            ...field,
            options: uniqueCentrosDeCosto.map(option => ({ value: option, label: option }))
          };
        }
        if (field.id === "nombre_equipo") {
          return {
            ...field,
            options: uniqueEquipos.map(option => ({ value: option, label: option }))
          };
        }
        return field;
      });
      setFilterFields(updatedFilterFields);

    } catch (error) {
      toast.error("Error cargando los activos");
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

  const abrirModal = (
    titulo,
    fields,
    disabledFields = [],
    initialValues = {}
  ) => {
    const completeInitialValues = {
      ...initialValues,
      nombre_equipo: initialValues.equipos[0]?.nombre_equipo || "",
      anydesk: initialValues.equipos[0]?.anydesk || "",
      licencias: initialValues.licencias || [],
      aplicaciones: initialValues.aplicaciones || [],
    };

    setCurrentStep(0);
    cambiarModalConfig({
      titulo: titulo,
      contenido: (
        <FormDinamico
          fields={fields}
          disabledFields={Array.isArray(disabledFields) ? disabledFields : []}
          initialValues={completeInitialValues}
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredActivos = activos.filter((activo) => {
    const searchString = `${activo.nombres} ${activo.apellidos} ${activo.identificacion} ${activo.correo_institucional} ${activo.nombre_centro_costo} 
    ${activo.equipos.map((equipo) => (
      equipo.nombre_equipo
    ))}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());

    const matchesFilters = Object.keys(filtroValues).every((key) => {
      if (!filtroValues[key]) return true;
      return String(activo[key]) === String(filtroValues[key]);
    });

    return matchesSearch && matchesFilters;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredActivos.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredActivos.length / recordsPerPage);

  return (
    <>
      <TarjetasActivos
        totalPersonasActivas={totalPersonasActivas}
        totalequiposAsignados={totalequiposAsignados}
        totalEquiposDisponibles={totalEquiposDisponibles}
        totalLicenciasPersonas={totalLicenciasPersonas} />
      <div style={{ marginTop: '-1.5vh' }} className="contenedor-activos">
        <div className="row-activos">
          <div className="activos">
            <h1>Activos</h1>
          </div>
          <div className="contbuscador-activos">
            <input
              className="buscador-activos"
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="buscador-icon-activos"
            />
            <FontAwesomeIcon style={{ marginLeft: '1.5vw', marginTop: '2.5vh' }} className="agregar-filtros" icon={faBarsProgress} onClick={abrirModalFiltros}></FontAwesomeIcon>

          </div>
          <div className="contenedor-tabla-activos">
            <Divtabla style={{ maxHeight: "42.4vh", overflowY: "auto", display: "block" }} className="contenedor-tabla-activos">
              <table style={{ width: "100%" }} className="table-personas">
                <thead style={{ position: 'sticky', top: '0' }}>
                  <tr>
                    <th>Nombres</th>
                    <th>Identificación</th>
                    <th>Correo Institucional</th>
                    <th>Alianza</th>
                    <th>Equipo</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
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
                    currentRecords.map((activo) => (
                      <tr key={activo.id}>
                        <td>{activo.nombres} {activo.apellidos}</td>
                        <td>{activo.identificacion}</td>
                        <td>{activo.correo_institucional}</td>
                        <td>{activo.nombre_centro_costo}</td>
                        <td style={{ color: activo.equipos.length === 0 ? 'red' : 'inherit' }}>
                          {activo.equipos.length === 0 ? (
                            "Sin equipo asignado"
                          ) : (
                            activo.equipos.map((equipo, index) => (
                              <div key={index}>{equipo.nombre_equipo}</div>
                            ))
                          )}
                        </td>
                        <td>
                          <button
                            className="btn-accion"
                            onClick={() =>
                              abrirModal(`Detalle Activo`, formFields, ALL_INPUT_IDS, activo)
                            }
                          >
                            <FontAwesomeIcon icon={faFileLines} />
                          </button>
                        </td>
                        <td style={{ marginLeft: '20vw' }}></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </Divtabla>
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
        steps={["Persona", "Equipo", "Licencias", "Aplicaciones"]}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
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

export default TablaActivosBack;

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
