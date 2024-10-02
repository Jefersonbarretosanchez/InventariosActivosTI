import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Modal = ({
  children,
  estado,
  cambiarEstado,
  titulo,
  actionType,
  onCreate,
  onUpdate,
  onUpdatePassword,
  onClear
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (estado) {
      setAnimationClass("modal-fade-in");
    } else {
      setAnimationClass("modal-fade-out");
    }
  }, [estado]);

  const validateForm = () => {
    const formElements = document.querySelectorAll('.form-control, .form-select');
    const newErrors = {};
    formElements.forEach(element => {
      if (!element.value && !element.disabled && (element.name !== "costo" && element.name !== "observacion"
        && element.name !== "fecha_devolucion_equipo" && element.name !== "no_ticket")) {
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
      console.log(`Validating autocomplete: ${element.getAttribute('data-name')}`);
      console.log(`Data value: ${element.getAttribute('data-value')}`);

      if (!element.getAttribute('data-value') && (element.getAttribute('data-name') !== "id_ubicacion"
        && element.getAttribute('data-name') !== "id_coordinadores" && element.getAttribute('data-name') !== "id_kit_perifericos"
        && element.getAttribute('data-name') !== "id_contrato" && element.getAttribute('data-name') !== "id_solicitante")) {
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
    setIsLoading(true);
    await onUpdate();
    setIsLoading(false);
  };

  const handleUpdatePassword = async () => {
    setIsLoading(true);
    await onUpdatePassword();
    setIsLoading(false);
  };


  const handleClear = async () => {
    setIsLoading(true);
    await onClear();
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    setAnimationClass("modal-fade-out");
    setTimeout(() => {
      cambiarEstado(false);
    }, 400); // Duración de la animación de salida
  };

  return (
    <>
      {estado && (
        <Overlay>
          <ContenedorModal className={animationClass}>
            <ModalHeader>
              <h3>{titulo}</h3>
              <BotonCerrar onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faX} />
              </BotonCerrar>
            </ModalHeader>
            <ModalBody style={{ marginLeft: '1vw' }}>
              {React.cloneElement(children, { errors, setErrors })}
            </ModalBody>
            <ModalFooter>
              {(actionType === "create" || actionType === "update" || actionType === "updatePassword") && (
                <BtnCancelar onClick={handleCloseModal} disabled={isLoading}>
                  <span>Cancelar</span>
                </BtnCancelar>
              )}
              {actionType === "create" && (
                <Boton onClick={handleCreate} disabled={isLoading}>Registrar</Boton>
              )}
              {actionType === "update" && (
                <Boton onClick={handleUpdate} disabled={isLoading}>Actualizar</Boton>
              )}
              {actionType === "updatePassword" && (
                <Boton onClick={handleUpdatePassword} disabled={isLoading}>Actualizar</Boton>
              )}
              {actionType === "Clear" && (
                <>
                  <BtnCancelar style={{ marginTop: '1vh' }} onClick={handleCloseModal} disabled={isLoading}>
                    <span>Salir</span>
                  </BtnCancelar>
                  <BtnLimpiar style={{ marginTop: '1vh' }} onClick={handleClear} disabled={isLoading}>Limpiar Filtros</BtnLimpiar>
                </>
              )}
            </ModalFooter>
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};

export default Modal;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);  /* Fondo semitransparente */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  z-index: 9999; /* Asegúrate de que el modal esté por encima de todo */
`;

const ContenedorModal = styled.div`
  width: 25vw;
  height: auto;
  max-height: 90vh;
  background: #fff;
  position: relative;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px;
  padding: 20px;
  overflow: visible; 
  z-index: 10000; /* Asegúrate de que el modal en sí tenga un z-index alto */
  animation: none;

  &.modal-fade-in {
    animation: bounceIn 0.5s ease-out forwards;
  }

  &.modal-fade-out {
    animation: fadeOutZoom 0.4s ease-out forwards;
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

const Boton = styled.button`
  padding: 14px 20px;
  margin: 8px 0;
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
