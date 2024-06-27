import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, IconButton, Divider, CircularProgress } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import PokemonCard from './pokemoncard';
import './css/pokemonlist.css';
import apiroutes from '../../utils/apiroutes';

const PokemonList = ({ onSelectPokemon, onClose }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCountdown, setRetryCountdown] = useState(5);

  const fetchPokemons = () => {
    setLoading(true);
    setError(false);

    axios.get(`${apiroutes.baseurl}${apiroutes.pokemon}`)
      .then(response => {
        setPokemons(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(true);
      });
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    let interval;
    if (error) {
      interval = setInterval(() => {
        setRetryCountdown(prev => {
          if (prev === 1) {
            fetchPokemons();
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [error]);

  return (
    <div className="pokemon-list-container">
      <Typography variant="h4" component="div" sx={{ marginBottom: '20px', textAlign: 'center' }}>
        Escoge tu Pokémon
      </Typography>
      <Box className="pokemon-list" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        {loading ? (
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress />
            {error && (
              <Typography variant="body2" sx={{ marginTop: '10px' }}>
                Reintentando en {retryCountdown}
              </Typography>
            )}
          </Box>
        ) : (
          pokemons.map((pokemon, index) => (
            <React.Fragment key={pokemon.id}>
              <Box
                className="pokemon-container"
                sx={{
                  margin: 0.5,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
                onClick={() => onSelectPokemon(pokemon)}
              >
                <PokemonCard pokemon={pokemon} />
              </Box>
              {index < pokemons.length - 1 && (
                <Divider className="pokemon-divider-mobile" />
              )}
            </React.Fragment>
          ))
        )}
      </Box>
      <IconButton className="close-button" onClick={onClose}>
        <IoMdClose size={24} />
      </IconButton>
    </div>
  );
};

export default PokemonList;