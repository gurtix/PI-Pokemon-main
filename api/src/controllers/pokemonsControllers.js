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
    for (let type of types) {
        let existingType = await Type.findOne({ where: { name: type.name } });
        if (!existingType) {
            existingType = await Type.create({
                name: type.name,
                url: type.url
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

        const detalleApi= filtrarDatos(pokemon);

    return detalleApi;
    
};

const filtrarDatos = (pokemon) => {
    const { id, name, abilities, height, sprites, weight, stats, Types } = pokemon;
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
    let typesFiltrados = [];

  if (pokemon.types) {
    typesFiltrados = pokemon.types.map(t => ({
      name: t.name,
      url: t.url
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
        created:false,
    };
});
};
const getAllPokemons = async()=>{
    const pokemonsDB = await Pokemon.findAll()

    const infoApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon`)).data;

    const pokemonApi= soloNombre(infoApi.results);

    return [...pokemonsDB,...pokemonApi];
}

const getPokemonByName = async (name)=>{

    const infoApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon`)).data;

    const pokemonApi= soloNombre(infoApi.results);

    const pokemonFiltrado= pokemonApi.filter(pokemon=>pokemon.name===name);

    const pokemonDD= await Pokemon.findAll({where:{name:name}});

    return [...pokemonFiltrado,...pokemonDD];

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
  const getPokemonWithTypes = async (idPokemon) => {
    const pokemon = await Pokemon.findByPk(idPokemon, {
      include: Type
    });
  
    return pokemon;
  };

module.exports={createPokemonDB, getPokemonById, getAllPokemons, getPokemonByName, getTypesByApi,getPokemonWithTypes};