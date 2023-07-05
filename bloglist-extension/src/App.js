import { useEffect, useContext } from 'react';
import UserContext, { userLogin } from './context/UserContext';
import UsersView from './views/UsersView';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserInfo from './views/UserInfo';
import LoginView from './views/LoginView';
import BlogsView from './views/BlogsView';
import Navbar from './components/Navbar';
import BlogInfo from './views/BlogInfo';

const App = () => {
  const [user, dispatchUser] = useContext(UserContext);
  
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser');
    loggedUser && dispatchUser(userLogin(JSON.parse(loggedUser)));
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ 
          user !== null ?
          <BlogsView /> : 
          <Navigate replace to="/login" />
        } />
        <Route path="/login" element={
          user === null ? 
          <LoginView /> : 
          <Navigate replace to="/" />
        } />
        <Route path="/users" element={ 
          user !== null ?
          <UsersView /> :
          <Navigate replace to="/login" />
        } />
        <Route path="/users/:id" element={<UserInfo /> } />
        <Route path="/blogs/:id" element={<BlogInfo />} />
      </Routes>
      </>
  );
};

export default App;
