const { Router } = require('express');
const pokemonsRoutes = require('./pokemons.js');
const postsRoutes = require('./pokemons.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokemonsRoutes);
router.use('/postsPokemons', postsRoutes);




module.exports = router;
