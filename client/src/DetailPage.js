import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./DetailPage.css";
import backIcon from './atras.png';

const DetailPage = ({ match }) => {
  const [pokemon, setPokemon] = useState(null);  


  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get(`http://localhost:3001/pokemons/${match.params.id}`);
      setPokemon(response.data);
    };

    fetchPokemon();
  }, [match.params.id]);



  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className='background'>
      <header className='encabezado'>
        <Link to="/home" className="boton">
          <img src={backIcon} alt="Back"/>INICIO</Link>
      </header>
      <body className='contenido'>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />

        <table>
          <tr>

          </tr>
          <tr>
            <th>Nombre</th>
            <td>{pokemon.name}</td>
          </tr>
          <tr>
            <th>Altura</th>
            <td>{pokemon.height} pulgadas</td>
          </tr>
          <tr>
            <th>Peso</th>
            <td>{pokemon.weight} libras</td>
          </tr>
          <tr>
            <th>Habilidades</th>
            <td>
              <ul>
                {/* {pokemon.abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name}</li>
                ))} */}
                {pokemon.abilities.map((ability, index) => (
  <li key={index}>{pokemon.created ? ability.ability.name : ability.ability.name}</li>
))}
              </ul>
            </td>
          </tr>
          <tr>
            <th>Estadisticas</th>
            <td>
              <ul>
                {/* {pokemon.stats.map((stat, index) => (
                  <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
                ))} */}
                {pokemon.stats.map((stat, index) => (
  <li key={index}>{pokemon.created ? `${stat.name}: ${stat.base_stat}` : `${stat.stat.name}: ${stat.base_stat}`}</li>
))}
              </ul>
            </td>
          </tr>
          <tr>
            <th>Tipos</th>
            <td>
              <ul>
                {/* {pokemon.types.map((type, index) => (
                  <li key={index}>{type.type.name}</li>
                ))} */}
                {pokemon.types.map((type, index) => (
  <li key={index}>{pokemon.created ? type.type.name : type.type.name}</li>
))}
              </ul>
            </td>
          </tr>
        </table>
      </body>
    </div>
  );
};

export default DetailPage;