import React, { useState } from "react";
import styled from "styled-components";

function Form() {
  return (
    <>
      <Formulario>
        <GrupoInput>
          <LabelForms htmlFor="identificacion">
            N° Documento<span class="text-danger"> *</span>
          </LabelForms>
          <input type="text" className="form-control" id="identificacion" />
        </GrupoInput>
        <GrupoInput>
          <LabelForms htmlFor="nombres">
            Nombres<span class="text-danger"> *</span>
          </LabelForms>
          <input type="text" className="form-control" id="nombres" />
        </GrupoInput>
        <GrupoInput>
          <LabelForms htmlFor="apellidos">
            Apellidos<span class="text-danger"> *</span>
          </LabelForms>
          <input type="text" className="form-control" id="apellidos" />
        </GrupoInput>
        <GrupoInput>
          <LabelForms htmlFor="correo_personal">Correo Personal</LabelForms>
          <input type="email" className="form-control" id="correo_personal" />
        </GrupoInput>
        <GrupoInput>
          <LabelForms htmlFor="correo_institucional">
            Correo Institucional<span class="text-danger"> *</span>
          </LabelForms>
          <input
            type="email"
            className="form-control"
            id="correo_institucional"
          />
        </GrupoInput>
        <GrupoInput>
          <LabelForms htmlFor="fecha_ingreso_empresa">
            Fecha De Ingreso <span className="text-danger"> *</span>
          </LabelForms>
          <input
            type="date"
            className="form-control"
            id="fecha_ingreso_empresa"
          />
        </GrupoInput>
        <GrupoInput>
          <LabelForms htmlFor="id_alianza">Alianza<span className="text-danger"> *</span></LabelForms>
          <select name="id_alianza" id="id_alianza" className="form-select">
            <option value=""></option>
            <option value="Prueba">Prueba 1</option>
          </select>
        </GrupoInput>
        <GrupoInput>
          <LabelForms htmlFor="id_area">Area<span className="text-danger"> *</span></LabelForms>
          <select name="id_area" id="id_area" className="form-select">
            <option value=""></option>
            <option value="Prueba">Prueba 1</option>
          </select>
        </GrupoInput>
        <GrupoInput>
          <LabelForms htmlFor="id_region">Region<span className="text-danger"> *</span></LabelForms>
          <select name="id_region" id="id_region" className="form-select">
            <option value=""></option>
            <option value="Prueba">Prueba 1</option>
          </select>
        </GrupoInput>
        <GrupoInput>
          <LabelForms htmlFor="id_cargo">Cargo<span className="text-danger"> *</span></LabelForms>
          <select name="id_cargo" id="id_cargo" className="form-select">
            <option value=""></option>
            <option value="Prueba">Prueba 1</option>
          </select>
        </GrupoInput>
      </Formulario>
    </>
  );
}

export default Form;

const Formulario = styled.form`
  width: 90%;

  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 16px;
  }

  .form-select {
    /* Estilos adicionales para selects, si es necesario */
    appearance: none;
    padding: 10px 20px; /* Ajusta el relleno como se desee */
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }

  .form-control:focus {
    outline: none;
    border: 2px solid #5050c9;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
  }

  .form-select:focus {
    border: 2px solid #5050c9; /* Cambia el color del borde del select */
  }

  .form-control:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .form-select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const GrupoInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LabelForms = styled.label`
  width: fit-content; /* Permitir que el ancho de las etiquetas se ajuste al contenido */
  margin-right: 0.9rem; /* Agregar un pequeño espacio entre la etiqueta y el control */

  .text-danger {
    color: #dc3545 !important;
  }
`;
