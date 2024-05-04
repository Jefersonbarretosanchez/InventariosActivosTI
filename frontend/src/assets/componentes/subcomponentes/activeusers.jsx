import React from 'react';
import detalle from '../../imagenes/detalle_btn.png'
import '../../Estilos/activos.css'


function ActiveUsers() {
    return (
        <div className='contenedor-tabla'>
            <div className="row">
                <div className="col">
                    <h1>Activos</h1>
                </div>
                <div className="col">
                    <input type="search" placeholder='Buscar' />
                </div>
                <table>
                    <thead>
                        <th>Id</th>
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


                                <button class="btn-detail"><img className='img-btn' src={detalle} alt="" /></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </div>
    );
}

export default ActiveUsers;


