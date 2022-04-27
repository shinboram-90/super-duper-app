import './App.css';
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Feed from './pages/Feed';
import Missing from './pages/Missing';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import EditProfile from './components/profile/EditProfile';
import Profile from './components/profile/Profile';

import PostsList from './features/posts/PostsList';

import PostAuthor from './features/users/PostAuthor';

import RequireAuth from './components/auth/RequireAuth';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route element={<RequireAuth user={currentUser} />}> */}
        <Route path="/" element={<Navigate to="feed/posts" replace />} />
        <Route element={<RequireAuth />}>
          <Route path="feed" element={<Feed />}>
            <Route path="posts" element={<PostsList />} />
            <Route path="users/:id" element={<PostAuthor />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/edit" element={<EditProfile />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="logout" element={<Logout />} />
        {/* <Route path="/*" element={<Missing />} /> */}
        <Route path="/404" element={<Missing />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </Router>
  );
}
export default App;

// <Routes>
// <Route path="/" element={<Navigate to="/home" replace />} />
// <Route path="/home" element={<Home />} />
// <Route path="films" element={<Films />}>
//   <Route path="list" element={<FilmsList />} />
//   <Route path=":filmId" element={<FilmDetail />} />
// </Route>
// </Routes>
