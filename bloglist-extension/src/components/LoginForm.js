import { useState } from 'react';
import { useDispatchUser, userLogin } from '../context/UserContext';
import loginService from '../services/login';
import { notify, useDispatchNotif } from '../context/NotifContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
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
    <form onSubmit={login}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
