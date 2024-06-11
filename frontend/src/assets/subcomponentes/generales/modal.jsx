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
}) => {
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
            <ModalBody scrollable={estado}>{children}</ModalBody>
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
  margin-left: 20px;
  margin-bottom: 15px;
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
  color: #f80707;

  &:hover {
    background: none;
    border: none;
    transform: scale(1.2);
  }
`;

const ModalBody = styled.div`
  height: calc(100% - 25%);
  overflow-y: auto;
  padding: 0 2vw;
  padding-right: 1vw;
  margin-right: -1vw;

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

  ${(props) =>
    props.scrollable &&
    `
      background: #ffffff;
    `}
`;
const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 2%; // Espaciado entre los botones
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
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 45%;
  color: white;
  /* background: linear-gradient(to right, #14add6, #384295); */
  transition: background 0.3s ease;
  background: -webkit-linear-gradient(#ff0000, #fc5c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &:hover {
    transform: scale(1.05);
  }

  &:focus {
    outline: none; // Eliminar el borde negro al hacer clic
  }
`;
