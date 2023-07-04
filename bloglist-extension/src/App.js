import { useEffect, useContext } from 'react';
import blogService from './services/blogs';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import UserContext, { userLogin, userLogout } from './context/UserContext';

const App = () => {
  const [user, dispatchUser] = useContext(UserContext);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser');
    loggedUser && dispatchUser(userLogin(JSON.parse(loggedUser)));
  }, []);

  function handleLogout() {
    window.localStorage.removeItem('loggedBlogAppUser');
    dispatchUser(userLogout());
    blogService.setToken(null);
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        <h2>Create New</h2>
        <BlogForm />
        <BlogList />
      </div>
    );
  }
};

export default App;
