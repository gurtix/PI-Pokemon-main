import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Asegúrate de crear este archivo CSS
import backgroundImage from './pokemon.png';


function LandingPage() {
  return (
    <div className="landing-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="cuadro-dialogo">
        <div className='Texto'>
        <h1>BIENVENIDO A HENRY'S POKEMON</h1>

        </div>
        <Link to="/home">
          <button>Entrar</button>
        </Link>
      </div>
    </div>

  );
}

export default LandingPage;