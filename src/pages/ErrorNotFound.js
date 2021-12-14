import React from "react";
import "./ErrorNotFound.css";
import Cookies from "universal-cookie";
import {useNavigate} from 'react-router-dom'

const cookies = new Cookies();
const ErrorNotFound = () => {

  const navigate = useNavigate() 

  const cerrarSession = () => {
    cookies.remove('data', { path: '/' });
    navigate('/')
  }

  return (
    <>
        <div className="error_background">
          <img className="top-image" src="/img/Vector 1.png" alt="error-404" />
          <img className="right-image" src="/img/Vector 4.png" alt="error-404" />
          </div>
        <div className="error-not-found">
          <h1 className="titulo_not_found">404</h1>
          <p>Oops! Pagina no encontrada.</p>
            <a  onClick={cerrarSession} class="error_boton">Ver al Inicio.</a>
        </div>
    </>
  );
};

export default ErrorNotFound;
