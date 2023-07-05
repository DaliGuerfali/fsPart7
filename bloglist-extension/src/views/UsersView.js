import { useQuery } from "react-query";
import userService from "../services/userService";
import User from "../components/User";

const UsersView = () => {
    const usersResult = useQuery('users', userService.getAll, {
        refetchOnWindowFocus: false
    });

    if(usersResult.isLoading) {
        return <p>Loading users...</p>
    }

    const users = usersResult.data;

    return (
        <>
        <h2>Users</h2>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => <User key={user.id} user={user}/>)
                }
            </tbody>
        </table>
        </>
    );
}

export default UsersView;