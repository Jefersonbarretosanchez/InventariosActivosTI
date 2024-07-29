import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const ModalFiltros = ({ children, estado, cambiarEstado, titulo, onClear }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClear = async () => {
    setIsLoading(true);
    await onClear();
    setIsLoading(false);
  };

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
            <ModalBody style={{ marginLeft: '1vw' }}>
              {children}
            </ModalBody>
            <BtnCancelar style={{ marginTop: '1vh', marginLeft: '4.2vw' }} onClick={() => cambiarEstado(false)}>
              <span>Salir</span>
            </BtnCancelar>
            <BtnLimpiar
              style={{ marginTop: '1vh', marginLeft: '1vw' }}
              onClick={handleClear}
              disabled={isLoading}
            >
              {isLoading ? 'Limpiando...' : 'Limpiar Filtros'}
            </BtnLimpiar>
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};

export default ModalFiltros;

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
  overflow: visible; /* Permitir el desbordamiento visible */
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
  overflow: visible; /* Permitir el desbordamiento visible */
  z-index: 1200; /* Asegura que el modal tenga un z-index menor que el popper */
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
    background: #72b1d8;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #3a9ee1;
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
    transform: scale(1.1);
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
    transform: scale(1.08);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;