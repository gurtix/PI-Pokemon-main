import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import "./HomePage.css";
import backgroundImage from './homepage.jpg';


const API_URL = "http://localhost:3001/pokemons?offset=0&limit=151"

function HomePage() {
    const [allPokemons, setAllPokemons] = useState([]);
    const [displayedPokemons, setDisplayedPokemons] = useState([]);
    const [search, setSearch] = useState('');
    const [offset, setOffset] = useState(0);
    const history = useHistory();

    useEffect(() => {
        fetch(`${API_URL}?offset=0&limit=100`).then((response) => response.json()).then((data) => {
          Promise.all(data.map(pokemon => fetch(pokemon.url).then(res => res.json())))
            .then(pokemonDetails => {
              setAllPokemons(pokemonDetails);
              setDisplayedPokemons(pokemonDetails);
            });
        });
      },[]);
    
    useEffect(() => {
        const filteredPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
        setDisplayedPokemons(filteredPokemons.slice(offset, offset + 20));
    }, [search, offset, allPokemons]);
    
      
      

      const loadMorePokemons = () => {
        const newOffset = offset + 20;
        setOffset(newOffset);
        setDisplayedPokemons(allPokemons.slice(newOffset, newOffset + 20));
    };
    
    const loadPreviousPokemons = () => {
        const newOffset = offset - 20;
        setOffset(newOffset);
        setDisplayedPokemons(allPokemons.slice(newOffset, newOffset + 20));
    };

    const goToStart = () => {
        setOffset(0);
        setDisplayedPokemons(allPokemons.slice(0, 20));
    };
    
    const goToEnd = () => {
        const newOffset = Math.floor(allPokemons.length / 20) * 20;
        setOffset(newOffset);
        setDisplayedPokemons(allPokemons.slice(newOffset, newOffset + 20));
    };

    const filteredPokemons = displayedPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className='background'style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className='header'>
        <nav>
        <button onClick={() => history.push('/post')}>Crear Pokemon</button>
        </nav>
        <div className='search'>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." />
        </div>
      </header>
      <div className='previous'>
        {offset > 0 && <button onClick={goToStart}>Ir al inicio</button>}
        {offset > 0 && <button onClick={loadPreviousPokemons}>Cargar anteriores</button>}
      </div>      
      <ul className='pokemonlist'>
        {filteredPokemons.map((pokemonDetail) => (
          <li key={pokemonDetail.name}>
          <Link to={`/DetailPage/${pokemonDetail.id}`}>
            <img src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name}/>
            <h2>
                {pokemonDetail.name} 
            </h2>
          </Link>
        </li>
        ))}
      </ul>
      <div className="next">        
      {offset + 50< allPokemons.length && <button onClick={loadMorePokemons}>Cargar más</button>}
      {offset + 50 < allPokemons.length && <button onClick={goToEnd}>Ir al final</button>}
      </div>
    </div>
  );
}

export default HomePage;
