import { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser');
    loggedUser && setUser(JSON.parse(loggedUser));
  }, []);

  async function handleLogin(credentials) {
    try {
      const response = await loginService.login(credentials);
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(response)
      );
      setUser(response);
    } catch (err) {
      console.log(err);
      setNotification({
        message: 'wrong username or password',
        class: 'error',
      });
    }
  }

  function handleLogout() {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    blogService.setToken(null);
  }

  async function handleCreate(blog) {
    blogService.setToken(user.token);
    try {
      await blogService.create(blog);
      const response = await blogService.getAll();
      setBlogs(response);
      setNotification({
        message: `${blog.title} by ${blog.author} added`,
        class: 'success',
      });
      blogFormRef.current.toggleVisibility();
    } catch (err) {
      console.log(err);
      setNotification({
        message: 'failed to add blog',
        class: 'error',
      });
    }
  }

  async function handleLike(newBlog) {
    try {
      await blogService.update(newBlog);
      setBlogs(
        blogs.map((blog) =>
          blog.id !== newBlog.id ? blog : { ...blog, likes: newBlog.likes }
        )
      );
    } catch (err) {
      console.log(err);
      setNotification({
        message: 'failed to like blog',
        class: 'error',
      });
    }
  }

  async function handleDelete(id) {
    blogService.setToken(user.token);
    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setNotification({
        message: 'deletion successful',
        class: 'success',
      });
    } catch (err) {
      console.log(err);
      setNotification({
        message: 'deletion failed',
        class: 'error',
      });
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notif={notification} setNotification={setNotification} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification notif={notification} setNotification={setNotification} />
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        <h2>Create New</h2>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm handleCreate={handleCreate} />
        </Togglable>
        <BlogList
          blogs={blogs}
          handleLike={handleLike}
          currentUser={user}
          handleDelete={handleDelete}
        />
      </div>
    );
  }
};

export default App;
