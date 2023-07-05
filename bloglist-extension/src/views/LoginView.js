import { useState } from 'react';
import { useDispatchUser, userLogin } from '../context/UserContext';
import loginService from '../services/login';
import { notify, useDispatchNotif } from '../context/NotifContext';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatchUser = useDispatchUser();
  const dispatchNotif = useDispatchNotif();

  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const response = await loginService.login({ username, password });
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(response)
      );
      dispatchUser(userLogin(response));
      navigate('/');
    } catch (err) {
      console.log(err);
      dispatchNotif(notify({
        message: 'wrong username or password',
        class: 'error',
      }));
    }
    setUsername('');
    setPassword('');
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
          Log in
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Sign In
            </Button>
          </Box>
        </Box>
        <Notification />
      </Container>
    </ThemeProvider>
  );
};

export default LoginView;