import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Modal = ({ children, estado, cambiarEstado,titulo }) => {
  return (
    <>
      {estado && (
        <Overlay>
          <ContenedorModal>
            <ModalHeader>
              <h3>{titulo}</h3>
            </ModalHeader>
            <BotonCerrar onClick={() => cambiarEstado(false)}>
              <FontAwesomeIcon icon={faX} className="btn-cerrar" />
            </BotonCerrar>
            <ModalBody scrollable={estado}>
              {children}
            </ModalBody>
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
  background: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContenedorModal = styled.div`
  width: 30vw;
  height: 80vh;
  /* min-height: 100px; */
  background: #fff;
  position: absolute;
  border-radius: 1.2vw;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  /* padding-bottom: 20px; */
  border-bottom: 1px solid #e8e8e8;

  h3 {
    font-weight: 500;
    font-size: 16px;
    color: #1766dc;
  }
`;

const BotonCerrar = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 30px;
  right: 20px;

  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #1766dc;

  &:hover {
    background: none;
    border: none;
    transform: scale(1.2);
  }
`;

const ModalBody = styled.div`
  height: calc(100% - 20vh);
  overflow-y: auto;
  padding: 0 2vw;
  padding-right: 1vw;
  margin-right: -1vw;

  /* Estilos para ocultar el scrollbar */
  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  /* Otras propiedades de estilo */
  ${(props) =>
    props.scrollable &&
    `
      background: #ffffff;
    `}
`;


