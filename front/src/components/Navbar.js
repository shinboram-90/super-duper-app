import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

const Navbar = () => {
  // const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('/api/logout');
      localStorage.removeItem('auth');

      navigate('/logout');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/feed">Feed</Link>
            </li>
            <li>
              <Link to="/feed/new">Add a post</Link>
            </li>
            {/* <li>
              <Link to="/edit/:postId">Edit Post</Link>
            </li> */}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/feed/users">Users</Link>
            </li>
          </ul>
          <button type="button" onClick={handleLogout}>
            Log out
          </button>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
