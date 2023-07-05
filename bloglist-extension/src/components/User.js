import { Link } from "react-router-dom";

const User = ({ user }) => {
    return (
        <tr>
            <td> <Link to={`/users/${user.id}`}>{user.username}</Link></td>
            <td>{user.blogs.length}</td>
        </tr>
    );
}

export default User;