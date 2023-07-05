import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import { notify, useDispatchNotif } from '../context/NotifContext';
import { Button, List, ListItem, Paper, TextField } from '@mui/material';

const Comments = ({ id }) => {
  const [comment, setComment] = useState('');

  const queryClient = useQueryClient();
  const comments = queryClient.getQueryData('blogs')?.find(blog => blog.id === id)?.comments;


  const dispatchNotif = useDispatchNotif();

  const commentMutation = useMutation(blogService.postComment, {
    onSuccess: (newComment) => {
      const blogs = queryClient.getQueryData('blogs');
      queryClient.setQueryData('blogs', blogs.map(blog => blog.id !== id ? blog :
        { ...blog, comments: blog.comments.concat(newComment) }));
    },
    onError: (error) => {
      console.log(error);
      dispatchNotif(notify({
        message: 'failed to add comment',
        class: 'error'
      }));
    },
    onSettled: () => {
      setComment('');
    }
  });

  if(!comments) return null;

  async function handleComment(e) {
    e.preventDefault();
    commentMutation.mutate({ id,  content: comment });
  }

  return (
    <>
      <h3>Comments</h3>
      <form onSubmit={handleComment}  style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 10
      }}>
        <TextField variant="outlined" value={comment} onChange={(e) => setComment(e.target.value)}/>
        <Button variant="contained" type="submit">add comment</Button>
      </form>

      <List component={Paper} sx={{ maxWidth: 500, mt: 5 }}>
        {
          comments.map(comment =>
            <ListItem divider key={comment.id}>{comment.content}</ListItem>)
        }
      </List>
    </>
  );
};

export default Comments;