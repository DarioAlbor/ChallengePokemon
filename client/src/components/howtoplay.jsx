import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { IoMdClose } from 'react-icons/io';
import { FcInfo } from 'react-icons/fc';

const HowToPlay = ({ onClose }) => {
  return (
    <Box sx={{ p: 4, position: 'relative' }}>
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <IoMdClose size={24} />
      </IconButton>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 2,
          position: 'relative',
          display: 'inline-block',
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '20%',
            bottom: 0,
            left: 0,
            backgroundColor: 'DodgerBlue',
            zIndex: -1,
          },
        }}
      >
        ¿Cómo jugar?
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Únete a la batalla con tu pokémon favorito siguiendo estos pasos:
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        &bull; Presiona el botón "Jugar"
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        &bull; Escoge tu pokémon favorito, puedes visualizar sus estadísticas posicionando tu mouse encima del botón <FcInfo size={20}/>
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        &bull; Una vez escogido, se seleccionará un contrincante aleatoriamente y podrás dar comienzo a la batalla presionando "Comenzar batalla"
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        &bull; Podrás visualizar los ataques en tiempo real antes de ver los resultados.
      </Typography>
        <Typography fontWeight="bold" variant="body2" sx={{ mb: 1 }}>
        ¡Disfruta! 🎉
        </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" color="primary" onClick={onClose}>
          Cerrar
        </Button>
      </Box>
    </Box>
  );
};

export default HowToPlay;