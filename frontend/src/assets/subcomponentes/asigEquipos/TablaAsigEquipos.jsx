import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faPlus, faPenToSquare, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Modal from "../generales/modal";
import styled from "styled-components";
import perifericos from "../../imagenes/perifericos_general.webp";
import { formFields, ALL_INPUT_IDS } from "../equipos/formConfig";
import FormDinamico from "../generales/formDinamico";

function TablaAsigEquiposBack() {
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
          <div className="asigEquipos">
            <h1>Asignacion de Equipos</h1>
          </div>
          <div className="contbuscador-asigEquipos">
            <input
              className="buscador-asigEquipos"
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
              className="agregar-asigEquipos"
              onClick={() => abrirModal("Agregar Equipo", formFields, [])}
              icon={faPlus}
            />
          </div>
          <div className="contenedor-tabla-activos">
            <table className="table-asigEquipos">
              <thead>
                <th>ID </th>
                <th>Empleado</th>
                <th>Equipo</th>
                <th>Fecha Entrega</th>
                <th>Fecha devolucion</th>
                <th>Perifericos</th>
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
                  <td><img onClick={() =>
                    abrirModal(
                      "Información de {Nombres Equipo}",
                      formFields,
                      ALL_INPUT_IDS
                    )
                  } src={perifericos} className="logo-perifericos btn-accion" /></td>
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
                  <td><img onClick={() =>
                    abrirModal(
                      "Información de {Nombres Equipo}",
                      formFields,
                      ALL_INPUT_IDS
                    )
                  } src={perifericos} className="logo-perifericos btn-accion" /></td>
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
                  <td><img onClick={() =>
                    abrirModal(
                      "Información de {Nombres Equipo}",
                      formFields,
                      ALL_INPUT_IDS
                    )
                  } src={perifericos} className="logo-perifericos btn-accion" /></td>
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

export default TablaAsigEquiposBack;

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
