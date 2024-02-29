const { Pokemon, Type, Detail } = require("../db");
const axios = require('axios')


const createPokemonDB = async (pokemonData) => {
    const { name, types } = pokemonData;

    let newPokemon = await Pokemon.create({
        name,
        url: "",
        created: true
    });
    const url = `http://localhost:3001/pokemons/${newPokemon.idPokemon}`;
    newPokemon = await newPokemon.update({ url });

    let newDetail = await Detail.create({
        id: newPokemon.idPokemon,
        name,
        height: pokemonData.height,
        weight: pokemonData.weight,
        abilities: pokemonData.abilities,
        sprites: pokemonData.sprites,
        stats: pokemonData.stats.map(stat => ({
            base_stat: stat.base_stat,
            effort: 0, 
            stat: {
                name: stat.name,
                url: `http://localhost:3001/stats/${stat.name}` 
            }
        })),
        created: true
    });

    for (let typeData of types) {
        const { name, url } = typeData;
        let type = await Type.findOne({ where: { name } });
        if (!type) {
            type = await Type.create({
                name,
                url
            });
        }
        await newPokemon.addType(type);;
        await newDetail.addType(type)
    }

    return newDetail;
};


// const getPokemonById =async(idPokemon, source) =>{
//     let pokemon;
//     if (source === "api") {
//         pokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)).data;
//     } else {
//         pokemon = await Pokemon.findByPk(idPokemon,
//             {
//                 include:{
//                     model:Type,
//                     attributes: ["name", "url"],
//                 },
//         });
//     }

//         const detalleApi= filtrarDatos(pokemon,source);

//     return detalleApi;

// };
const getPokemonById = async (idPokemon, source) => {
    let pokemon;
    if (source === "api") {
        pokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)).data;
    } else {
        pokemon = await Detail.findByPk(idPokemon, {
            include: {
                model: Type,
                attributes: ["name", "url"],
            },
        });
        // console.log(pokemon.get());
    }

    const detalleApi = filtrarDatos(pokemon, source);

    return {
        id: idPokemon,
        ...detalleApi
    };
};

const filtrarDatos = (pokemon, source) => {
    const { id, name, abilities, height, sprites, weight, stats, Type } = pokemon;
    let spritesFiltrados = {};
    if (sprites) {
        spritesFiltrados = {
            front_default: sprites.front_default
        };
    };

    console.log(pokemon.types);
    let typesFiltrados = [];

    if (Array.isArray(pokemon.types)) {
        if (source === "api") {
            typesFiltrados = pokemon.types.map(t => ({
                slot: t.slot,
                type: {
                    name: t.type.name,
                    url: t.type.url
                }
            }));
        } else {
            typesFiltrados = pokemon.types.map(t => ({
                slot: t.slot,
                type: {
                    name: t.name,
                    url: t.url
                }
            }));
        }
    }

    return {
        id: pokemon.id,
        name,
        abilities,
        height,
        sprites: spritesFiltrados,
        weight,
        stats,
        types: typesFiltrados
    };
};
const soloNombre = (arr) => {
    if (!Array.isArray(arr)) {
        console.error('Error: arr no es un array. Su valor es:', arr);
        return;
    }
    return arr.map((pokemon) => {
        return {
            name: pokemon.name,
            url: pokemon.url,
            created: false,
        };
    });
};
const getAllPokemons = async () => {
    const pokemonsDB = await Pokemon.findAll()

    const infoApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`)).data;

    const pokemonApi = soloNombre(infoApi.results);

    return [...pokemonsDB, ...pokemonApi];
}

const getPokemonByName = async (name) => {
    const infoApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`)).data;
    const pokemonApi = soloNombre(infoApi.results);
    const lowerCaseName = name.toLowerCase();
    const pokemonFiltrado = pokemonApi.filter(pokemon => pokemon.name === lowerCaseName);
    const pokemonDD = await Pokemon.findAll({ where: { name: lowerCaseName } });

    const result = [...pokemonFiltrado, ...pokemonDD];

    if (result.length === 0) {
        console.log('No se encontró el Pokémon con el nombre:', name);
    }

    return result;
}


const getTypesByApi = async () => {
    const typesFromAPI = await axios.get('https://pokeapi.co/api/v2/type');
    const types = typesFromAPI.data.results;

    const count = await Type.count();
    if (count === 0) {
        for (let type of types) {
            await Type.create({
                name: type.name,
                url: type.url
            });
        }
    }

    const typesFromDB = await Type.findAll();
    return typesFromDB;
};
module.exports = { createPokemonDB, getPokemonById, getAllPokemons, getPokemonByName, getTypesByApi };