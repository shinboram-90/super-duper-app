import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import axios from '../../api/axios';

const Profile = () => {
  const { auth } = useAuth();
  const myId = auth.id;

  console.log(auth);

  const [profile, setProfile] = useState();

  const handleClick = async () => {
    const response = await axios.put(`/api/users/${auth.id}`);
    // console.log(response.data.currentUser[0]);
    setProfile(response.data);
  };

  const fetchProfilePosts = async (myId) => {
    try {
      const response = await axios.get(`/api//profile/${myId}`);
      if (response) {
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfilePosts(myId);
  }, [myId]);

  if (!auth) {
    return <Navigate replace to="/login" />;
  }
  console.log(auth);
  return (
    <>
      <div>My Profile</div>
      <p>username: {auth.username}</p>
      <p>email: {auth.email}</p>

      <img alt="user avatar" src={auth.avatar} crossOrigin="true" />
      <button onClick={handleClick}>Edit Profile</button>
    </>
  );
};

export default Profile;
