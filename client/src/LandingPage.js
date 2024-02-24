import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Asegúrate de crear este archivo CSS
import backgroundImage from './pokemon.png';


function LandingPage() {
  return (
    <div className="landing-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="cuadro-dialogo">
        <div className='texto'>
        <h1>BIENVENIDO</h1>
        <h2>A</h2>
        <h3>PROYECTO POKEMON</h3>

        </div>
        <div className='botones'>
        <Link to="/home">
          <button>Entrar</button>
        </Link>
        </div>
      </div>
    </div>

  );
}

export default LandingPage;