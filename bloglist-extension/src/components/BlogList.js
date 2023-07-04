import { useQuery } from 'react-query';
import Blog from './Blog';
import blogService from '../services/blogs';

const BlogList = () => {
  const blogResult = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false
  });

  if(blogResult.isLoading) {
    return <p>Loading Blogs...</p>;
  }

  const blogs = blogResult.data;

  return (
    <>
      {blogs
        .toSorted((a, b) => -a.likes + b.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
    </>
  );
};

export default BlogList;
