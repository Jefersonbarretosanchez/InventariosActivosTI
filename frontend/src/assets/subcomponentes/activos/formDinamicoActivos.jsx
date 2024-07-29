import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Autocomplete, TextField } from '@mui/material';

const FormDinamicoActivos = ({ fields, disabledFields, initialValues, onInputChange, errors, setErrors, currentStep }) => {
  const [licencias, setLicencias] = useState(initialValues.licencias || []);
  const [aplicaciones, setAplicaciones] = useState(initialValues.aplicaciones || []);
  const [equipos, setEquipos] = useState(initialValues.equipos || []);

  useEffect(() => {
    const initialErrors = {};
    fields.forEach(field => {
      initialErrors[field.id] = '';
    });
    setErrors(initialErrors);
  }, [fields, setErrors]);

  useEffect(() => {
    setLicencias(initialValues.licencias || []);
    setAplicaciones(initialValues.aplicaciones || []);
    setEquipos(initialValues.equipos || []);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    validateField(name, value);
    onInputChange({ target: { name, value: value === '' ? null : value } });
  };

  const validateField = (name, value) => {
    if (!value && (name !== "costo" && name !== "observacion" && name !== "id_ubicacion" && name !== "id_coordinadores" && name !== "fecha_devolucion_equipo" && name !== "id_kit_perifericos")) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Campo obligatorio' }));
    } else if ((name === "nombres" || name === "apellidos") && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Solo se permiten nombres en formato texto' }));
    } else if ((name === "correo_personal" || name === "correo_institucional") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: 'Formato de correo inválido' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const getFieldsByStep = (step) => {
    switch (step) {
      case 0:
        return fields.filter(field => ["nombres", "apellidos", "identificacion", "correo_institucional", "nombre_centro_costo", "nombre_region", "nombre_cargo", "nombre_area", "fecha_ingreso_empresa", "nombre_estado_persona"].includes(field.id));
      case 1:
        return [];
      case 2:
        return [];
      case 3:
        return [];
      default:
        return [];
    }
  };

  const currentFields = getFieldsByStep(currentStep);

  return (
    <Formulario style={{ marginTop: '-3vh' }}>
      {currentFields.map((field, index) => (
        <div key={field.id + index}>
          <label>{field.label}</label>
          {field.type === "select" ? (
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
          ) : (
            <input
              className="form-control"
              type={field.type}
              name={field.id}
              defaultValue={initialValues[field.id] || ''}
              onChange={handleChange}
              disabled={disabledFields.includes(field.id)}
            />
          )}
          {errors[field.id] && <ErrorMsg>{errors[field.id]}</ErrorMsg>}
        </div>
      ))}

      {currentStep === 1 && (
        <div style={{ marginTop: '-6vh' }}>
          <h3>Equipos</h3>
          {equipos.length === 0 ? (
            <EmptyMessage>No tiene ningún equipo asignado</EmptyMessage>
          ) : (
            equipos.map((equipo, index) => (
              <div key={`equipo-${index}`}>
                <input
                  className="form-control"
                  type="text"
                  name={`nombre_equipo_${index}`}
                  value={equipo.nombre_equipo}
                  disabled
                  placeholder="Nombre del Equipo"
                />
                <input
                  className="form-control"
                  type="text"
                  name={`anydesk_${index}`}
                  value={equipo.anydesk}
                  disabled
                  placeholder="AnyDesk"
                />
              </div>
            ))
          )}
        </div>
      )}

      {currentStep === 2 && (
        <div style={{ marginTop: '-6vh' }}>

          {licencias.length === 0 ? (
            <EmptyMessage style={{ marginTop: '3vh' }}>No tiene ninguna licencia asignada</EmptyMessage>
          ) : (
            licencias.map((licencia, index) => (
              <div key={`licencia-${index}`}>
                <h4>Licencia {index + 1}</h4>
                <h9>Licencia</h9>
                <input
                  className="form-control"
                  type="text"
                  name={`nombre_licencia_${index}`}
                  value={licencia.nombre_licencia}
                  disabled
                  placeholder="Nombre de la Licencia"
                />
                <h8>Fecha de vencimiento</h8>
                <input
                  className="form-control"
                  type="date"
                  name={`fecha_vencimiento_${index}`}
                  label="fecha de vencimiento"
                  value={licencia.fecha_vencimiento}
                  disabled
                  placeholder="Fecha de Vencimiento"
                />
              </div>
            ))
          )}
        </div>
      )}

      {currentStep === 3 && (
        <div style={{ marginTop: '-6vh' }}>

          {aplicaciones.length === 0 ? (
            <EmptyMessage style={{ marginTop: '3vh' }}>No tiene ninguna aplicación asignada</EmptyMessage>
          ) : (
            aplicaciones.map((aplicacion, index) => (
              <div>
                <div key={`aplicacion-${index}`}>
                  <p>Aplicacion {index + 1}</p>
                  <input
                    className="form-control"
                    type="text"
                    name={`nombre_aplicativo_${index}`}
                    value={aplicacion.nombre_aplicativo}
                    disabled
                    placeholder="Nombre del Aplicativo"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </Formulario>
  );
};

export default FormDinamicoActivos;

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

const EmptyMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;
