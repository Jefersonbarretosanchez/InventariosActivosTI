import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFileLines,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Modal from "../generales/modal";
import styled from "styled-components";
import Form from "../activos/formActivos";

function TablaEquipos() {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  return (
    <>
      <div className="contenedor-activos">
        <div className="row-activos">
          <div className="activos">
            <h1>Equipos</h1>
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
            <FontAwesomeIcon
              onClick={() => cambiarEstadoModal1(!estadoModal1)}
              className="agregar-personas"
              icon={faPlus}
            />
          </div>
          <div className="contenedor-tabla-activos">
            <table className="table-activos">
              <thead>
                <th>ID</th>
                <th>Nombre Equipo</th>
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
                      onClick={() => cambiarEstadoModal1(!estadoModal1)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className="btn-accion"
                      onClick={() => cambiarEstadoModal1(!estadoModal1)}
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
                      onClick={() => cambiarEstadoModal1(!estadoModal1)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className="btn-accion"
                      onClick={() => cambiarEstadoModal1(!estadoModal1)}
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
                      onClick={() => cambiarEstadoModal1(!estadoModal1)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className="btn-accion"
                      onClick={() => cambiarEstadoModal1(!estadoModal1)}
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
        estado={estadoModal1}
        cambiarEstado={cambiarEstadoModal1}
        titulo="Detalle Activos"
      >
        <Contenido>
          <Form />
        </Contenido>
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

  h1 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 10px;
  }
`;
