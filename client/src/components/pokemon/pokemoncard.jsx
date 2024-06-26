import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box, Tooltip } from '@mui/material';
import { FcInfo } from 'react-icons/fc';
import { IoWater } from 'react-icons/io5';
import { MdElectricBolt } from 'react-icons/md';
import { MdGrass } from "react-icons/md";
import { FaFire } from 'react-icons/fa';
import { FaRegCircle } from 'react-icons/fa';

const typeIcons = {
  Water: <IoWater size={24} color="#00BFFF" />,
  Electric: <MdElectricBolt size={24} color="#FFD700" />,
  Grass: <MdGrass size={24} color="#7CFC00" />,
  Fire: <FaFire size={24} color="#FF4500" />,
  Normal: <FaRegCircle size={24} color="#A9A9A9" />,
};

const PokemonCard = ({ pokemon }) => (
  <Card sx={{ width: 200, margin: '10px', cursor: 'pointer', position: 'relative', boxShadow: 3 }}>
    <CardMedia
      component="img"
      height="140"
      image={pokemon.imageUrl}
      alt={pokemon.name}
      sx={{ objectFit: 'contain', objectPosition: 'center' }}
    />
    <CardContent>
      <Typography variant="h5" component="div" sx={{ fontSize: '1.25rem' }}>
        {pokemon.name}
      </Typography>
    </CardContent>
    <Tooltip
      title={
        <Box>
          <Typography variant="body2">Ataque: {pokemon.attack}</Typography>
          <Typography variant="body2">Defensa: {pokemon.defense}</Typography>
          <Typography variant="body2">Velocidad: {pokemon.speed}</Typography>
          <Typography variant="body2">HP: {pokemon.hp}</Typography>
          <Typography variant="body2">Tipo: {pokemon.type}</Typography>
        </Box>
      }
      placement="top"
    >
      <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
        <FcInfo size={24} />
      </Box>
    </Tooltip>
    <Box
      sx={{
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
        borderRadius: '50%',
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {typeIcons[pokemon.type] || <FaRegCircle size={24} color="#A9A9A9" />}
    </Box>
  </Card>
);

export default PokemonCard;