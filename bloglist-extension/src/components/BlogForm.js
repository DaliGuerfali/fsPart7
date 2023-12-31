import { useRef, useState } from 'react';
import blogService from '../services/blogs';
import { useMutation, useQueryClient } from 'react-query';
import { notify, useDispatchNotif } from '../context/NotifContext';
import  { useUser } from '../context/UserContext';
import Togglable from './Togglable';
import { Button, Stack, TextField } from '@mui/material';


const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const toggleRef = useRef();

  const user = useUser();

  const dispatchNotif = useDispatchNotif();

  const queryClient = useQueryClient();

  const createBlogMutation = useMutation(blogService.create, {
    onSuccess: (blog) => {
      queryClient.invalidateQueries('blogs');
      toggleRef.current.toggleVisibility();
      dispatchNotif(notify({
        message: `${blog.title} by ${blog.author} added`,
        class: 'success',
      }));
    },
    onError: (error) => {
      console.log(error);
      dispatchNotif(notify({
        message: 'failed to add blog',
        class: 'error',
      }));
    }
  });

  function createBlog(e) {
    e.preventDefault();
    blogService.setToken(user.token);

    createBlogMutation.mutate({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <Togglable buttonLabel="create new blog" ref={toggleRef}>
      <form onSubmit={createBlog}>
        <Stack spacing={2} sx={{ maxWidth: 500 }}>
          <TextField
            variant="filled"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
          />
          <TextField
            variant="filled"
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            name="author"
          />
          <TextField
            variant="filled"
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            name="url"
          />
          <Button variant="contained" type="submit">create</Button>
        </Stack>
      </form>
    </Togglable>
  );
};

export default BlogForm;
