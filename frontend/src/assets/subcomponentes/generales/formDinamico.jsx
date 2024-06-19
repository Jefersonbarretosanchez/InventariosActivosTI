import React, { useState, useEffect } from 'react';
import styled from "styled-components";

const FormDinamico = ({ fields, disabledFields, initialValues, onInputChange, errors, setErrors }) => {
  useEffect(() => {
    //restricción de datos vacíos formulario
    const initialErrors = {};
    fields.forEach(field => {
      initialErrors[field.id] = '';
    });
    setErrors(initialErrors);
  }, [fields, setErrors]);

  const validateField = (name, value) => {
    //restricción de datos vacíos formulario
    if (!value) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Campo obligatorio' }));
    } else if ((name === "nombres" || name === "apellidos") && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
      // Validación de nombres y apellidos
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Solo se permiten nombres en formato texto' }));
    } else if ((name === "correo_personal" || name === "correo_institucional") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      // Validación de correos
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Formato de correo inválido' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleChange = (event) => {
    //restricción de datos vacíos formulario
    const { name, value } = event.target;
    validateField(name, value);
    onInputChange(event);
  };

  return (
    <Formulario>
      {fields.map((field) => (
        <div key={field.id}>
          <label>{field.label}</label>
          {field.type === "select" ? (
            <>
              <select
                className="form-select"
                name={field.id}
                defaultValue={initialValues[field.id] || ''}
                onChange={handleChange}
                disabled={disabledFields.includes(field.id)}
              >
                <option value="">Seleccione una opción</option>
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors[field.id] && <ErrorMsg>{errors[field.id]}</ErrorMsg>}
            </>
          ) : (
            <>
              <input
                className="form-control"
                type={field.type}
                name={field.id}
                defaultValue={initialValues[field.id] || ''}
                onChange={handleChange}
                disabled={disabledFields.includes(field.id)}
              />
              {errors[field.id] && <ErrorMsg>{errors[field.id]}</ErrorMsg>}
            </>
          )}
        </div>
      ))}
    </Formulario>
  );
};

export default FormDinamico;

const Formulario = styled.form`
  width: 90%;

  .form-control, .form-select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 16px;
  }

  .form-control:focus, .form-select:focus {
    outline: none;
    border: 2px solid #5050c9;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
  }

  .form-control:disabled, .form-select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.span`
  color: #dc3545;
  font-size: 12px;
`;
