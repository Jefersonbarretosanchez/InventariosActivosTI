import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faPlus, faPenToSquare, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Modal from "../generales/modal";
import styled from "styled-components";
import { formFields, ALL_INPUT_IDS } from "./formConfig";
import FormDinamico from "../generales/formDinamico";

function TablaPersonasBack() {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [modalConfig, cambiarModalConfig] = useState({
    titulo: "",
    contenido: null,
  });
  const [personas, setPersonas] = useState([]);
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/personas/')
      .then(response => {
        setPersonas(response.data);
      })
      .catch(error => {
        console.error("Error al obtener las personas", error);
      });
  }, []);

  const abrirModal = (titulo, fields, disabledFields = [], initialValues = {}) => {
    cambiarModalConfig({
      titulo,
      contenido: (
        <FormDinamico
          fields={fields}
          disabledFields={disabledFields}
          initialValues={initialValues}
        />
      ),
    });
    cambiarEstadoModal(true);
  };

  const handleEdit = (persona) => {
    setPersonaSeleccionada(persona);
    abrirModal(`Editar ${persona.nombres}  ${persona.apellidos}`, formFields, ["identificacion", "correo_institucional"], persona);
  };

  return (
    <>
      <div className="contenedor-activos">
        <div className="row-activos">
          <div className="Personas">
            <h1>Personas</h1>
          </div>
          <div className="contbuscador-personas">
            <input
              className="buscador-personas"
              type="text"
              placeholder="Buscar"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="buscador-icon-activos"
            />
          </div>
          <div>
            <FontAwesomeIcon
              className="agregar-personas"
              onClick={() => abrirModal("Agregar Persona", formFields, [])}
              icon={faPlus}
            />
          </div>
          <div className="contenedor-tabla-activos">
            <table className="table-personas">
              <thead>
                <tr>
                  <th>ID Trabajador</th>
                  <th>Nombres</th>
                  <th>Numero Identificación</th>
                  <th>Correo Institucional</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {personas.map(persona => (
                  <tr key={persona.id_trabajador}>
                    <td>{persona.id_trabajador}</td>
                    <td>{persona.nombres}</td>
                    <td>{persona.identificacion}</td>
                    <td>{persona.correo_institucional}</td>
                    <td>{persona.id_estado_persona}</td>
                    <td>
                      <button
                        className="btn-accion"
                        onClick={() => handleEdit(persona)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        className="btn-accion"
                        onClick={() =>
                          abrirModal(
                            `Información de ${persona.nombres} ${persona.apellidos}`,
                            formFields,
                            ALL_INPUT_IDS,
                            persona
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faFileLines} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        estado={estadoModal}
        cambiarEstado={cambiarEstadoModal}
        titulo={modalConfig.titulo}
      >
        {modalConfig.contenido}
      </Modal>
    </>
  );
}

export default TablaPersonasBack;

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