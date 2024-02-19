const { createPokemonDB } = require('../controllers/pokemonsControllers');

const createPostHandler = async (req, res) => {
  const { title, body } = req.body;
  try {
    const newPokemon = await createPokemonDB(title, body);
    res.status(200).json(newPokemon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createPostHandler;