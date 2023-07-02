import Blog from './Blog';
import PropTypes from 'prop-types';

const BlogList = ({ blogs, handleLike, currentUser, handleDelete }) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleLike: PropTypes.func.isRequired,
  };

  return (
    <>
      {blogs
        .toSorted((a, b) => -a.likes + b.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            currentUser={currentUser}
            handleDelete={handleDelete}
          />
        ))}
    </>
  );
};

export default BlogList;
