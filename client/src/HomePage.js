import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import "./HomePage.css";
import backgroundImage from './homepage.jpg';
import axios from 'axios';


const API_URL = "http://localhost:3001/pokemons?offset=0&limit=151"

function HomePage() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [offset] = useState(0);
  const history = useHistory();
  const [isScrolled, setIsScrolled] = useState(false);
  const [availableTypes, setAvailableTypes] = useState([]);
  // const [pokemonTypes, setPokemonTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortedAndFilteredPokemons, setSortedAndFilteredPokemons] = useState({
    pokemons: [],
    offset: 0
  });
  useEffect(() => {
    console.log(offset, displayedPokemons.length);
  }, [offset, displayedPokemons]);


  useEffect(() => {
    let sortedPokemons = [...allPokemons];

    switch (sortCriteria) {
      case 'name-asc':
        sortedPokemons.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedPokemons.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'weight':
        sortedPokemons.sort((a, b) => a.weight - b.weight);
        break;
      case 'height':
        sortedPokemons.sort((a, b) => a.height - b.height);
        break;
      default:
        break;
    }

    setDisplayedPokemons(sortedPokemons.slice(offset, offset + 20));
  }, [sortCriteria, offset, allPokemons]);

  useEffect(() => {
    let sortedAndFiltered = [...allPokemons];

    if (selectedType !== '') {
      sortedAndFiltered = sortedAndFiltered.filter(pokemon =>
        pokemon.types.some(typeObj => typeObj.type.name === selectedType)
      );
    }

    switch (sortCriteria) {
      case 'name-asc':
        sortedAndFiltered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedAndFiltered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'weight':
        sortedAndFiltered.sort((a, b) => a.weight - b.weight);
        break;
      case 'height':
        sortedAndFiltered.sort((a, b) => a.height - b.height);
        break;
      default:
        break;
    }

    setSortedAndFilteredPokemons({
      pokemons: sortedAndFiltered,
      offset: sortedAndFilteredPokemons.offset
    });
  }, [sortCriteria, offset, allPokemons, sortedAndFilteredPokemons.offset, selectedType]);
  useEffect(() => {
    setDisplayedPokemons(sortedAndFilteredPokemons.pokemons.slice(sortedAndFilteredPokemons.offset, sortedAndFilteredPokemons.offset + 20));
  }, [sortedAndFilteredPokemons]);


  useEffect(() => {
    if (selectedType === '') {
      setDisplayedPokemons(allPokemons.slice(offset, offset + 20));
    } else {
      const filteredPokemons = allPokemons.filter(pokemon =>
        pokemon.types.some(typeObj => typeObj.type.name === selectedType)
      );
      setDisplayedPokemons(filteredPokemons.slice(offset, offset + 20));
    }
  }, [selectedType, offset, allPokemons]);



  useEffect(() => {
    fetch(`${API_URL}`).then((response) => response.json()).then((data) => {
      Promise.all(data.map(pokemon => fetch(pokemon.url).then(res => res.json())))
        .then(pokemonDetails => {
          setAllPokemons(pokemonDetails);
          setDisplayedPokemons(pokemonDetails);
        });
    });
  }, []);

  useEffect(() => {
    const filteredPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
    setDisplayedPokemons(filteredPokemons.slice(offset, offset + 20));
  }, [search, offset, allPokemons]);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/pokemons/types');
        setAvailableTypes(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTypes();
  }, []);

  const loadMorePokemons = () => {
    setSortedAndFilteredPokemons(prevState => {
      if (prevState.offset + 20 < prevState.pokemons.length) {
        return { ...prevState, offset: prevState.offset + 20 };
      }
      return prevState;
    });
  };

  const loadPreviousPokemons = () => {
    setSortedAndFilteredPokemons(prevState => {
      if (prevState.offset - 20 >= 0) {
        return { ...prevState, offset: prevState.offset - 20 };
      }
      return prevState;
    });
  };


  const goToStart = () => {
    console.log("goToStart is called");
    setSortedAndFilteredPokemons(prevState => ({
      ...prevState,
      offset: 0
    }));
  };

  const goToEnd = () => {
    console.log("goToEnd is called");
    setSortedAndFilteredPokemons(prevState => ({
      ...prevState,
      offset: Math.floor(prevState.pokemons.length / 20) * 20
    }));
  };



  const filteredPokemons = displayedPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));


  return (
    <div className='background' style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className={`header ${isScrolled ? 'hidden' : ''}`}>
        <nav>
          <button onClick={() => history.push('/post')}>Crear Pokemon</button>
        </nav>
        <div className='search'>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." />
        </div>
      </header>
        <div>
      <h4>Filtrar</h4>

        </div>
      <div className='tipos'>
        <select className="ordenamiento" value={sortCriteria} onChange={e => setSortCriteria(e.target.value)}>
          <option value="">Pokedex</option>
          <option value="name-asc">Por nombre (A-Z)</option>
          <option value="name-desc">Nombre (Z-A)</option>
          <option value="weight">Peso</option>
          <option value="height">Altura</option>
        </select>

        <select className='tiposfiltrados' onChange={e => setSelectedType(e.target.value)}>
          <option value="">Todos los tipos</option>
          {availableTypes.map(type => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

      </div>
      <div className='previous'>
        <button onClick={goToStart}>Ir al inicio</button>
        <button onClick={loadPreviousPokemons}>Ver anteriores</button>
      </div>
      <ul className='pokemonlist'>
        {filteredPokemons.map((pokemonDetail) => {
          console.log(pokemonDetail);
          return (
            <li key={pokemonDetail.name}>
              <Link to={`/DetailPage/${pokemonDetail.created ? (pokemonDetail.idPokemon || 'unknown') : (pokemonDetail.id || 'unknown')}`}>
                <img src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name} />
                <h2>
                  {pokemonDetail.name}
                </h2>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="next">
        <button onClick={loadMorePokemons}>Ver más</button>
        <button onClick={goToEnd}>Ir al final</button>
      </div>
    </div>
  );
}

export default HomePage;
