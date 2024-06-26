const baseurl = 'http://localhost:3000/pokemon';

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