import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faPlus,
  faPenToSquare,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../generales/modal";
import styled from "styled-components";
import { formFields, ALL_INPUT_IDS } from "./formConfig";
import FormDinamico from "../generales/formDinamico";

function TablaEquipos() {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [modalConfig, cambiarModalConfig] = useState({
    titulo: "",
    contenido: null,
  });

  const abrirModal = (titulo, fields, disabledFields = []) => {
    cambiarModalConfig({
      titulo,
      contenido: (
        <FormDinamico
          fields={fields}
          disabledFields={disabledFields} // Pasar los campos deshabilitados al componente DynamicForm
        />
      ),
    });
    cambiarEstadoModal(true);
  };

  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  return (
    <>
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
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="buscador-icon-activos"
            />
          </div>
          <div>
            <FontAwesomeIcon
              className="agregar-equipos"
              onClick={() => abrirModal("Agregar Equipo", formFields, [])}
              icon={faPlus}
            />
          </div>
          <div className="contenedor-tabla-activos">
            <table className="table-equipos">
              <thead>
                <th>ID Equipo</th>
                <th>Nombres Equipo</th>
                <th>Serial</th>
                <th>Tipo Equipo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </thead>
              <tbody>
                {/* Incluir For para la interaccion fila por fila */}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      className="btn-accion"
                      onClick={() =>
                        abrirModal("Editar {Nombres Equipo}", formFields, [
                          "nombre_equipo",
                          "modelo",
                          "sereal",
                        ])
                      }
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className="btn-accion"
                      onClick={() =>
                        abrirModal(
                          "Información de {Nombres Equipo}",
                          formFields,
                          ALL_INPUT_IDS
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faFileLines} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      className="btn-accion"
                      onClick={() =>
                        abrirModal("Editar {Nombres Equipo}", formFields, [
                          "nombre_equipo",
                          "modelo",
                          "sereal",
                        ])
                      }
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className="btn-accion"
                      onClick={() =>
                        abrirModal(
                          "Información de {Nombres Equipo}",
                          formFields,
                          ALL_INPUT_IDS
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faFileLines} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      className="btn-accion"
                      onClick={() =>
                        abrirModal("Editar {Nombres Equipo}", formFields, [
                          "nombre_equipo",
                          "modelo",
                          "sereal",
                        ])
                      }
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className="btn-accion"
                      onClick={() =>
                        abrirModal(
                          "Información de {Nombres Equipo}",
                          formFields,
                          ALL_INPUT_IDS
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faFileLines} />
                    </button>
                  </td>
                </tr>
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

export default TablaEquipos;

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
  z-index: 100;

  h1 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 10px;
  }
`;
