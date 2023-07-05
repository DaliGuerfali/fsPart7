import { useQuery } from 'react-query';
import Blog from './Blog';
import blogService from '../services/blogs';
import { Container, Divider, List, Paper } from '@mui/material';

const BlogList = () => {
  const blogResult = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false
  });

  if(blogResult.isLoading) {
    return <p>Loading Blogs...</p>;
  }

  const blogs = blogResult.data;

  return (
    <List sx={{ width: '100%', maxWidth: 500 }}>
      <Container component={Paper} sx={{ bgcolor: '#c5cae9' }} >
        {blogs
          .toSorted((a, b) => -a.likes + b.likes)
          .map((blog, i) => (
            <div key={blog.id}>
              <Blog
                blog={blog}
              />
              {i !== blogs.length - 1 ?
                <Divider light/> : null}
            </div>
          )
          )}
      </Container>
    </List>
  );
};

export default BlogList;
