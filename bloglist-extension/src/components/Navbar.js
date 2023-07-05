import { useContext } from 'react';
import UserContext, { userLogout } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import blogService from '../services/blogs';
import Notification from './Notification';
import { AppBar, Button, Toolbar, Typography, } from '@mui/material';

const Navbar = () => {
  const [user, dispatchUser] = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.removeItem('loggedBlogAppUser');
    dispatchUser(userLogout());
    blogService.setToken(null);
    navigate('/');
  }

  return (

    user ?
      <>
        <AppBar position="static" sx={{ mb: 5 }} >
          <Toolbar>
            <Button color="inherit" LinkComponent={Link} to="/" >
                    Blogs
            </Button>
            <Button color="inherit" LinkComponent={Link} to="/users">
                    Users
            </Button>
            <Typography>
              {user.name} Logged In
            </Typography>
            <Button onClick={handleLogout} color="inherit" >
                      Log out
            </Button>
          </Toolbar>
        </AppBar>
        <Notification />
      </>
      : null

  );
};


export default Navbar;