import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

import logoGroupomania from '../assets/logoGroupomania.svg';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { Divider, ListItemIcon } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
  const { auth } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('/api/logout');
      localStorage.removeItem('user');

      navigate('/logout');
    } catch (err) {
      console.error(err);
    }
  };

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <nav>
      {/* <Box
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ minWidth: 100, flexShrink: 1 }}>
          <Link to="/">Feed</Link>
        </Typography>
        <Typography sx={{ minWidth: 100, flexShrink: 1 }}>
          <Link to="/users">Users</Link>
        </Typography>
     */}

      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <Link to="/">
                <img alt="logo" src={logoGroupomania} height="25" />
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <Link to="/">Feed</Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <Link to="/dashboard">Dashboard</Link>
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              <Link to="/">
                <img alt="logo" src={logoGroupomania} height="25" />
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to="/">Feed</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Users's avatar"
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {auth ? (
                  <span>
                    <MenuItem>
                      <Avatar /> <Link to="profile">Profile</Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      <Link to="profile">Settings</Link>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <span onClick={handleLogout}>Logout</span>
                    </MenuItem>
                  </span>
                ) : (
                  <span>
                    <MenuItem>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      <Link to="/login">Login</Link>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <Link to="/register">Register</Link>
                    </MenuItem>
                  </span>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </nav>
  );
};

export default Navbar;
