import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreatePokemon.css'
import { Link } from 'react-router-dom';
import backIcon from './atras.png';


function CreatePokemon() {
    const [name, setName] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [abilities, setAbilities] = useState([{ ability: { name: '' } }, { ability: { name: '' } }]);
    const [availableTypes, setAvailableTypes] = useState([]);
    const [stats, setStats] = useState([
        { name: 'hp', base_stat: '', effort: 0 },
        { name: 'attack', base_stat: '', effort: 0 },
        { name: 'defense', base_stat: '', effort: 0 },
        { name: 'special-attack', base_stat: '', effort: 0 },
        { name: 'special-defense', base_stat: '', effort: 0 },
        { name: 'speed', base_stat: '', effort: 0 }
    ]);
    const [sprites, setSprites] = useState({ front_default: '' });
    // const [types, setTypes] = useState([{ name: '', url: '' }]);
    const [types, setTypes] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [nameError, setNameError] = useState('');
    const [heightError, setHeightError] = useState('');
    const [weightError, setWeightError] = useState('');
    const [ability1Error, setAbility1Error] = useState('');
    const [ability2Error, setAbility2Error] = useState('');
    const [spritesError, setSpritesError] = useState('');


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


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name) {
            setNameError('Falta el nombre');
            return;
        }
        if (!height) {
            setHeightError('Falta la altura');
            return;
        }
        if (!weight) {
            setWeightError('Falta el peso');
            return;
        }
    
        if (!abilities[0].ability.name) {
            setAbility1Error('Falta la habilidad 1');
            return;
        }
    
        if (!abilities[1].ability.name) {
            setAbility2Error('Falta la habilidad 2');
            return;
        }
    
        if (!sprites.front_default) {
            setSpritesError('Falta el sprite');
            return;
        }

        const pokemonData = {
            name,
            height,
            weight,
            abilities,
            sprites,
            stats,
            types,
        };

        try {
            const response = await axios.post('http://localhost:3001/pokemons', pokemonData);



            if (response.status === 200) {
                console.log('Pokémon guardado con éxito:', response.data);
                setSuccessMessage('POKEMON CREADO!');
                setErrorMessage('');
            } else {
                console.error('Hubo un problema al guardar el Pokémon');
                setErrorMessage('El nombre que intentas poner ya existe');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('El nombre que intentas usar ya existe!');
            setSuccessMessage('');
        }
    };




    return (
        <div className="backcp">
            <header className='encabezado'>
                <Link to="/home" className="boton">
                    <img src={backIcon} alt="Back" />INICIO</Link>
            </header>

            <div className='list'>
                <form onSubmit={handleSubmit}>
                    <div className='nombre'><h5>ingresa un nombre por favor</h5>
                        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                        {nameError && <p className="error-message">{nameError}</p>}
                    </div>
                    <div className='altura'>
                        <input type="text" placeholder="Altura" value={height} onChange={(e) => setHeight(e.target.value)} />
                        {heightError && <p className="error-message">{heightError}</p>}
                    </div>
                    <div className='peso'>
                        <input type="text" placeholder="Peso" value={weight} onChange={(e) => setWeight(e.target.value)} />
                        {weightError && <p className="error-message">{weightError}</p>}
                    </div>
                    <h5>Habilidades del pokemon</h5>
                    <div className='habilidades'>
                        <input type="text" placeholder="Habilidad 1" value={abilities[0].ability.name} onChange={(e) => {
                            const newAbilities = [...abilities];
                            newAbilities[0].ability.name = e.target.value;
                            setAbilities(newAbilities);
                        }} />
                        {ability1Error && <p className="error-message">{ability1Error}</p>}
                        <input type="text" placeholder="Habilidad 2" value={abilities[1].ability.name} onChange={(e) => {
                            const newAbilities = [...abilities];
                            newAbilities[1].ability.name = e.target.value;
                            setAbilities(newAbilities);
                        }} />
                        {ability2Error && <p className="error-message">{ability2Error}</p>}
                    </div>
                    <h5>Estadisticas de combate</h5>
                    <div className='stats'>
                        {stats.map((stat, index) => (
                            <div key={index}>
                                <input key={index} type="text" placeholder={stat.name} value={stat.base_stat} onChange={(e) => {
                                    const newStats = [...stats];
                                    newStats[index].base_stat = e.target.value;
                                    setStats(newStats);
                                }} />
                            </div>
                        ))}
                    </div>
                    <h5>Seleccione el o los tipos del pokemon</h5>
                    <div className='checkbox'>

                        {availableTypes.map((type) => (
                            <div key={type.id}>
                                <input type="checkbox" id={type.name} value={type.name} onChange={(e) => {
                                    if (e.target.checked) {
                                        setTypes([...types, { name: e.target.value, url: type.url }]);
                                    } else {
                                        setTypes(types.filter((t) => t.name !== e.target.value));
                                    }
                                }} />
                                <label htmlFor={type.name}>{type.name}</label>
                            </div>
                        ))}
                    </div>
                    <div className='apariencia'><h5>agregue un link de la imagen del pokemon</h5>
                        <input type="text" placeholder="Sprite Front Default" value={sprites.front_default} onChange={(e) => setSprites({ front_default: e.target.value })} />
                        {spritesError && <p className="error-message">{spritesError}</p>}
                    </div>
                    <button className='guardar' type="submit">Guardar Pokémon</button>
                </form>
                {successMessage && <p className='mensajeCreado'>{successMessage}</p>}
                {errorMessage && <p className='mensajeError'>{errorMessage}</p>}
            </div>
        </div>
    );
}

export default CreatePokemon;
