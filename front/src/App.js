import './App.css';
import useAuth from './hooks/useAuth';
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
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

import Dashboard from './components/admin/Dashboard';
import AdminRoute from './components/admin/AdminRoute';
import RequireAuth from './components/auth/RequireAuth';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route element={<RequireAuth user={currentUser} />}> */}
        <Route path="/" element={<Navigate to="feed/posts" replace />} />
        <Route path="feed" element={<Feed />}>
          <Route path="posts" element={<PostsList />} />
          {/* <Route element={<RequireAuth />}> */}
          <Route path="users/:id" element={<PostAuthor />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<Missing />} />
        {/* <Route path="dashboard" element={<Dashboard />} /> */}

        <Route
          path="dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
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
