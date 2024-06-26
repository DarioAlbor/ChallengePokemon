import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box } from '@mui/material';

const SubmitExit = ({ open, handleClose, handleConfirm, message }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>Confirmación</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', gap: '7px' }}>
          <Button 
            onClick={handleClose} 
            sx={{ 
              backgroundColor: 'red', 
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkred'
              } 
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirm} 
            sx={{ 
              backgroundColor: 'green', 
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkgreen'
              }
            }} 
            autoFocus
          >
            Confirmar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default SubmitExit;