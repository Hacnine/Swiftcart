import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { selectToast, hideToast } from '../store/slices/uiSlice';

const Toast = () => {
  const dispatch = useDispatch();
  const toast = useSelector(selectToast);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideToast());
  };

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert 
        onClose={handleClose} 
        severity={toast.type} 
        sx={{ width: '100%' }}
        variant="filled"
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
