import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faPlus, faPenToSquare, faMagnifyingGlass, faPlusCircle, faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import Modal from "../generales/modal";
import ModalFiltros from "../generales/modalFiltros";
import styled from "styled-components";
import { formFields, filterFields, ALL_INPUT_IDS } from "./formConfig";
import FormDinamico from "../generales/formDinamico";
import Paginate from "../generales/paginate";
import FiltroDinamico from "../generales/filtroDinamico";
import TarjetasLicencias from './tarjetasLicencias';

function TablaLicPersonasBack({ setTotalLicenciasPersonas, totalLicenciasPersonas, totalLicenciasEquipos }) {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [modalConfig, cambiarModalConfig] = useState({
    titulo: "",
    contenido: null,
  });

  const [licpersonas, setLicPersonas] = useState([]);
  const [licpersonaSeleccionada, setLicpersonaSeleccionada] = useState(null);
  const [contrato, setContrato] = useState([]);
  const [estadoLicencia, setEstadoLicencia] = useState([]);
  const [solicitante, setSolicitante] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newLicPersonData, setNewLicPersonData] = useState({});
  const [actionType, setActionType] = useState("");
  const [totalActivos, setTotalActivos] = useState(0); // Estado para el total de personas activas
  const [totalInactivos, setTotalInactivos] = useState(0); // Estado para el total de personas inactivas
  // const [TotalLicenciasPersonass, setTotalLicenciasPersonass] = useState(0);

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
      setRecordsPerPage(20);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchlicPersonas = async () => {
    setIsLoading(true);
    try {
      const responselicPersonas = await api.get(
        `${API_URL}/api/licencias/persona/`
      );
      setLicPersonas(responselicPersonas.data);
    } catch (error) {
      toast.error("Hubo un error en la carga de datos de Licencias Personas");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchlicPersonas();
  }, []);

  useEffect(() => {
    const fetchCatalogos = async () => {
      setIsLoading(true);
      setIsCatalogsLoading(true);  // Añadido
      try {
        const responseContratos = await api.get(
          `${API_URL}/api/licencias/contratos/`
        );
        setContrato(
          responseContratos.data.map((item) => ({
            value: item.id_contrato,
            label: item.nombre, // Mantener el nombre original en el valor
          }))
        );

        const responseEstado = await api.get(
          `${API_URL}/api/licencias/estado/`
        );
        setEstadoLicencia(
          responseEstado.data.map((item) => ({
            value: item.id_estado_licencia,
            label: item.nombre, // Mantener el nombre original en el valor
          }))
        );

        const responseSolicitante = await api.get(
          `${API_URL}/api/licencias/responsables/`
        );
        setSolicitante(
          responseSolicitante.data.map((item) => ({
            value: item.id_trabajador,
            label: item.nombres + " " + item.apellidos,
          }))
        );
      } catch (error) {
        toast.error("Hubo un error en la carga de datos de los catalogos.");
      } finally {
        setIsLoading(false);
        setIsCatalogsLoading(false);
      }
    };

    fetchCatalogos();
  }, []);
  useEffect(() => {
    const LicActivas = licpersonas.filter(
      (licpersona) => licpersona.nombre_estado_licencia === "Asignada"
    ).length;
    const LicInactivas = licpersonas.filter(
      (licpersona) => licpersona.nombre_estado_licencia === "Sin Asignar"
    ).length;

    setTotalActivos(LicActivas);
    setTotalInactivos(LicInactivas);
    setTotalLicenciasPersonas(licpersonas.length);
  }, [licpersonas]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLicPersonData((prevData) => ({ ...prevData, [name]: value }));
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

  const createlicPersona = async () => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...newLicPersonData,
        id_contrato: parseInt(newLicPersonData.id_contrato, 10),
        id_estado_licencia: parseInt(newLicPersonData.id_estado_licencia, 10),
        id_solicitante: parseInt(newLicPersonData.id_solicitante, 10),
      };

      const response = await api.post(
        `${API_URL}/api/licencias/persona/`,
        formattedData
      );
      const nuevalicPersona = response.data;
      setLicPersonas([...licpersonas, nuevalicPersona]);
      setNewLicPersonData({});
      cambiarEstadoModal(false);
      toast.success("Licencia Persona creada exitosamente!");
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

  const updateLicPerson = async () => {
    setIsLoading(true);
    try {
      const updatedData = {
        ...licpersonaSeleccionada,
        ...newLicPersonData,
      };

      const formattedData = {
        ...updatedData,
        id_contrato: parseInt(newLicPersonData.id_contrato, 10),
        id_estado_licencia: parseInt(newLicPersonData.id_estado_licencia, 10),
        id_solicitante: parseInt(newLicPersonData.id_solicitante, 10),
      };

      const response = await api.put(
        `${API_URL}/api/licencias/persona/${licpersonaSeleccionada.id_licencia}/`,
        formattedData
      );
      const updatedlicPersona = response.data;
      setLicPersonas(
        licpersonas.map((licpersona) =>
          licpersona.id_licencia === updatedlicPersona.id_licencia
            ? updatedlicPersona
            : licpersona
        )
      );
      setNewLicPersonData({});
      cambiarEstadoModal(false);
      toast.success("Licencia Persona actualizada exitosamente!");
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
        toast.error(`${errorMessage} (Código de error: {statusCode})`);
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
      if (field.id === "id_contrato") {
        return { ...field, options: contrato };
      } else if (field.id === "id_estado_licencia") {
        return { ...field, options: estadoLicencia };
      } else if (field.id === "id_solicitante") {
        return { ...field, options: solicitante };
      }
      return field;
    });

    if (action === "create") {
      initialValues.id_estado_licencia = estadoLicencia.find(e => e.label === "Sin Asignar")?.value || "";
      fieldsWithOptions = fieldsWithOptions.filter(field => field.id !== "id_estado_licencia");
    }

    setNewLicPersonData(initialValues);
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
      if (field.id === "id_contrato") {
        return { ...field, options: contrato };
      } else if (field.id === "id_estado_licencia") {
        return { ...field, options: estadoLicencia };
      } else if (field.id === "id_solicitante") {
        return { ...field, options: solicitante };
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
    abrirModal("Registrar Licencia", formFields, [], {}, "create");
  };

  const handleEdit = (licpersona) => {
    setLicpersonaSeleccionada(licpersona);
    abrirModal(
      `Actualizar ${licpersona.nombre_licencia}`,
      formFields,
      ["sereal"],
      licpersona,
      "update"
    );
  };

  const handleInfo = (licpersona) => {
    setLicpersonaSeleccionada(licpersona);
    abrirModal(
      `Información de ${licpersona.nombre_licencia}`,
      formFields,
      ALL_INPUT_IDS,
      licpersona,
      "detail"
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredlicPersonas = licpersonas.filter((licpersona) => {
    const searchString = `${licpersona.id_licencia} ${licpersona.nombre_licencia} ${licpersona.sereal} ${licpersona.no_ticket}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());

    const matchesFilters = Object.keys(filtroValues).every((key) => {
      if (!filtroValues[key]) return true;
      return String(licpersona[key]) === String(filtroValues[key]);
    });

    return matchesSearch && matchesFilters;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredlicPersonas.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredlicPersonas.length / recordsPerPage);

  return (
    <>
      <div style={{ marginTop: '-2.5vh' }}>
        <TarjetasLicencias
          totalActivos={totalActivos}
          totalInactivos={totalInactivos}
          totalLicenciasPersonas={totalLicenciasPersonas}
          totalLicenciasEquipos={totalLicenciasEquipos}
        />
      </div>
      <div style={{ marginTop: '5.7vh' }} className="contenedor-activos">
        <div className="row-activos">
          <div className="asigEquipos">
            <h1>Licencias Personas</h1>
          </div>
          <div className="contbuscador-asigEquipos">
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
            <FontAwesomeIcon style={{ marginLeft: '38vw' }} className="agregar-filtros" icon={faBarsProgress} onClick={abrirModalFiltros}></FontAwesomeIcon>
          </div>
          <Divtabla style={{ maxHeight: "36.4vh", overflowY: "auto", display: "block" }} className="contenedor-tabla-activos">
            <table style={{ width: "100%" }} className="table-personas">
              <thead style={{ position: 'sticky', top: '0' }}>
                <tr>
                  <th style={{ paddingLeft: "2.7vw" }}>ID</th>
                  <th style={{ paddingLeft: "3.2vw" }}>Nombre Licencia</th>
                  <th style={{ paddingLeft: "3vw" }}>Numero Serial</th>
                  <th style={{ paddingLeft: "1vw" }}>Contrato</th>
                  <th style={{ paddingLeft: "0vw" }}>Fecha de Vencimiento</th>
                  <th style={{ paddingLeft: "1.5vw" }}>Estado</th>
                  <th style={{ paddingLeft: "4vw" }}>Acciones</th>
                </tr>
              </thead>
              <tbody >
                {isLoading ? (
                  <tr>
                    <td></td>
                    <td style={{ paddingLeft: "25vw" }}></td>
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
                  currentRecords.map((licpersona) => (
                    <tr key={licpersona.id_licencia}>
                      <td style={{ paddingLeft: "2.5vw" }}>{licpersona.id_licencia}</td>
                      <td style={{ paddingLeft: "2vw" }}>{licpersona.nombre_licencia}</td>
                      <td>{licpersona.sereal}</td>
                      <td style={{ paddingLeft: "1vw" }}>{licpersona.nombre_contrato}</td>
                      <td>{licpersona.fecha_vencimiento}</td>
                      <td
                        style={{
                          color:
                            licpersona.nombre_estado_licencia === "Activa" || licpersona.nombre_estado_licencia === "Asignada"
                              ? "#10A142"
                              : "#ff0000",
                          paddingLeft: "1.5vw"
                        }}
                      >
                        {licpersona.nombre_estado_licencia}
                      </td>
                      <td>
                        <button
                          className="btn-accion"
                          onClick={() => handleEdit(licpersona)}
                        >
                          <FontAwesomeIcon className="icon-accion" icon={faPenToSquare} />
                        </button>
                        <button
                          className="btn-accion"
                          onClick={() => handleInfo(licpersona)}
                        >
                          <FontAwesomeIcon className="icon-accion" icon={faFileLines} />
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
        onCreate={createlicPersona}
        onUpdate={updateLicPerson}
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
            if (field.id === "id_contrato") {
              return { ...field, options: contrato };
            } else if (field.id === "id_estado_licencia") {
              return { ...field, options: estadoLicencia };
            } else if (field.id === "id_solicitante") {
              return { ...field, options: solicitante };
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

export default TablaLicPersonasBack;

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
