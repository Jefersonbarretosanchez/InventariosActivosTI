import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../generales/modal";
import styled from "styled-components";
import { formFields, ALL_INPUT_IDS } from "./formConfig";
import FormDinamico from "../generales/formDinamico";

function TablaActivos() {
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

  return (
    <>
      <div className="contenedor-activos">
        <div className="row-activos">
          <div className="activos">
            <h1>Activos</h1>
          </div>
          <div className="contbuscador-activos">
            <input
              className="buscador-activos"
              type="text"
              placeholder="Buscar"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="buscador-icon-activos"
            />
          </div>
          <div>
            {/* <FontAwesomeIcon className="agregar-activos" icon={faPlus} /> */}
          </div>
          <div className="contenedor-tabla-activos">
            <table className="table-activos">
              <thead>
                <th>ID</th>
                <th>Nombres y Apellidos</th>
                <th>Numero Identificación</th>
                <th>Correo Institucional</th>
                <th>Alianza</th>
                <th>Equipo</th>
                <th>Accion</th>
              </thead>
              <tbody>
                {/* Incluir For para la interaccion fila por fila */}
                <tr>
                  <td></td>

                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      className="btn-accion"
                      onClick={() =>
                        abrirModal("Detalles Activos", formFields, ALL_INPUT_IDS)
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
                  <td></td>
                  <td>
                    <button
                      className="btn-accion"
                      onClick={() =>
                        abrirModal(
                          "Detalle 2 Activos",
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
                  <td></td>
                  <td>
                    <button
                      className="btn-accion"
                      onClick={() =>
                        abrirModal(
                          "Detalle 3 Activos",
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

export default TablaActivos;

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
