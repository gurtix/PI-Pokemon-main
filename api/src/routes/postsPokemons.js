const {Router} = require('express');
const {createPostHandler}= require("../handlers/postHandler");

const router = Router ();

router.post("/",createPostHandler);

module.exports = postsPokemons;