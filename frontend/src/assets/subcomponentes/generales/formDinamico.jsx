import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Autocomplete, TextField } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

const FormDinamico = ({ fields, disabledFields, initialValues, onInputChange, errors, setErrors, showAddPerifericoButton, actionType }) => {
  const [perifericosFields, setPerifericosFields] = useState(initialValues.perifericos || [{ value: null, label: '' }]);

  useEffect(() => {
    const initialErrors = {};
    fields.forEach(field => {
      initialErrors[field.id] = '';
    });
    setErrors(initialErrors);
  }, [fields, setErrors]);

  useEffect(() => {
    console.log("actionType:", actionType); // Agregar esta línea para depuración
  }, [actionType]);


  useEffect(() => {
    setPerifericosFields(initialValues.perifericos || [{ value: null, label: '' }]);
  }, [initialValues.perifericos]);

  const validateField = (name, value) => {
    if (!value && (name !== "costo" && name !== "observacion" && name !== "id_ubicacion" && name !== "id_coordinadores"
      && name !== "fecha_devolucion_equipo" && name !== "id_kit_perifericos" && name !== "no_ticket" && name !== "id_contrato" && name !== "id_solicitante")) {
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

  const handlePerifericoChange = (index, value) => {
    const newFields = [...perifericosFields];
    if (value) {
      newFields[index] = value;
    } else {
      newFields[index] = { value: null, label: '' };
    }
    setPerifericosFields(newFields);
    onInputChange({ target: { name: 'perifericos', value: newFields.map(field => field.value) } });
  };

  const addPerifericoField = () => {
    setPerifericosFields([...perifericosFields, { value: null, label: '' }]);
  };

  const removePerifericoField = (index) => {
    const newFields = perifericosFields.filter((_, i) => i !== index);
    setPerifericosFields(newFields);
    onInputChange({ target: { name: 'perifericos', value: newFields } });
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
              {field.id === 'id_perifericos' ? (
                perifericosFields.map((periferico, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <StyledAutocomplete style={{ width: '30vw' }}
                      disablePortal
                      options={field.options}
                      getOptionLabel={(option) => option.label}
                      isOptionEqualToValue={(option, value) => option.value === value}
                      onChange={(event, value) => handlePerifericoChange(index, value)}
                      value={periferico}
                      renderInput={(params) => (
                        <StyledTextField
                          {...params}
                          variant="outlined"
                          placeholder="Seleccione una opción"
                          className="autocomplete-control"
                          data-name={field.id}
                          data-value={periferico.value || ''}
                        />
                      )}
                      disabled={disabledFields.includes(field.id)}
                    />
                    {actionType !== "detail" && (<FontAwesomeIcon
                      icon={faMinusCircle}
                      style={{ marginLeft: '10px', cursor: 'pointer', height: '4vh' }}
                      onClick={() => removePerifericoField(index)}
                    />)}
                  </div>
                ))
              ) : (
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
              )}
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
      {showAddPerifericoButton && (
        <FontAwesomeIcon
          icon={faPlusCircle}
          style={{ marginLeft: '9vw', position: 'fixed', height: '4vh', cursor: 'pointer' }}
          onClick={addPerifericoField}
        />
      )}
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


const ErrorMsg = styled.span`
  color: #dc3545;
  font-size: 12px;
`;
