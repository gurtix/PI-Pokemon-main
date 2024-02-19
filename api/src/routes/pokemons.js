const {Router} = require('express');
const { Pokemon } = require('../db.js');
const axios = require('axios');
const {getDetailPokemon, getPokemonsHandler, getTypes,createPokemonHandler,getPokemonWithTypesHandler} = require("../handlers/pokemonsHandler");

const router= Router();

router.get("/types", getTypes);
router.get("/:idPokemon", getDetailPokemon);
router.get("/", getPokemonsHandler);
router.post("/", createPokemonHandler);
router.get("/:idPokemon/types", getPokemonWithTypesHandler);



module.exports = router;
