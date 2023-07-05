import {  ListItem, ListItemButton } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
  };

  return (
    <ListItem>
      <ListItemButton sx={{ color: '#1a237e' }} LinkComponent={Link} to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </ListItemButton>
    </ListItem>
  );
};

export default Blog;
