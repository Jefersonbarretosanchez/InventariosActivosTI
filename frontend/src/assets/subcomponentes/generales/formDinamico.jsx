import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Autocomplete, TextField } from '@mui/material';

const FormDinamico = ({ fields, disabledFields, initialValues, onInputChange, errors, setErrors }) => {
  useEffect(() => {
    const initialErrors = {};
    fields.forEach(field => {
      initialErrors[field.id] = '';
    });
    setErrors(initialErrors);
  }, [fields, setErrors]);

  const validateField = (name, value) => {
    if (!value && (name !== "costo" && name !== "observacion" && name !== "id_ubicacion" && name !== "id_coordinadores")) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Campo obligatorio' }));
    } else if ((name === "nombres" || name === "apellidos") && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Solo se permiten nombres en formato texto' }));
    } else if ((name === "correo_personal" || name === "correo_institucional") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Formato de correo inválido' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Ensure costo is an integer
    if (name === 'costo') {
      const intValue = parseInt(value, 10);
      if (isNaN(intValue)) {
        validateField(name, null);
        onInputChange({ target: { name, value: null } });
      } else {
        validateField(name, intValue);
        onInputChange({ target: { name, value: intValue } });
      }
    } else {
      validateField(name, value);
      onInputChange({ target: { name, value: value === '' ? null : value } });
    }
  };

  const handleAutocompleteChange = (event, value, name) => {
    const element = document.querySelector(`[data-name="${name}"]`);
    if (element) {
      element.setAttribute('data-value', value ? value.value : '');
    }
    onInputChange({ target: { name, value: value ? value.value : null } });
    validateField(name, value ? value.value : null);
  };


  return (
    <Formulario>
      {fields.map((field) => (
        <div key={field.id}>
          <label>{field.label}</label>
          {field.id === "costo" ? (
            <CostoWrapper>
              <span className="currency">$</span>
              <input

                type="number"
                name={field.id}
                defaultValue={initialValues[field.id] || ''}
                onChange={handleChange}
                disabled={disabledFields.includes(field.id)}
              />
              <span className="currency-usd">USD</span>
              {errors[field.id] && <ErrorMsg>{errors[field.id]}</ErrorMsg>}
            </CostoWrapper>
          ) : field.type === "select" ? (
            <>
              <StyledAutocomplete
                disablePortal
                options={field.options}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value}
                onChange={(event, value) => handleAutocompleteChange(event, value, field.id)}
                defaultValue={field.options.find(option => option.value === initialValues[field.id]) || null}
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    variant="outlined"
                    placeholder="Seleccione una opción"
                    className="autocomplete-control"
                    data-name={field.id}
                    data-value={initialValues[field.id] || ''}
                  />
                )}
                disabled={disabledFields.includes(field.id)}
              />
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
`;

const CostoWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 16px;
  height: 40px;

  input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    font-size: 16px;
    padding: 0 5px;
    box-sizing: border-box;
  }

  .currency {
    margin-right: 5px;
  }

  .currency-usd {
    margin-left: 5px;
  }
`;

const StyledAutocomplete = styled(Autocomplete)`
  .MuiOutlinedInput-root {
    padding: 0 !important;
    height: 40px; /* Asegura que la altura sea consistente */
  }

  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
    padding: 0 !important;
  }

  .MuiInputBase-root {
    height: 40px; /* Asegura que la altura sea consistente */
    padding: 0;
  }

  .MuiAutocomplete-endAdornment {
    top: 50%;
    transform: translateY(-50%);
  }
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-input {
    padding: 10px; /* Ajusta el padding para que coincida con el input normal */
    height: 20px; /* Ajusta la altura del contenido */
  }

  .MuiInputLabel-outlined {
    transform: translate(14px, 14px) scale(1);
  }
`;

const ErrorMsg = styled.span`
  color: #dc3545;
  font-size: 12px;
`;
