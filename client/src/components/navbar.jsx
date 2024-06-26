// src/components/navbar.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container, IconButton, Menu, MenuItem, Modal } from '@mui/material';
import { MdCatchingPokemon } from 'react-icons/md';
import { CgPokemon } from 'react-icons/cg';
import { IoMdMenu } from 'react-icons/io';
import './css/navbar.css';
import HowToPlay from './howtoplay';

const Navbar = ({ startGame }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openHowToPlayModal, setOpenHowToPlayModal] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenHowToPlay = () => {
    setOpenHowToPlayModal(true);
    handleMenuClose();
  };

  const handleCloseHowToPlay = () => {
    setOpenHowToPlayModal(false);
  };

  const handleOpenDocumentation = () => {
    window.open('https://github.com/DarioAlbor/ChallengePokemon', '_blank');
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="static" className="navbar">
        <Container maxWidth={false}>
          <Toolbar className="toolbar">
            <Box className="logo-section">
              <MdCatchingPokemon size={30} className="logo-icon" />
              <Typography variant="h6" component="div" className="logo-text">
                Pokémon Challenge
              </Typography>
            </Box>
            <Box className="button-section">
              <Box className="desktop-buttons">
                <Button className="nav-button" onClick={handleOpenHowToPlay}>¿Cómo jugar?</Button>
                <Button className="nav-button" onClick={handleOpenDocumentation}>Documentación</Button>
                <Button variant="contained" color="primary" onClick={startGame} className="play-button">
                  <CgPokemon size={20} className="play-icon" />
                  JUGAR
                </Button>
              </Box>
              <Box className="mobile-menu">
                <IconButton edge="end" color="black" aria-label="menu" onClick={handleMenuOpen}>
                  <IoMdMenu size={30} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  className="menu"
                >
                  <MenuItem onClick={handleOpenHowToPlay} className="nav-button">¿Cómo jugar?</MenuItem>
                  <MenuItem onClick={handleOpenDocumentation} className="nav-button">Documentación</MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Button variant="contained" color="primary" onClick={startGame} className="play-button">
                      <CgPokemon size={20} className="play-icon" />
                      JUGAR
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Modal open={openHowToPlayModal} onClose={handleCloseHowToPlay}>
        <Box className="modal-container">
          <HowToPlay onClose={handleCloseHowToPlay} />
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;