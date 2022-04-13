import './App.css';

import useAuth from './hooks/useAuth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import PostsList from './components/post/PostsList';

import Dashboard from './components/admin/Dashboard';
import AdminRoute from './components/admin/AdminRoute';
import RequireAuth from './components/auth/RequireAuth';

function App() {
  const { auth } = useAuth();
  console.log(auth);

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
        {/* <Route element={<PrivateRoute user={currentUser} />}> */}
        <Route path="/" element={<PostsList />} />
        <Route path="new" element={<AddPostForm />} />
        <Route path="edit/:postId" element={<EditPostForm />} />
        <Route path="users" element={<UserList />}>
          <Route path=":id" element={<UserPage />} />
        </Route>
        {/* </Route>
        </Route> */}
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<Missing />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* <Route
          path="dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}
export default App;
