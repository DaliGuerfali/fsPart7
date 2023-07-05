import { useQueryClient } from "react-query";
import { useMatch } from "react-router-dom";

const UserInfo = () => {
    const queryClient = useQueryClient();
    const userMatch = useMatch('/users/:id');
    const user = userMatch ? queryClient.getQueryData('users')?.find(u => u.id === userMatch.params.id) : null; 
  
    if(!user) return null;
    
    return (
        <>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
            {
                user.blogs.map(blog => <li key={blog.id} >{blog.title}</li>)
            }
            </ul>
        </>
    );
}

export default UserInfo;