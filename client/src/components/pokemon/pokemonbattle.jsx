import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Typography, Box, IconButton, Button, Grid, Card, CardContent, LinearProgress, Modal } from '@mui/material';
import apiroutes from '../../utils/apiroutes';
import { IoIosArrowRoundBack, IoMdClose } from "react-icons/io";
import SubmitExit from '../submitexit';
import PokemonBattleLog from './pokemonbattlelog';
import './css/pokemonbattle.css';

const PokemonBattle = ({ selectedPokemon, onClose, onCloseAll, onBackToSelection }) => {
  const [opponent, setOpponent] = useState(null);
  const [finalOpponent, setFinalOpponent] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [attackLog, setAttackLog] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showFinalOpponent, setShowFinalOpponent] = useState(false);
  const battleAudioRef = useRef(null);
  const startBattleButtonRef = useRef(null);

  useEffect(() => {
    const fetchOpponent = async () => {
      try {
        const response = await axios.get(`${apiroutes.baseurl}${apiroutes.pokemon}`);
        const pokemons = response.data.filter(pokemon => pokemon.id !== selectedPokemon.id); // Exclude the selected Pokemon from the list of possible opponents
        let currentIndex = 0;
        let speed = 300;
        let count = 0;
        const interval = setInterval(() => {
          setOpponent(pokemons[currentIndex]);
          currentIndex = (currentIndex + 1) % pokemons.length;
          count++;
          if (count >= 10) {
            clearInterval(interval);
            const finalOpponent = pokemons[Math.floor(Math.random() * pokemons.length)];
            setOpponent(finalOpponent);
            setFinalOpponent(finalOpponent);
            setShowFinalOpponent(true);
          } else {
            speed += 100;
          }
        }, speed);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOpponent();
  }, [selectedPokemon]);

  useEffect(() => {
    if (showFinalOpponent && !battleResult && startBattleButtonRef.current) {
      startBattleButtonRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showFinalOpponent, battleResult]);

  const handleStartBattle = async () => {
    try {
      battleAudioRef.current = new Audio('/assets/battle.mp3');
      battleAudioRef.current.play();

      const battleResponse = await axios.post(`${apiroutes.baseurl}${apiroutes.pokemonBattle}`, {
        pokemon1Id: selectedPokemon.id,
        pokemon2Id: finalOpponent.id,
      });
      setBattleResult(battleResponse.data.winner);
      setAttackLog(battleResponse.data.attackLog);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenConfirm = () => {
    setConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setConfirmOpen(false);
  };

  const handleConfirmCloseAll = () => {
    setConfirmOpen(false);
    onCloseAll();
  };

  const renderStats = (pokemon) => (
    <Card className="pokemon-card">
      <CardContent>
        <Typography variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <img src={pokemon.imageUrl} alt={pokemon.name} className="pokemon-image" />
        {['hp', 'attack', 'defense', 'speed'].map((stat) => (
          <Box key={stat} sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {stat.toUpperCase()} ({pokemon[stat]})
            </Typography>
            <LinearProgress className="progress-bar" variant="determinate" value={(pokemon[stat] / 10) * 100} />
          </Box>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <Modal
      open
      onClose={handleOpenConfirm}
      BackdropProps={{ onClick: handleOpenConfirm }}
    >
      <Box className="battle-container" sx={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <IconButton onClick={onClose} className="back-button">
          <IoIosArrowRoundBack size={24} />
        </IconButton>
        <IconButton onClick={handleOpenConfirm} className="close-button">
          <IoMdClose size={24} />
        </IconButton>
        <Typography variant="h4" component="div" sx={{ marginBottom: '20px' }}>
          Batalla Pokémon
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={5}>
            {selectedPokemon && renderStats(selectedPokemon)}
          </Grid>
          <Grid item xs={12} md={2} textAlign="center">
            <Typography variant="h4" component="div">
              VS
            </Typography>
            {showFinalOpponent && !battleResult && (
              <Button ref={startBattleButtonRef} variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleStartBattle}>
                Comenzar batalla
              </Button>
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {opponent && renderStats(opponent)}
          </Grid>
        </Grid>
        {battleResult && (
          <PokemonBattleLog 
            attackLog={attackLog} 
            winner={battleResult} 
            isWinner={battleResult === selectedPokemon.name} 
            selectedPokemon={selectedPokemon}
            finalOpponent={finalOpponent}
            onReplay={onBackToSelection}
            battleAudioRef={battleAudioRef}
          />
        )}
        <SubmitExit
          open={confirmOpen}
          handleClose={handleCloseConfirm}
          handleConfirm={handleConfirmCloseAll}
          message="¿Estás seguro de que quieres salir de la partida?"
        />
      </Box>
    </Modal>
  );
};

export default PokemonBattle;