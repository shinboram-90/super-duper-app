import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { editUser, setUsersData } from '../../features/users/usersSlice';
import DeleteProfile from './DeleteProfile';

// MUI STYLES
import { styled } from '@mui/material/styles';
import {
  TextField,
  Box,
  Button,
  Avatar,
  Container,
  Card,
  Typography,
  ListItemIcon,
  Tooltip,
  IconButton,
} from '@mui/material';
import defaultAvatar from '../../assets/defaultAvatar.jpg';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const users = useSelector((state) => state.users.users);
  const user = users.find((user) => user.id === auth.id);
  const [editing, setEditing] = useState(false);

  // const users = useSelector((state) => state.users.users);
  // const user = users.find((user) => user.id === auth.id);
  const avatarRef = useRef(null);
  const Input = styled('input')({
    display: 'none',
  });

  const navigate = useNavigate();

  const onClickRemoveAvatar = (e) => {
    e.preventDefault();
    setAvatar(null);
  };

  const [firstName, setFirstName] = useState(
    user && user.first_name ? user.first_name : ''
  );
  const [lastName, setLastName] = useState(
    user && user.last_name ? user.last_name : ''
  );
  const [biography, setBiography] = useState(
    user && user.biography ? user.biography : ''
  );
  const [avatar, setAvatar] = useState(
    user && user.avatar ? user.avatar : null
  );

  const onFirstNameChanged = (e) => setFirstName(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onBiographyChanged = (e) => setBiography(e.target.value);
  const onAvatarChanged = (e) => setAvatar(e.target.files[0]);

  useEffect(() => {
    axios
      .get(`api/users/`)
      .then((res) => dispatch(setUsersData(res.data.userList)));
  }, [dispatch, auth.id]);

  let imgPreview;
  if (avatar) {
    imgPreview = (
      <Avatar sx={{ width: 150, height: 150, borderRadius: '5px' }}>
        <img
          style={{ maxWidth: 150 }}
          src={avatarRef.current?.value ? URL.createObjectURL(avatar) : avatar}
          alt=""
          crossOrigin="true"
        />
      </Avatar>
    );
  } else {
    imgPreview = (
      <Avatar sx={{ width: 150, height: 150, borderRadius: '5px' }}>
        <img
          style={{ zIndex: '1' }}
          alt="default avatar"
          height="150"
          src={defaultAvatar}
          crossOrigin="true"
        />
      </Avatar>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (avatar) {
      formData.append('image', avatar);
    } else {
      formData.append('image', avatarRef.current.value);
    }
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('biography', biography);

    try {
      const response = await axios.put(`api/users/${auth.id}`, formData);
      if (response) {
        dispatch(editUser([auth.id, response.data.modifications]));
        setEditing(false);
        console.log([auth.id, response.data.modifications]);
        navigate('/feed/profile');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Box sx={{ paddingLeft: '2rem', maxWidth: '800px' }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '45rem',
            paddingBottom: '1.5rem',
          }}
        >
          <Box
            sx={{
              paddingTop: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {editing ? (
              <form onSubmit={handleSubmit} style={{ width: '80%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    '& > :not(style)': { m: 1 },
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    {imgPreview}
                    <Tooltip title="Remove">
                      <ListItemIcon
                        onClick={onClickRemoveAvatar}
                        sx={{
                          position: 'absolute',
                          top: '0.5rem',
                          left: '7.5rem',
                          cursor: 'pointer',
                        }}
                      >
                        <HighlightOffIcon fontSize="medium" />
                      </ListItemIcon>
                    </Tooltip>
                  </div>

                  <label htmlFor="avatar">
                    <Input
                      ref={avatarRef}
                      accept="image/*"
                      id="avatar"
                      type="file"
                      onChange={onAvatarChanged}
                    />
                    <Tooltip title="Change avatar">
                      <IconButton
                        color="primary"
                        aria-label="upload avatar"
                        component="span"
                      >
                        <PhotoCamera />
                      </IconButton>
                    </Tooltip>
                  </label>

                  <TextField
                    id="username"
                    name="username"
                    type="text"
                    size="small"
                    helperText="Username cannot be changed"
                    placeholder={auth.username}
                    disabled
                    fullWidth
                  />

                  <TextField
                    id="email"
                    name="email"
                    size="small"
                    helperText="Contact an admin to change"
                    placeholder={auth.email}
                    disabled
                    fullWidth
                  />

                  <TextField
                    type="text"
                    id="firstname"
                    name="firstname"
                    label="First name"
                    defaultValue={firstName}
                    helperText="Enter your first name"
                    onChange={onFirstNameChanged}
                    size="small"
                    fullWidth
                  />
                  <TextField
                    type="text"
                    id="lastname"
                    name="lastname"
                    label="Last name"
                    helperText="Enter your family name"
                    onChange={onLastNameChanged}
                    defaultValue={lastName}
                    size="small"
                    fullWidth
                  />

                  <TextField
                    id="biography"
                    name="biography"
                    label="Biography"
                    onChange={onBiographyChanged}
                    defaultValue={biography}
                    helperText="Let us know who you are!"
                    size="small"
                    multiline
                    rows={4}
                    fullWidth
                  />
                  <Box>
                    <Button
                      type="button"
                      onClick={() => setEditing(!editing)}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <span style={{ padding: '1rem' }}></span>
                    <Button type="submit" variant="contained">
                      Save profile
                    </Button>
                  </Box>
                </Box>
              </form>
            ) : (
              <form style={{ width: '80%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    '& > :not(style)': { m: 1.5 },
                  }}
                >
                  <Avatar sx={{ width: 150, height: 150 }}>
                    {user && user.avatar ? (
                      <img
                        alt="profile avatar"
                        src={user.avatar}
                        crossOrigin="true"
                        style={{ maxWidth: 150 }}
                      />
                    ) : (
                      <img
                        alt="default avatar"
                        height="150"
                        src={defaultAvatar}
                        crossOrigin="true"
                      />
                    )}
                  </Avatar>

                  <TextField
                    id="username"
                    name="username"
                    size="small"
                    helperText="Username"
                    placeholder={auth.username}
                    disabled
                    fullWidth
                  />

                  <TextField
                    id="email"
                    name="email"
                    size="small"
                    placeholder={auth.email}
                    disabled
                    fullWidth
                    helperText="Email"
                  />
                  <TextField
                    // label="First name"
                    id="firstname"
                    name="firstname"
                    size="small"
                    placeholder={firstName}
                    disabled
                    fullWidth
                    helperText="First name"
                  />

                  <TextField
                    // label="Lastname"
                    id="lastname"
                    name="lastname"
                    size="small"
                    placeholder={lastName}
                    disabled
                    fullWidth
                    helperText="Last Name"
                  />
                  <TextField
                    // label="Biography"
                    id="biography"
                    name="biography"
                    size="small"
                    placeholder={biography}
                    disabled
                    multiline
                    rows={4}
                    fullWidth
                    helperText="Biography"
                  />

                  <Typography
                    variant="caption"
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    {' '}
                    Last update:{' '}
                    {user && user.updated_at
                      ? moment(user.updated_at).format('dddd, MMMM Do YYYY')
                      : ''}
                  </Typography>
                </Box>
                <Button
                  sx={{ margin: '1rem', float: 'right' }}
                  startIcon={<EditIcon />}
                  type="button"
                  onClick={() => setEditing(!editing)}
                  variant="contained"
                >
                  Edit
                </Button>
              </form>
            )}
          </Box>
        </Card>
        <DeleteProfile userId={user.id} />
      </Box>
    </Container>
  );
};

export default EditProfile;
