const baseurl = 'https://challengepokemon.onrender.com/pokemon';

// RUTAS GET
const routes = {
  pokemon: '',
  pokemonById: '/:id',

// RUTAS POST
  createPokemon: '',
  pokemonBattle: '/battle',
};

module.exports = {
  baseurl,
  ...routes,
};