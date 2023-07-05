import { useContext } from "react";
import UserContext, { userLogout } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import blogService from "../services/blogs";
import Notification from "./Notification";

const Navbar = () => {
    const [user, dispatchUser] = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogout() {
        window.localStorage.removeItem('loggedBlogAppUser');
        dispatchUser(userLogout());
        blogService.setToken(null);
        navigate('/');
    }

    const navBarStyle = {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      backgroundColor: '#d6d6d6',
      padding: 5
    }

    return (
            user ? 
            <div>
              <div style={navBarStyle}>
                <Link to="/" >blogs</Link>
                <Link to="/users" >users</Link>
                <p>
                  {user.name} logged in
                </p>
                <button onClick={handleLogout}>logout</button>
              </div>
              <Notification />
              <h2>blog app</h2>
            </div> :
            null
    );
}

export default Navbar;