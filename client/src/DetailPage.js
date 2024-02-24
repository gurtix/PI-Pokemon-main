import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div>
        <header>
        <Link to="/home">Volver al inicio</Link>
        </header>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h1>{pokemon.name}</h1>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <h2>Abilities</h2>
        <ul>
        {pokemon.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
        </ul>
        <h2>Stats</h2>
        <ul>
        {pokemon.stats.map((stat, index) => (
          <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
        ))}
        </ul>
        <h2>Types</h2>
        <ul>
        {pokemon.types.map((type, index) => (
          <li key={index}>{type.type.name}</li>
        ))}
        </ul>
    </div>
  );
};

export default DetailPage;