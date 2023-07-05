import { ButtonBase, TableCell, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

const User = ({ user }) => {
  return (
    <TableRow>
      <TableCell >
        <ButtonBase sx={{ color: '#1565c0', textDecoration: 'underline' }} component={Link} to={`/users/${user.id}`}>
          {user.username}
        </ButtonBase>
      </TableCell>
      <TableCell>{user.blogs.length}</TableCell>
    </TableRow>
  );
};

export default User;