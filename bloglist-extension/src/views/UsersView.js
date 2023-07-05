import { useQuery } from 'react-query';
import userService from '../services/userService';
import User from '../components/User';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const UsersView = () => {
  const usersResult = useQuery('users', userService.getAll, {
    refetchOnWindowFocus: false
  });

  if(usersResult.isLoading) {
    return <p>Loading users...</p>;
  }

  const users = usersResult.data;

  return (
    <>
      <h2>Users</h2>
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users.map(user => <User key={user.id} user={user}/>)
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersView;