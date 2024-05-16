import React from "react";
import styled from "styled-components";

const FormDinamico = ({ fields, disabledFields = [] }) => {
  return (
    <Formulario>
      {fields.map((field, index) => (
        <GrupoInput key={index}>
          <LabelForms htmlFor={field.id}>
            {field.label}
            {field.required && <span className="text-danger"> *</span>}
          </LabelForms>
          {field.type === "select" ? (
            <select
              name={field.id}
              id={field.id}
              className="form-select"
              disabled={disabledFields.includes(field.id)}
            >
              {field.options.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              className="form-control"
              id={field.id}
              required={field.required}
              disabled={disabledFields.includes(field.id)}
            />
          )}
        </GrupoInput>
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

const GrupoInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const LabelForms = styled.label`
  width: fit-content;
  margin-right: 0.9rem;

  .text-danger {
    color: #dc3545 !important;
  }
`;
