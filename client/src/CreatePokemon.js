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
            } else {
                console.error('Hubo un problema al guardar el Pokémon');
            }
        } catch (error) {
            console.error('Error:', error);
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
                    <div>
                        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" placeholder="Altura" value={height} onChange={(e) => setHeight(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" placeholder="Peso" value={weight} onChange={(e) => setWeight(e.target.value)} />
                    </div>
                    <div>
                    <input type="text" placeholder="Habilidad 1" value={abilities[0].ability.name} onChange={(e) => {
    const newAbilities = [...abilities];
    newAbilities[0].ability.name = e.target.value;
    setAbilities(newAbilities);
}} />
<input type="text" placeholder="Habilidad 2" value={abilities[1].ability.name} onChange={(e) => {
    const newAbilities = [...abilities];
    newAbilities[1].ability.name = e.target.value;
    setAbilities(newAbilities);
}} />
                    </div>
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
                    <div>
                        <input type="text" placeholder="Sprite Front Default" value={sprites.front_default} onChange={(e) => setSprites({ front_default: e.target.value })} />
                    </div>
                    <button type="submit">Guardar Pokémon</button>

                </form>
            </div>
        </div>
    );
}

export default CreatePokemon;
