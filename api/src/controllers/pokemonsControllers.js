const {Pokemon, Type} = require("../db");
const axios= require('axios')


const createPokemonDB = async (pokemonData) => {
    const { id, name, abilities, height, weight, stats, types, sprites} = pokemonData;
    
    const newPokemon = await Pokemon.create({
        id,
        name,
        abilities,
        height,
        sprites,
        weight,
        stats,
        types
    });
    for (let i = 0; i < types.length; i++) {
        let type = types[i];
        let existingType = await Type.findOne({ where: { name: type.type.name } });
        if (!existingType) {
            existingType = await Type.create({
                name: type.type.name,
                url: type.type.url,
                slot: type.slot
            });
        }

        await newPokemon.addType(existingType);
    }
    return newPokemon;
};


const getPokemonById =async(idPokemon, source) =>{
    let pokemon;
    if (source === "api") {
        pokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)).data;
    } else {
        pokemon = await Pokemon.findByPk(idPokemon,
            {
                include:{
                    model:Type,
                    attributes: ["name", "url"],
                },
        });
    }

        const detalleApi= filtrarDatos(pokemon,source);

    return detalleApi;
    
};

const filtrarDatos = (pokemon,source) => {
    const { id, name, abilities, height, sprites, weight, stats, Type } = pokemon;
    let spritesFiltrados = {};
    if(sprites) {
        spritesFiltrados = {
        back_default: sprites.back_default,
        back_female: sprites.back_female,
        back_shiny: sprites.back_shiny,
        back_shiny_female: sprites.back_shiny_female,
        front_default: sprites.front_default,
        front_female: sprites.front_female,
        front_shiny: sprites.front_shiny,
        front_shiny_female: sprites.front_shiny_female
        };
    };

    const statsFiltrados = stats.map(stat => ({
        base_stat: stat.base_stat,
        effort: stat.effort,
        stat: stat.stat
    }));
    
    console.log(pokemon.types);
    let typesFiltrados = [];

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

    return {
        id,
        name,
        abilities,
        height,
        sprites: spritesFiltrados,
        weight,
        stats: statsFiltrados,
        types: typesFiltrados
    };
};
const soloNombre = (arr) => {
    if (!Array.isArray(arr)) {
        console.error('Error: arr no es un array. Su valor es:', arr);
        return;
    }
    return arr.map((pokemon)=>{
    return {
        name:pokemon.name,
        url: pokemon.url,
        created:false,
    };
});
};
const getAllPokemons = async()=>{
    const pokemonsDB = await Pokemon.findAll()

    const infoApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`)).data;

    const pokemonApi= soloNombre(infoApi.results);

    return [...pokemonsDB,...pokemonApi];
}

const getPokemonByName = async (name) => {
    const infoApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`)).data;
    const pokemonApi = soloNombre(infoApi.results);
    const lowerCaseName = name.toLowerCase();
    const pokemonFiltrado = pokemonApi.filter(pokemon => pokemon.name === lowerCaseName);
    const pokemonDD = await Pokemon.findAll({where: {name: lowerCaseName}});

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
module.exports={createPokemonDB, getPokemonById, getAllPokemons, getPokemonByName, getTypesByApi};