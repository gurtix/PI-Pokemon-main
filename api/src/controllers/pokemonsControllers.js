const {Pokemon, Stat} = require("../db");

const createPokemonDB= async(name, sprites, stats, height, weight)=>{
    const pokemon = await Pokemon.create({name, sprites, height, weight});
    const stat = await Stat.create(stats);
    await pokemon.addStat(stat);

    return pokemon;
};

module.exports={createPokemonDB};