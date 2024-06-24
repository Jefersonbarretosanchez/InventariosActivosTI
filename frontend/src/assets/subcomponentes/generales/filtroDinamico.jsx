import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

const FiltroDinamico = ({ activeFilters, onAddFilter, onRemoveFilter, onFiltroChange, filtroValues, fieldsWithOptions }) => {
  return (
    <Formulario>
      {activeFilters.map((filterId) => {
        const field = fieldsWithOptions.find(field => field.id === filterId);
        return (
          <div key={field.id} className="filter-field">
            <label>{field.label}</label>
            {field.type === "select" ? (
              <select
                className="form-select"
                name={field.id}
                value={filtroValues[field.id] || ''}
                onChange={onFiltroChange}
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
                value={filtroValues[field.id] || ''}
                onChange={onFiltroChange}
              />
            )}
            <FontAwesomeIcon
              icon={faMinusCircle}
              style={{ marginTop: '2px' }}
              className="remove-filter-icon"
              onClick={() => onRemoveFilter(field.id)}
            />
          </div>
        );
      })}
    </Formulario>
  );
};

export default FiltroDinamico;

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

  .add-filter-icon, .remove-filter-icon {
    cursor: pointer;
    margin-left: 10px;
    color: #1766dc;
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }

  .remove-filter-icon {
    color: #e74c3c;
  }

  .remove-filter-icon:hover, .add-filter-icon:hover {
    transform: scale(1.2);
  }

  .filter-field {
    margin-bottom: 10px;
  }
`;

const FilterField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
