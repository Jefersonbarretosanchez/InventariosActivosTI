import React from 'react';
import styled from "styled-components";
import { Autocomplete, TextField } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

const FiltroDinamico = ({ activeFilters, onAddFilter, onRemoveFilter, onFiltroChange, filtroValues, fieldsWithOptions }) => {
  const handleAutocompleteChange = (event, value, name) => {
    onFiltroChange({ target: { name, value: value ? value.value : '' } });
  };

  return (
    <Formulario>
      {activeFilters.map((filterId) => {
        const field = fieldsWithOptions.find(field => field.id === filterId);
        return (
          <div key={field.id} className="filter-field">
            <label>{field.label}</label>
            {field.type === "select" ? (
              <StyledAutocomplete
                disablePortal
                options={field.options}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value}
                onChange={(event, value) => handleAutocompleteChange(event, value, field.id)}
                value={field.options.find(option => option.value === filtroValues[field.id]) || null}
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    variant="outlined"
                    placeholder="Seleccione una opción"
                    className="autocomplete-control"
                    data-name={field.id}
                    data-value={filtroValues[field.id] || ''}
                  />
                )}
              />
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

  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 16px;
    height: 40px;
  }

  .form-control:focus {
    outline: none;
    border: 2px solid #5050c9;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
  }

  .form-control:disabled {
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

const StyledAutocomplete = styled(Autocomplete)`
  .MuiOutlinedInput-root {
    padding: 0 !important;
    height: 40px; /* Asegura que la altura sea consistente */
    width: 100%;
  }

  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
    padding: 0 !important;
  }

  .MuiInputBase-root {
    height: 40px; /* Asegura que la altura sea consistente */
    padding: 0;
    width: 100%;
  }

  .MuiAutocomplete-endAdornment {
    top: 50%;
    transform: translateY(-50%);
  }

  .MuiAutocomplete-popper {
    z-index: 1300 !important; /* Asegura que el popper se sobreponga */
  }
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-input {
    padding: 10px; /* Ajusta el padding para que coincida con el input normal */
    height: 20px; /* Ajusta la altura del contenido */
    width: 100%;
  }

  .MuiInputLabel-outlined {
    transform: translate(14px, 14px) scale(1);
  }
`;
