import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faPlus, faPenToSquare, faMagnifyingGlass, faPlusCircle, faCircleMinus, faMinus, faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import Modal from "../generales/modal";
import ModalDesasignacion from "../generales/modalDesasignacion"
import ModalFiltros from "../generales/modalFiltros";
import styled from "styled-components";
import { formFields, filterFields, ALL_INPUT_IDS } from "./formConfigKitPerifericos";
import FormDinamico from "../generales/formDinamico";
import Paginate from "../generales/paginate";
import FiltroDinamico from "../generales/filtroDinamico";
import TarjetasAsigEquipos from "./tarjetasAsigEquipos";

function TablaKitPerifericosBack({ totalequiposAsignados, totalEquiposDisponibles, totalperifericosAsignados, totalperifericosDisponibles, fetchData }) {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [modalConfig, cambiarModalConfig] = useState({
    titulo: "",
    contenido: null,
  });

  const [kitperifericos, setKitPerifericos] = useState([]);
  const [quitkitperifericos, setQuitKitPerifericos] = useState([]);
  const [kitperifericosSeleccionado, setKitPerifericosSeleccionado] = useState(null);
  const [quitkitperifericosSeleccionado, setQuitKitPerifericosSeleccionado] = useState(null);
  const [kitperifericos2, setKitPerifericos2] = useState([]);
  const [perifericos, setPerifericos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCatalogsLoading, setIsCatalogsLoading] = useState(false);
  const [newKitPerifericoData, setnewKitPerifericoData] = useState({});
  const [newQuitKitPerifericoData, setnewQuitKitPerifericoData] = useState({});
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
  const [perifericosMap, setPerifericosMap] = useState({});

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
    const fetchKitPerifericos = async () => {
      setIsLoading(true);
      try {
        const responseKitPerifericos = await api.get(
          `${API_URL}/api/kit_perifericos/`
        );
        const kitsData = responseKitPerifericos.data;

        // Transformar los datos para incluir los nombres de los periféricos
        const transformedKitsData = kitsData.map(kit => {
          const perifericosNames = kit.perifericos.map(id => perifericosMap[id] || "Desconocido");
          return {
            ...kit,
            perifericosNames,
          };
        });

        setKitPerifericos(transformedKitsData);
      } catch (error) {
        toast.error("Hubo un error en la carga de datos de los Kit de Perifericos");
      } finally {
        setIsLoading(false);
      }
    };

    if (Object.keys(perifericosMap).length > 0) {
      fetchKitPerifericos();
    }
  }, [perifericosMap]);





  useEffect(() => {
    const fetchCatalogos = async () => {
      setIsLoading(true);
      setIsCatalogsLoading(true);
      try {
        const responsePerifericos = await api.get(
          `${API_URL}/api/perifericos/`
        );

        const perifData = responsePerifericos.data;
        setPerifericos(
          perifData.map((item) => ({
            value: item.id_perifericos,
            label: `${item.nombre_periferico} (${item.sereal})`, // Concatenar nombre y serial
          }))
        );

        // Crear un mapa para acceso rápido a los nombres de los periféricos
        const perifMap = {};
        perifData.forEach(item => {
          perifMap[item.id_perifericos] = `${item.nombre_periferico} (${item.sereal})`;
        });
        setPerifericosMap(perifMap);

      } catch (error) {
        toast.error("Hubo un error en la carga de datos de los catalogos.");
      } finally {
        setIsLoading(false);
        setIsCatalogsLoading(false);
      }
    };

    fetchCatalogos();
  }, []);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setnewKitPerifericoData((prevData) => ({ ...prevData, [name]: value }));
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

  const createKitPeriferico = async () => {
    setIsLoading(true);
    try {
      const perifericosIds = newKitPerifericoData.perifericos.map(periferico => parseInt(periferico, 10));

      const formattedData = {
        ...newKitPerifericoData,
        perifericos: perifericosIds,
      };

      const response = await api.post(
        `${API_URL}/api/kit_perifericos/`,
        formattedData
      );
      const nuevoKitPeriferico = response.data;

      // Transformar el nuevo kit para incluir los nombres de los periféricos
      const perifericosNames = nuevoKitPeriferico.perifericos.map(id => perifericosMap[id] || "Desconocido");
      const transformedNuevoKitPeriferico = {
        ...nuevoKitPeriferico,
        perifericosNames,
      };

      // Actualizar el estado con el nuevo kit
      setKitPerifericos(prevState => [...prevState, transformedNuevoKitPeriferico]);
      setnewKitPerifericoData({});
      cambiarEstadoModal(false);
      toast.success("El Kit Fue Creado Exitosamente!");
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
    // Llamar a fetchKitPerifericos después de crear el nuevo kit
    fetchKitPerifericos();
  };




  const updateKitPerifericos = async () => {
    setIsLoading(true);
    try {
      const perifericosIds = newKitPerifericoData.perifericos.map(periferico => parseInt(periferico, 10));

      const formattedData = {
        ...newKitPerifericoData,
        perifericos: perifericosIds,
      };

      const response = await api.put(
        `${API_URL}/api/kit_perifericos/${kitperifericosSeleccionado.id_kit_perifericos}/`,
        formattedData
      );
      const updatedKitPerifericos = response.data;

      // Transformar el kit actualizado para incluir los nombres de los periféricos
      const perifericosNames = updatedKitPerifericos.perifericos.map(id => perifericosMap[id] || "Desconocido");
      const transformedUpdatedKitPerifericos = {
        ...updatedKitPerifericos,
        perifericosNames,
      };

      setKitPerifericos(
        kitperifericos.map((kitperiferico) =>
          kitperiferico.id_kit_perifericos === transformedUpdatedKitPerifericos.id_kit_perifericos
            ? transformedUpdatedKitPerifericos
            : kitperiferico
        )
      );
      setnewKitPerifericoData({});
      cambiarEstadoModal(false);
      toast.success("El Kit Periferico fue actualizado exitosamente!");
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
      if (field.id === "id_perifericos") {
        return { ...field, options: perifericos };
      }
      return field;
    });

    setnewKitPerifericoData(initialValues);

    setActionType(action);
    cambiarModalConfig({
      titulo: titulo,
      contenido: (
        <FormDinamico
          fields={fieldsWithOptions}
          disabledFields={disabledFields}
          initialValues={initialValues}
          onInputChange={handleInputChange}
          showAddPerifericoButton={action === "create" || action === "update"}
          actionType={action}
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
      if (field.id === "id_perifericos") {
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
    abrirModal("Crear Kit Perifericos", formFields, [], {}, "create");
  };


  const handleEdit = (kitperiferico) => {
    setKitPerifericosSeleccionado(kitperiferico);

    const initialValues = {
      ...kitperiferico,
      perifericos: kitperiferico.perifericos.map(id => {
        const periferico = perifericos.find(p => p.value === id);
        return periferico ? { value: periferico.value, label: periferico.label } : { value: id, label: 'Desconocido' };
      })
    };

    abrirModal(
      `Actualizar ${kitperiferico.id_kit_perifericos}`,
      formFields,
      [""],
      initialValues,
      "update"
    );
  };



  const handleInfo = (kitperiferico) => {
    setKitPerifericosSeleccionado(kitperiferico);
    const initialValues = {
      ...kitperiferico,
      perifericos: kitperiferico.perifericos.map(id => {
        const periferico = perifericos.find(p => p.value === id);
        return periferico ? { value: periferico.value, label: periferico.label } : { value: null, label: '' };
      })
    };
    abrirModal(
      `Información de ${kitperiferico.id_kit_perifericos}`,
      formFields,
      ALL_INPUT_IDS,
      initialValues,
      "detail"
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredKitPerifericos = kitperifericos.filter((kitperiferico) => {
    // Verificar que kitperiferico no sea undefined y que perifericosNames no sea undefined
    if (!kitperiferico || !kitperiferico.perifericosNames) {
      return false;
    }

    const perifericosNames = kitperiferico.perifericosNames;
    const searchString = `${kitperiferico.id_kit_perifericos} ${perifericosNames.join(' ')}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());

    const matchesFilters = Object.keys(filtroValues).every((key) => {
      if (!filtroValues[key]) return true;
      return String(kitperiferico[key]) === String(filtroValues[key]);
    });

    return matchesSearch && matchesFilters;
  });




  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredKitPerifericos.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredKitPerifericos.length / recordsPerPage);
  return (
    <>
      <div style={{ marginTop: '-2.5vh' }}>
        < TarjetasAsigEquipos
          totalequiposAsignados={totalequiposAsignados}
          totalEquiposDisponibles={totalEquiposDisponibles}
          totalperifericosAsignados={totalperifericosAsignados}
          totalperifericosDisponibles={totalperifericosDisponibles} />
      </div>
      <div style={{ marginTop: '5.7vh' }} className="contenedor-activos">
        <div className="row-activos">
          <div className="asigEquipos">
            <h1>Kit Perifericos</h1>
          </div>
          <div style={{ marginLeft: '-5vw' }} className="contbuscador-asigEquipos">
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
              style={{ marginLeft: '60.5vh' }}
              className="agregar-licPersonas"
              onClick={() => handleCreate()}
              icon={faPlus}
              title="Crear Kit"
            />
          </div>

          <Divtabla style={{ maxHeight: "36.4vh", overflowY: "auto", display: "block" }} className="contenedor-tabla-activos">
            <table style={{ width: "100%" }} className="table-personas">
              <thead style={{ position: 'sticky', top: '0' }}>
                <tr>
                  <th style={{ paddingLeft: "15.2vw" }}>ID</th>
                  <th style={{ paddingLeft: "8vw" }}>Perifericos</th>
                  <th style={{ paddingLeft: "6vw" }}>Acciones</th>
                </tr>
              </thead>
              <tbody >
                {isLoading ? (
                  <tr>
                    <td></td>
                    <td style={{ paddingLeft: "0vw" }}></td>
                    <td style={{ paddingLeft: "0vw" }}>
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
                  currentRecords.map((kitperiferico) => (
                    <tr key={kitperiferico.id_kit_perifericos}>
                      <td style={{ paddingLeft: "15.5vw" }}>{kitperiferico.id_kit_perifericos}</td>
                      <td style={{ paddingLeft: "8vw" }}>{kitperiferico.perifericosNames.join(', ')}</td>
                      <td style={{ paddingLeft: "5vw" }}>
                        <button
                          className="btn-accion"
                          onClick={() => handleEdit(kitperiferico)}
                          title="Editar Kit"
                        >
                          <FontAwesomeIcon className="icon-accion" icon={faPenToSquare} />
                        </button>
                        <button
                          className="btn-accion"
                          onClick={() => handleInfo(kitperiferico)}
                          title="Detalle Kit"
                        >
                          <FontAwesomeIcon className="icon-accion" icon={faFileLines} />
                        </button>
                      </td>
                      <td style={{ paddingLeft: "17vw" }}></td>
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
        onCreate={createKitPeriferico}
        onUpdate={updateKitPerifericos}>
        {modalConfig.contenido}
      </Modal>

      <ModalDesasignacion
        estado={estadoModalDesasignacion}
        cambiarEstado={cambiarEstadoModalDesasignacion}
        titulo={modalConfig.titulo}
        actionType={actionType}
        onCreate={createKitPeriferico}
        onUpdate={updateKitPerifericos}
      // onDegree={}
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
            if (field.id === "id_perifericos") {
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

export default TablaKitPerifericosBack;

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
