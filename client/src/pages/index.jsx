import React, { useState } from 'react';
import { Container, Modal, Box } from '@mui/material';
import Hero from '../components/hero';
import Navbar from '../components/navbar';
import PokemonList from '../components/pokemon/pokemonlist';
import PokemonBattle from '../components/pokemon/pokemonbattle';

const Index = () => {
  const [openSelectionModal, setOpenSelectionModal] = useState(false);
  const [openBattleModal, setOpenBattleModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleStartGame = () => {
    setOpenSelectionModal(true);
  };

  const handleCloseSelectionModal = () => {
    setOpenSelectionModal(false);
  };

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    setOpenSelectionModal(false);
    setOpenBattleModal(true);
  };

  const handleCloseBattleModal = () => {
    setSelectedPokemon(null);
    setOpenBattleModal(false);
    setOpenSelectionModal(true);
  };

  const handleCloseAllModals = () => {
    setSelectedPokemon(null);
    setOpenBattleModal(false);
    setOpenSelectionModal(false);
  };

  return (
    <>

    {/*} NAVBAR {*/}
      <Navbar startGame={handleStartGame} />

    {/*} HERO {*/}
      <Container maxWidth="lg">
        <Hero startGame={handleStartGame} />
      </Container>

    {/*} THE GAME {*/}
      <Modal open={openSelectionModal} onClose={handleCloseSelectionModal}>
        <Box className="modal-container">
          <PokemonList onSelectPokemon={handleSelectPokemon} onClose={handleCloseSelectionModal} />
        </Box>
      </Modal>
      <Modal open={openBattleModal} onClose={handleCloseBattleModal}>
        <Box className="modal-container">
          {selectedPokemon && (
            <PokemonBattle 
              selectedPokemon={selectedPokemon} 
              onClose={handleCloseBattleModal} 
              onCloseAll={handleCloseAllModals} 
              onBackToSelection={handleCloseBattleModal}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Index;