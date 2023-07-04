import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import { notify, useDispatchNotif } from '../context/NotifContext';
import { useUser } from '../context/UserContext';

const Blog = ({ blog }) => {
  const [details, setDetails] = useState(false);
  const dispatchNotif = useDispatchNotif();

  const currentUser = useUser();

  const queryClient = useQueryClient();

  const likeMutation = useMutation(blogService.update, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs');
      queryClient.setQueryData('blogs', blogs.map((b) =>
        b.id !== newBlog.id ? b : { ...b, likes: newBlog.likes }
      ));
    },
    onError: (error) => {
      console.log(error);
      dispatchNotif(notify({
        message: 'failed to like blog',
        class: 'error',
      }));
    }
  });

  const deleteMutation = useMutation(blogService.deleteBlog, {
    onSuccess: () => {
      const blogs = queryClient.getQueryData('blogs');
      queryClient.setQueryData('blogs', blogs.filter((b) => b.id !== blog.id));
      dispatchNotif(notify({
        message: 'deletion successful',
        class: 'success',
      }));
    },
    onError: (error) => {
      console.log(error);
      dispatchNotif(notify({
        message: 'deletion failed',
        class: 'error',
      }));
    }
  });

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  function toggleDetails() {
    setDetails(!details);
  }

  function likeBlog() {
    likeMutation.mutate({ ...blog, likes: blog.likes + 1 });
  }

  function removeBlog() {
    if (window.confirm(`Remove ${blog.title} blog ?`)) {
      blogService.setToken(currentUser.token);
      deleteMutation.mutate(blog.id);
    }
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
  };

  return (
    <div className="blog" style={blogStyle}>
      <div className="title">
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>view</button>
      </div>
      <div
        className="details"
        style={details ? { display: '' } : { display: 'none' }}
      >
        <a href={blog.url}>{blog.url}</a>
        <p>
          likes: {blog.likes}
          <button id="likeBtn" onClick={likeBlog}>
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        {blog.user.username === currentUser.username ? (
          <button id="removeBtn" onClick={removeBlog}>
            remove
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
