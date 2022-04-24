import { TextField, Box, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import defaultAvatar from '../../assets/defaultAvatar.jpg';
import {
  editUser,
  deleteUser,
  setUsersData,
} from '../../features/users/usersSlice';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const users = useSelector((state) => state.users.users);
  const user = users.find((user) => user.id === auth.id);
  const [editing, setEditing] = useState(false);
  // const users = useSelector((state) => state.users.users);
  // const user = users.find((user) => user.id === auth.id);
  const avatarRef = useRef(null);

  const navigate = useNavigate();

  const onClickRemoveAvatar = (e) => {
    e.preventDefault();
    setAvatar(null);
  };

  const [firstName, setFirstName] = useState(
    user && user.first_name ? user.first_name : 'First Name'
  );
  const [lastName, setLastName] = useState(
    user && user.last_name ? user.last_name : 'Last Name'
  );
  const [biography, setBiography] = useState(
    user && user.biography ? user.biography : 'Biography'
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
      <>
        <img
          style={{ maxWidth: 200 }}
          src={avatarRef.current?.value ? URL.createObjectURL(avatar) : avatar}
          alt=""
          crossOrigin="true"
        />
        <button onClick={onClickRemoveAvatar}>X</button>
      </>
    );
  }

  const onDeleteProfile = () => {
    try {
      axios
        .delete(`api/users/${auth.id}`)
        .then(() => dispatch(deleteUser(user.id)));
    } catch (err) {
      console.error('Failed to delete the post', err);
    }
    localStorage.removeItem('user');
    navigate('/register');
  };

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
        // navigate('/feed/profile');

        dispatch(editUser([auth.id, response.data.modifications]));
        setEditing(false);
        console.log([auth.id, response.data.modifications]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& > :not(style)': { m: 1 },
            }}
          >
            <TextField
              id="username"
              name="username"
              type="text"
              size="small"
              helperText="Username cannot be changed"
              placeholder={auth.username}
              disabled
            />

            <TextField
              id="email"
              name="email"
              size="small"
              helperText="Contact an admin to change"
              placeholder={auth.email}
              disabled
            />
            <input
              // label="First name"
              id="firstname"
              name="firstname"
              type="text"
              size="small"
              // helperText="Enter your first name"
              onChange={onFirstNameChanged}
              defaultValue={firstName}
            />
            {/* <input
            type="text"
            id="firstname"
            name="firstname"
            inputref={firstname}
            defaultValue={user.first_name}
          /> */}
            <input
              // label="Lastname"
              id="lastname"
              name="lastname"
              type="text"
              size="small"
              // helperText="Enter your family name"
              onChange={onLastNameChanged}
              defaultValue={lastName}
            />
            <input
              // label="Biography"
              id="biography"
              name="biography"
              type="text"
              size="small"
              // helperText="Write something about yourself"
              onChange={onBiographyChanged}
              defaultValue={biography}
            />

            <input
              ref={avatarRef}
              type="file"
              id="avatar"
              name="avatar"
              onInput={onAvatarChanged}
            />
            <div>{imgPreview}</div>

            {/* <TextField
            label="Password"
            type="password"
            helperText="Choose a password"
            id="password"
            name="password"
            size="small"
            value="******"
            inputRef={password}
            required
            disabled
          /> */}
            <Button type="submit" variant="contained">
              Save profile
            </Button>
          </Box>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& > :not(style)': { m: 1 },
            }}
          >
            {user && user.avatar ? (
              <Avatar sx={{ width: 100, height: 100 }}>
                <img
                  alt="avatar"
                  src={user.avatar}
                  crossOrigin="true"
                  style={{ maxWidth: 120 }}
                />
              </Avatar>
            ) : (
              <Avatar sx={{ width: 100, height: 100 }}>
                {' '}
                <img
                  alt="avatar"
                  height="100"
                  src={defaultAvatar}
                  crossOrigin="true"
                />
              </Avatar>
            )}
            <TextField
              // label="Username"
              id="username"
              name="username"
              size="small"
              helperText="Username cannot be changed"
              placeholder={auth.username}
              disabled
            />

            <TextField
              id="email"
              name="email"
              size="small"
              placeholder={auth.email}
              disabled
            />
            <TextField
              // label="First name"
              id="firstname"
              name="firstname"
              size="small"
              placeholder={firstName}
              disabled
            />
            {/* <input
            type="text"
            id="firstname"
            name="firstname"
            inputref={firstname}
            defaultValue={user.first_name}
          /> */}
            <TextField
              // label="Lastname"
              id="lastname"
              name="lastname"
              size="small"
              placeholder={lastName}
              disabled
            />
            <TextField
              // label="Biography"
              id="biography"
              name="biography"
              size="small"
              placeholder={biography}
              disabled
            />

            {/* <TextField
            label="Password"
            type="password"
            helperText="Choose a password"
            id="password"
            name="password"
            size="small"
            value="******"
            inputRef={password}
            required
            disabled
          />*/}
          </Box>
          <Button
            type="button"
            onClick={() => setEditing(!editing)}
            variant="contained"
          >
            Edit
          </Button>
          <p>
            {' '}
            Last updated at :{' '}
            {user && user.updated_at ? user.updated_at : 'Last Name'}
          </p>
        </form>
      )}
      <Button type="button" onClick={onDeleteProfile} variant="contained">
        Delete profile
      </Button>
    </div>
  );
};

export default EditProfile;
