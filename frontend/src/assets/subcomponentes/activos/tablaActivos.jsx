import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import "../../Estilos/activos.css"

function TablaActivos() {
    return (
        <div className="contenedor-activos">
            <div className="row">
                <div className="activos">
                    <h1>Activos</h1>
                </div>
                <div className="contbuscador">
                    <input className='buscador' type="text" placeholder="Buscar" />
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="buscador-icon" />
                </div>
                <div>
                    <FontAwesomeIcon className="agregar" icon={faPlus} />
                </div>
                <div className="contenedor-tabla">
                    <table className="table table-striped table-hover">
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
                                    <button class="btn-detail">
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
                                    <button class="btn-detail">
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
                                    <button class="btn-detail">
                                        <FontAwesomeIcon icon={faFileLines} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}

export default TablaActivos;
