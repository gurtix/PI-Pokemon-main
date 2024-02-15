const {Router} = require('express');

const router = Router ();

router.post("/pokemons",(req,res)=>{
    res.status(200).send("Crear pokemon");
});

module.exports = postsPokemons;