const { createPokemonDB, getPokemonById, getAllPokemons, getPokemonByName, getTypesByApi } = require("../controllers/pokemonsControllers");

const getPokemonsHandler = async (req,res) =>{
    const {name}=req.query;
    try {
        if(name){
            const pokemonByName = await getPokemonByName(name)
            console.log('Valor de pokemonByName:', pokemonByName);
            if (pokemonByName.length === 0) {
                console.log('No se encontró el Pokémon con el nombre: ' + name);
                res.status(404).send({error: 'No se encontró el Pokémon con el nombre: ' + name});
            } else {
                res.status(200).send(pokemonByName);
            }
        }else{
            const response= await getAllPokemons()
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(400).send({error:error.message})        
    }
};


const getDetailPokemon = async (req, res) => {
    const { idPokemon } = req.params;
    const source = isNaN(idPokemon) ? "bdd" : "api";
  
    try {
      const response = await getPokemonById(idPokemon, source);
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  

const getTypes = async (req,res)=>{
    try {
        const types = await getTypesByApi();
        res.status(200).send(types);
    }catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const createPokemonHandler = async(req, res)=>{ 
    const pokemonData = req.body;
    try {
        const newPokemon = await createPokemonDB(pokemonData);
        res.status(200).send(newPokemon);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }

};



module.exports = {
    getPokemonsHandler,
    getDetailPokemon,
    getTypes,
    createPokemonHandler,
};