const {Router} = require('express');
const { Pokemon } = require('../db.js');
const axios = require('axios');
const {getDetailPokemon, getPokemonsHandler, getTypes,createPokemonHandler} = require("../handlers/pokemonsHandler");

const router= Router();

router.get("/",getPokemonsHandler);
router.get("/:idPokemon",getDetailPokemon);
router.get("/types",getTypes);
router.post("/",createPokemonHandler);


// router.get('/', async (req, res) => {
//   try {
//     const pokemons = await Pokemon.findAll();    

//     res.status(200).send("pokemones");
//     res.json(pokemons);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Ha ocurrido un error recibiendo los pokemons' });
//   }
// });

// router.get('/:idPokemon', async (req, res) => {
//     const idPokemon = req.params.idPokemon;
//     res.status(200).send
//     try {
//       const pokemon = await Pokemon.findOne({
//         where: {
//           ID: idPokemon
//         }
//       });
//       if (pokemon) {
//         res.json(pokemon);
//       } else {
//         res.status(404).json({ error: 'Pokemon no encontrado' });
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'An error occurred while retrieving the pokemon' });
//     }
//   });
// router.post('/pokemons', async (req, res) => {
//     const { ID, Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, Peso, tipos } = req.body;
//     try {
//       const newPokemon = await Pokemon.create({
//         ID,
//         Nombre,
//         Imagen,
//         Vida,
//         Ataque,
//         Defensa,
//         Velocidad,
//         Altura,
//         Peso
//       });
  
//       const typesToAssociate = await Type.findAll({
//         where: {
//           nombre: tipos
//         }
//       });
  
//       await newPokemon.addTypes(typesToAssociate);
//       res.status(201).json(newPokemon);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('An error occurred while creating the pokemon');
//     }
//   });
// router.get('/types', async (req, res) => {
//     try {
//       // Comprueba si ya hay tipos en la base de datos
//       let types = await Type.findAll();
//       if (types.length === 0) {
//         // Si no hay tipos, obtén los tipos de la API
//         const response = await axios.get('https://pokeapi.co/api/v2/type');
//         const apiTypes = response.data.results;
  
//         // Guarda los tipos en la base de datos
//         types = await Promise.all(apiTypes.map(type => Type.create({ name: type.name })));
//       }
  
//       // Devuelve los tipos
//       res.json(types);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('An error occurred while retrieving the types');
//     }
// });


module.exports = router;
