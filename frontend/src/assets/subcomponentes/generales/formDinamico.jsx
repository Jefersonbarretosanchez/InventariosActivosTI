import React from 'react';
import styled from "styled-components";

const FormDinamico = ({ fields, disabledFields, initialValues, onInputChange }) => {
  return (
    <Formulario>
      {fields.map((field) => (
        <div key={field.id} className="form-group">
          <label>{field.label}</label>
          {field.type === "select" ? (
            <select
              className="form-select"
              name={field.id}
              defaultValue={initialValues[field.id] || ''}
              onChange={onInputChange}
              disabled={disabledFields.includes(field.id)}
            >
              <option value="">Seleccione una opción</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="form-control"
              type={field.type}
              name={field.id}
              defaultValue={initialValues[field.id] || ''}
              onChange={onInputChange}
              disabled={disabledFields.includes(field.id)}
            />
          )}
        </div>
      ))}
    </Formulario>
  );
};

export default FormDinamico;

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
    appearance: none;
    padding: 10px 20px;
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
    border: 2px solid #5050c9;
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
