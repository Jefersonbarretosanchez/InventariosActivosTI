import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const ModalActivos = ({
  children,
  estado,
  cambiarEstado,
  titulo,
  actionType,
  onCreate,
  onUpdate,
  onClear,
  steps,
  currentStep,
  setCurrentStep,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [animateClass, setAnimateClass] = useState("");

  useEffect(() => {
    if (estado) {
      setIsVisible(true);
      setTimeout(() => setAnimateClass("modal-show"), 10); // Iniciar la animación de entrada
    } else {
      setAnimateClass("modal-hide");
      setTimeout(() => setIsVisible(false), 500); // Ocultar el modal después de la animación de salida
    }
  }, [estado]);

  const validateForm = () => {
    const formElements = document.querySelectorAll('.form-control, .form-select');
    const newErrors = {};
    formElements.forEach(element => {
      if (!element.value && !element.disabled && (element.name !== "costo" && element.name !== "observacion" && element.name !== "fecha_devolucion_equipo")) {
        newErrors[element.name] = 'Campo obligatorio';
      }
      if ((element.name === 'nombres' || element.name === 'apellidos') && element.value && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(element.value)) {
        newErrors[element.name] = 'Solo se permiten nombres en formato texto';
      }
      if ((element.name === 'correo_personal' || element.name === 'correo_institucional') && element.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element.value)) {
        newErrors[element.name] = 'Formato de correo inválido';
      }
    });

    // Validación adicional para Autocomplete
    const autocompleteElements = document.querySelectorAll('.autocomplete-control');
    autocompleteElements.forEach(element => {
      if (!element.getAttribute('data-value') && (element.getAttribute('data-name') !== "id_ubicacion" && element.getAttribute('data-name') !== "id_coordinadores" && element.getAttribute('data-name') !== "id_kit_perifericos")) {
        newErrors[element.getAttribute('data-name')] = 'Campo obligatorio';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    await onCreate();
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    await onUpdate();
    setIsLoading(false);
  };

  const handleClear = async () => {
    setIsLoading(true);
    await onClear();
    setIsLoading(false);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  return (
    <>
      {isVisible && (
        <Overlay>
          <ContenedorModal className={animateClass}>
            <ModalHeader>
              <h3>{titulo}</h3>
              <BotonCerrar onClick={() => cambiarEstado(false)}>
                <FontAwesomeIcon icon={faX} />
              </BotonCerrar>
            </ModalHeader>
            <StepsIndicator>
              {steps.map((step, index) => (
                <Step key={index} active={index === currentStep} onClick={() => handleStepClick(index)}>
                  {step}
                </Step>
              ))}
            </StepsIndicator>
            <ModalBody>
              {React.cloneElement(children, { errors, setErrors, currentStep })}
            </ModalBody>
            <ModalFooter>
              {currentStep > 0 && (
                <Button onClick={handlePreviousStep}>Anterior</Button>
              )}
              {(currentStep < steps.length - 1) ? (
                <Button onClick={handleNextStep}>Siguiente</Button>
              ) : (
                <>
                  {(actionType === "create" || actionType === "update") && (
                    <BtnCancelar onClick={() => cambiarEstado(false)} disabled={isLoading}>
                      <span>Cancelar</span>
                    </BtnCancelar>
                  )}
                  {actionType === "create" && (
                    <Button onClick={handleCreate} disabled={isLoading}>Registrar</Button>
                  )}
                  {actionType === "update" && (
                    <Button onClick={handleUpdate} disabled={isLoading}>Actualizar</Button>
                  )}
                  {actionType === "Clear" && (
                    <>
                      <BtnCancelar style={{ marginTop: '1vh' }} onClick={() => cambiarEstado(false)} disabled={isLoading}>
                        <span>Salir</span>
                      </BtnCancelar>
                      <BtnLimpiar style={{ marginTop: '1vh' }} onClick={handleClear} disabled={isLoading}>Limpiar Filtros</BtnLimpiar>
                    </>
                  )}
                </>
              )}
            </ModalFooter>
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};

export default ModalActivos;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
`;

const ContenedorModal = styled.div`
  width: 30vw;
  height: auto;
  max-height: 90vh;
  background: #fff;
  position: relative;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px;
  padding: 20px;
  overflow: visible;
  z-index: 1200;
  transition: all 0.5s ease;

  &.modal-show {
    transform: scale(1);
    opacity: 1;
  }

  &.modal-hide {
    transform: scale(0.9);
    opacity: 0;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  border-bottom: 1px solid #e8e8e8;

  h3 {
    font-weight: 500;
    font-size: 18px;
    color: #545c8c;
    margin: 0;
  }
`;

const BotonCerrar = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  color: #f80707;

  &:hover {
    transform: scale(1.2);
  }
`;

const StepsIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-left:-.9vw;
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  padding: 1vh;
  margin-left: 0.3vw;
  background-color: ${(props) => (props.active ? "#545c8c" : "#e8e8e8")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const ModalBody = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  padding: 20px 0;
  max-height: calc(80vh - 120px);
  width: 100%;
  margin-right: -20px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #545c8c;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #3a9ee1;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 2%;
  padding: 10px 0;
`;

const Button = styled.button`
  padding: 14px 20px;
  margin: 8px 0;
  margin-top:0vh;
  border: none;
  cursor: pointer;
  width: 45%;
  color: white;
  background: #545c8c;
  transition: background 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const BtnCancelar = styled.button`
  padding: 0px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: auto;
  height: auto;
  color: white;
  background: -webkit-linear-gradient(#ff0000, #fc5c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &:hover {
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const BtnLimpiar = styled.button`
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 45%;
  color: white;
  background: -webkit-linear-gradient(#384295, #14ADD6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &:hover {
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
