const { createPokemonDB } = require('../controllers/pokemonsControllers');

const createPostHandler = async (req, res) => {
  const { name, sprites, stats, height, weight } = req.body;
  try {
    const newPokemon = await createPokemonDB(name, sprites, stats, height, weight);
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createPostHandler;