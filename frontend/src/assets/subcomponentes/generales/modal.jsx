import React from "react";
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
  onClear // filtros agregados
}) => {
  return (
    <>
      {estado && (
        <Overlay>
          <ContenedorModal>
            <ModalHeader>
              <h3>{titulo}</h3>
              <BotonCerrar onClick={() => cambiarEstado(false)}>
                <FontAwesomeIcon icon={faX} />
              </BotonCerrar>
            </ModalHeader>
            <ModalBody style={{ marginLeft: '1vw' }}>{children}</ModalBody>
            <ModalFooter>
              {(actionType === "create" || actionType === "update") && (
                <BtnCancelar onClick={() => cambiarEstado(false)}>
                  <span>Cancelar</span>
                </BtnCancelar>
              )}
              {actionType === "create" && (
                <Boton onClick={onCreate}>Registrar</Boton>
              )}
              {actionType === "update" && (
                <Boton onClick={onUpdate}>Actualizar</Boton>
              )}
              {actionType === "Clear" && (
                <>
                  <BtnCancelar style={{ marginTop: '1vh' }} onClick={() => cambiarEstado(false)}>
                    <span>Salir</span>
                  </BtnCancelar>
                  <BtnLimpiar style={{ marginTop: '1vh' }} onClick={onClear}>Limpiar Filtros</BtnLimpiar> {/* filtros agregados */}
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
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
  overflow: hidden;
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
    color: #1766dc;
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
  overflow-x: hidden; /* Elimina el scroll horizontal */
  overflow-y: auto;
  padding: 20px 0;
  max-height: calc(80vh - 120px); /* Ajusta según sea necesario */
  width: 100%;
  margin-right: -20px; /* Ajusta según sea necesario */

  /* Estilos para ocultar el scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #72b1d8;
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
  background: linear-gradient(to right, #14add6, #384295);
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #384295, #14add6);
    transform: scale(1.05);
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
`;
