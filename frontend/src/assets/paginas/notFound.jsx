import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import errorImg from '../imagenes/error.jpg'; // Ensure this path is correct
import logo from '../imagenes/Sello-Scala.png';
import fullLogo from '../imagenes/login.png';
import sigs from '../imagenes/SIGS_logo_black_text-removebg-preview.png';

// Styled Components
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #F9F9F9;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const NotFoundPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #F9F9F9;
  width: 100%;
  animation: ${fadeIn} 1s ease-out;
`;

const ErrorContainer = styled.div`
  text-align: center;
  color: #3F4C6B; 
`;

const FullLogo = styled.img`
  width: 20vw;
  margin-bottom: 20px;
  margin-top: 4vh;
  animation: ${fadeIn} 2s ease-in-out;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  color: #5b5c8a;
  animation: ${fadeIn} 3s;
`;

const ErrorMessage = styled.p`
  font-size: 1.5rem;
  color: #F57C00;
  margin-top: -8vh;
`;

const SmallLogo = styled.img`
  width: 9vw;
  margin-top: 4vw;
`;

const Sigs = styled.img`
  width: 8vw;
`;

const BackHomeButton = styled(Link)`
  padding: 10px 20px;
  background-color: #5b5c8a;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    background-color: #F57C00;
    transform: scale(1.1);
    color:#5b5c8a;
  }
`;

const NotFound = () => {
  return (
    <>
      <GlobalStyle />
      <NotFoundPage>
        <ErrorContainer>
          <FullLogo src={fullLogo} alt="Scala Learning" />
          <ErrorCode>404</ErrorCode>
          <ErrorMessage>Error! Pagina no encontrada...</ErrorMessage>
          <div style={{ marginTop: '10vh' }}>
            <BackHomeButton style={{ marginTop: '5vh' }} to="/activos">Ir de vuelta</BackHomeButton>
          </div>
          <SmallLogo src={logo} alt="Scala" />
          <Sigs src={sigs} alt="Sigs" />

        </ErrorContainer>
      </NotFoundPage>
    </>
  );
};

export default NotFound;
