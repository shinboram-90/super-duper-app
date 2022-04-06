import './App.css';
import { useContext } from 'react';
import AuthContext from './context/AuthProvider';
import {
  useNavigate,
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
import Profile from './components/profile/Profile';

import AddPostForm from './components/post/AddPostForm';
import EditPostForm from './components/post/EditPostForm';
import UserPage from './components/user/UserPage';
import UserList from './components/user/UserList';
import PostList from './components/post/PostList';

import Dashboard from './components/admin/Dashboard';
import AdminRoute from './components/admin/AdminRoute';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate;
  return (
    <Router>
      <Routes>
        {/* <Route
          path="/"
          element={
            <React.Fragment>
              <AddPostForm />
              <PostList />
            </React.Fragment>
          }
        /> */}
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/" element={<PostList />}>
            <Route path="new" element={<AddPostForm />} />
            <Route path="edit/:postId" element={<EditPostForm />} />
            <Route path="users" element={<UserList />}>
              <Route path=":id" element={<UserPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<Missing />} />

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
