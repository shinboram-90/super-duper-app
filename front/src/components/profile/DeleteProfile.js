import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../api/axios';
import { deleteUser } from '../../features/users/usersSlice';

import { Button, Box, Modal, Typography, Alert } from '@mui/material';

const DeleteProfile = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDeleteProfile = () => {
    try {
      axios
        .delete(`api/users/${userId}`)
        .then(() => dispatch(deleteUser(userId)));
    } catch (err) {
      console.error('Failed to delete the user', err);
    }
    localStorage.removeItem('user');
    navigate('/register');
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    p: 2,
  };

  return (
    <Box sx={{ marginTop: '4rem', marginRight: '7rem' }}>
      <Button
        sx={{ float: 'right' }}
        type="button"
        onClick={handleOpen}
        variant="outlined"
        color="error"
      >
        Delete profile
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-description" sx={{ mb: 1 }}>
            <Alert severity="warning">
              {' '}
              You are about to delete your account, would you like to proceed?
            </Alert>
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={onDeleteProfile}
              variant="contained"
              color="error"
              sx={{ ml: 2 }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DeleteProfile;
