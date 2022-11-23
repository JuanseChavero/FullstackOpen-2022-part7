import Logout from '@mui/icons-material/Logout';
import { userLogout } from '../library/reducers/loggedUserReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Login } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NavItem = ({ path, title }) => {
  return (
    <NavLink
      to={path}
      style={({ isActive }) => ({
        color: isActive ? 'var(--color-secondary)' : 'var(--color-primary)',
        textDecoration: isActive ? 'underline' : 'none',
        textUnderlineOffset: 5,
      })}
    >
      <Button
        variant="text"
        color="inherit"
        style={{ color: 'inherit' }}
        disableRipple
      >
        {title}
      </Button>
    </NavLink>
  );
};

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const user = useSelector((state) => state.user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    // Close the menu
    handleClose();

    // Logout the user
    dispatch(userLogout());

    // Redirect him to the login page
    navigate('/login');
  };

  const menuStyle = {
    elevation: 0,
    sx: {
      mt: 0.8,
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      bgcolor: '#0A1929',
      minWidth: 180,
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 16,
        width: 10,
        height: 10,
        bgcolor: '#0A1929',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
  };

  return (
    <Paper elevation={4} sx={{ margin: '15px 0', background: '#334155' }}>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '7.5px 15px',
        }}
      >
        {/* Nav */}
        <Stack direction="row" id="nav-routes">
          <NavItem path="/" title="Home" />
          <NavItem path="/blogs" title="Blogs" />
          <NavItem path="/users" title="Users" />
        </Stack>

        {/* Session Info */}
        {user ? (
          <div>
            <Tooltip title="Account">
              <IconButton
                onClick={handleClick}
                size="small"
                id="account-button"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#0ea5e9' }}>
                  {user.name[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={menuStyle}
            >
              <ListItem sx={{ paddingY: 0 }}>
                <Typography variant="button" component="span">
                  {user.name}
                </Typography>
              </ListItem>
              <Divider sx={{ marginY: 1 }} />
              <MenuItem onClick={handleLogout} id="logout-button">
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            id="login-nav"
            type="button"
            variant="outlined"
            onClick={handleLogin}
            endIcon={<Login />}
          >
            LOGIN
          </Button>
        )}
      </nav>
    </Paper>
  );
};
