import { List, ListItem, Paper } from '@mui/material';
import { useQueryClient } from 'react-query';
import { useMatch } from 'react-router-dom';

const UserInfo = () => {
  const queryClient = useQueryClient();
  const userMatch = useMatch('/users/:id');
  const user = userMatch ? queryClient.getQueryData('users')?.find(u => u.id === userMatch.params.id) : null;

  if(!user) return null;

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <List component={Paper} sx={{ maxWidth: 500 }}>
        {
          user.blogs.map(blog => <ListItem divider key={blog.id} >{blog.title}</ListItem>)
        }
      </List>
    </>
  );
};

export default UserInfo;