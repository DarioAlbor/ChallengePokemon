import React, { useState } from 'react';
import { Button, Grid, Typography, Box, useMediaQuery, useTheme, Container, Modal } from '@mui/material';
import { styled } from '@mui/system';
import { SvgIcon } from '@mui/material';
import './css/hero.css';
import HowToPlay from './howtoplay';

const FullHeightGrid = styled(Grid)({
  minHeight: '60vh',
});

const FullHeightFlex = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(5),
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '15px',
  border: '1px solid #ccc',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const ResponsiveHeading = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const ImageBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '300px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '15px',
  marginLeft: '10px',
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    marginTop: theme.spacing(2),
    height: '200px',
  },
}));

const Blob = (props) => (
  <SvgIcon
    {...props}
    viewBox="0 0 578 440"
    style={{
      position: 'absolute',
      top: '-10%',
      left: '-10%',
      width: '120%',
      height: '120%',
      zIndex: '-1',
      overflow: 'hidden',
      borderRadius: '30px',
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
      className="blob"
    />
  </SvgIcon>
);

export default function Hero({ startGame }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openHowToPlayModal, setOpenHowToPlayModal] = useState(false);

  const handleOpenHowToPlay = () => {
    setOpenHowToPlayModal(true);
  };

  const handleCloseHowToPlay = () => {
    setOpenHowToPlayModal(false);
  };

  return (
    <>
      <FullHeightGrid container direction={{ xs: 'column', md: 'row' }} alignItems="center">
        <Grid item xs={12}>
          <Container maxWidth="md">
            <FullHeightFlex
              sx={{
                mt: { xs: 4, md: 10 }, // Mueve el hero más arriba en móviles y más abajo en monitores
              }}
            >
              <Box sx={{ width: '100%', maxWidth: 'lg', flex: 1 }}>
                <ResponsiveHeading component="h1" variant="h2" className="heading" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  <Typography component="span" position="relative" className="highlight" sx={{ fontWeight: 'bold' }}>
                    Batalla Pokémon
                  </Typography>
                </ResponsiveHeading>
                <Typography variant="body1" color="textSecondary" sx={{ my: 3 }}>
                  ¡Prepárate para la batalla definitiva de Pokémon! Elige a tu Pokémon favorito y comienza la aventura.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={startGame}
                    sx={{ borderRadius: '50px' }}
                  >
                    Comenzar batalla
                  </Button>
                  <Button variant="outlined" sx={{ borderRadius: '50px' }} onClick={handleOpenHowToPlay}>
                    ¿Cómo jugar?
                  </Button>
                </Box>
                {isMobile && (
                  <Box sx={{ position: 'relative', width: '100%', mt: 3 }}>
                    <Blob />
                    <ImageBox
                      className="image-box"
                      sx={{
                        backgroundImage:
                          'url(https://cdn.sortiraparis.com/images/80/66131/1025167-pokemon-presents-date-heure-attentes-tout-ce-que-vous-devez-savoir-sur-l-evenement.jpg)',
                      }}
                    />
                  </Box>
                )}
              </Box>
              {!isMobile && (
                <Box sx={{ position: 'relative', flex: 1, height: '100%' }}>
                  <Blob />
                  <ImageBox
                    className="image-box"
                    sx={{
                      backgroundImage:
                        'url(https://cdn.sortiraparis.com/images/80/66131/1025167-pokemon-presents-date-heure-attentes-tout-ce-que-vous-devez-savoir-sur-l-evenement.jpg)',
                      height: isMobile ? '200px' : '300px',
                    }}
                  />
                </Box>
              )}
            </FullHeightFlex>
          </Container>
        </Grid>
      </FullHeightGrid>
      <Modal open={openHowToPlayModal} onClose={handleCloseHowToPlay}>
        <Box className="modal-container">
          <HowToPlay onClose={handleCloseHowToPlay} />
        </Box>
      </Modal>
    </>
  );
}
