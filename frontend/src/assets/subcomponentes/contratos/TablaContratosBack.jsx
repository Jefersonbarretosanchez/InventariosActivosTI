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
  faBarsProgress
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../generales/modal";
import ModalFiltros from "../generales/modalFiltros";
import styled from "styled-components";
import { formFields, filterFields, ALL_INPUT_IDS } from "./formConfig";
import FormDinamico from "../generales/formDinamico";
import Paginate from "../generales/paginate";
import FiltroDinamico from "../generales/filtroDinamico";
import TarjetasContratos from "./tarjetasContratos";

function TablaContratosBack({ totalLicenciasEquipos, totalLicenciasPersonas, totalLicenciasAreas }) {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [modalConfig, cambiarModalConfig] = useState({
    titulo: "",
    contenido: null,
  });
  const [contratos, setContratos] = useState([]);
  const [contratoSeleccionado, setContratoSeleccionado] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [newContratoData, setNewContratoData] = useState({});
  const [actionType, setActionType] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [totalContratos, setTotalContratos] = useState("");


  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(15); // Cambiado a 15

  const [estadoModalFiltros, cambiarEstadoModalFiltros] = useState(false);
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

  const fetchContratos = async () => {
    setIsLoading(true);
    try {
      const responseContratos = await axios.get(
        "http://localhost:8000/api/licencias/contratos/"
      );
      setContratos(responseContratos.data);
    } catch (error) {
      toast.error("Hubo un error en la carga de datos de los Contratos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContratos();
  }, []);

  useEffect(() => {
    const ncontratos = contratos.length;
    setTotalContratos(ncontratos);
  }, [contratos]);



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewContratoData((prevData) => ({ ...prevData, [name]: value }));
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

  const createContrato = async () => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...newContratoData,
      }
      const response = await axios.post(
        "http://localhost:8000/api/licencias/contratos/",
        formattedData
      );
      const nuevoContrato = response.data;
      setContratos([...contratos, nuevoContrato]);
      setNewContratoData({});
      cambiarEstadoModal(false);
      toast.success("Contrato creado exitosamente!");
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

  const updateContrato = async () => {
    setIsLoading(true);
    try {
      const updatedData = {
        ...contratoSeleccionado,
        ...newContratoData,
      };

      const formattedData = {
        ...updatedData
      };

      const response = await axios.put(
        `http://localhost:8000/api/licencias/contratos/${contratoSeleccionado.id_contrato}/`,
        formattedData
      );
      const updatedContrato = response.data;
      setContratos(
        contratos.map((contrato) =>
          contrato.id_contrato === updatedContrato.id_contrato
            ? updatedContrato
            : contrato
        )
      );
      setNewContratoData({});
      cambiarEstadoModal(false);
      toast.success("Contrato actualizado exitosamente!");
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

    setNewContratoData(initialValues);
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
    abrirModal("Registrar Trabajador", formFields, [], {}, "create");
  };

  const handleEdit = (contrato) => {
    setContratoSeleccionado(contrato);
    abrirModal(
      `Actualizar ${contrato.nombre}`,
      formFields,
      ["sereal"],
      contrato,
      "update"
    );
  };

  const handleInfo = (contrato) => {
    setContratoSeleccionado(contrato);
    abrirModal(
      `Información de ${contrato.nombre}`,
      formFields,
      ALL_INPUT_IDS,
      contrato,
      "detail"
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredContratos = contratos.filter((contrato) => {
    const searchString = `${contrato.id_contrato} ${contrato.nombre} ${contrato.sereal} ${contrato.costo_unitario} ${contrato.costo_total}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());

    const matchesFilters = Object.keys(filtroValues).every((key) => {
      if (!filtroValues[key]) return true;
      return String(contrato[key]) === String(filtroValues[key]);
    });

    return matchesSearch && matchesFilters;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredContratos.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredContratos.length / recordsPerPage);

  return (
    <>
      <TarjetasContratos
        totalContratos={totalContratos} // Pasar el total de activos como props
        totalLicenciasEquipos={totalLicenciasEquipos}
        totalLicenciasPersonas={totalLicenciasPersonas}
        totalLicenciasAreas={totalLicenciasAreas}
      />
      <div style={{ marginTop: '-2vh' }} className="contenedor-activos">
        <div className="row-activos">
          <div className="Personas">
            <h1>Contratos</h1>
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
            {/* <FontAwesomeIcon className="agregar-filtros" icon={faBarsProgress} onClick={abrirModalFiltros}></FontAwesomeIcon> */}
          </div>
          <Divtabla style={{ maxHeight: "42.4vh", overflowY: "auto", display: "block" }} className="contenedor-tabla-activos">
            <table style={{ width: "100%" }} className="table-personas">
              <thead style={{ position: 'sticky', top: '0' }}>
                <tr>
                  <th style={{ paddingLeft: "0vw" }}>ID Contrato</th>
                  <th style={{ paddingLeft: "3.5vw" }}>Contrato</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Vencimiento</th>
                  <th>Cantidad</th>
                  <th style={{ paddingLeft: "5.7vw" }}>Acciones</th>
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
                  currentRecords.map((contrato) => (
                    <tr key={contrato.id_contrato}>
                      <td>{contrato.id_contrato}</td>
                      <td style={{ paddingLeft: "2vw" }}>{contrato.nombre}</td>
                      <td style={{ paddingLeft: "3.4vw" }}>{contrato.fecha_inicio}</td>
                      <td style={{ paddingLeft: "5vw" }}>{contrato.fecha_vencimiento}</td>
                      <td style={{ paddingLeft: "5vw" }}>{contrato.cantidad_licencias}</td>
                      <td style={{ paddingLeft: "4.5vw" }}>
                        <button
                          className="btn-accion"
                          onClick={() => handleEdit(contrato)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button
                          className="btn-accion"
                          onClick={() => handleInfo(contrato)}
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
        onCreate={createContrato}
        onUpdate={updateContrato}
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

export default TablaContratosBack;

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
