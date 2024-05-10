import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./modal";

const ContenidoModal = () => {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  return (
    <div>
      <ContenedorBotones>
        <Boton onClick={() => cambiarEstadoModal1(!estadoModal1)}>Modal</Boton>
      </ContenedorBotones>
      <Modal estado={estadoModal1} cambiarEstado={cambiarEstadoModal1}>
        <Contenido>
          <h1>hola</h1>
          <button onClick={() => cambiarEstadoModal1(!estadoModal1)}>
            Cerrar
          </button>
        </Contenido>
      </Modal>
    </div>
  );
};

export default ContenidoModal;

const ContenedorBotones = styled.div`
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const Boton = styled.button`
  display: block;
  padding: 10px 30px;
  border-radius: 100px;
  color: #fff;
  background: #1766dc;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  transition: 0.3s ease all;
`;

const Contenido = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 10px;
  }
`;