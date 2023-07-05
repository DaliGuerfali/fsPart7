import { useMutation, useQueryClient } from "react-query";
import { notify, useDispatchNotif } from "../context/NotifContext";
import { useUser } from "../context/UserContext";
import blogService from "../services/blogs";
import { useMatch, useNavigate } from "react-router-dom";
import Comments from "../components/Comments";

const BlogInfo = () => {
    const queryClient = useQueryClient();
    const blogMatch = useMatch('/blogs/:id');
    const blog = blogMatch ? queryClient.getQueryData('blogs')?.find(b => b.id === blogMatch.params.id) : null;
    
    const navigate = useNavigate();
    
    const currentUser = useUser();
    
    const dispatchNotif = useDispatchNotif();
    
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
      },
      onSettled: () => {
        navigate('/');
      }
    });
    
    if(!blog) return null;
    
    function likeBlog() {
      likeMutation.mutate({ ...blog, likes: blog.likes + 1 });
    }
    
    function removeBlog() {
      if (window.confirm(`Remove ${blog.title} blog ?`)) {
        blogService.setToken(currentUser.token);
        deleteMutation.mutate(blog.id);
      }
    }
    
    return (
        <div>
            <h2>{blog.title} by {blog.author}</h2>
            <a href={blog.url}>{blog.url}</a>
            <p>
              likes: {blog.likes}
              <button id="likeBtn" onClick={likeBlog} >
                like
              </button>
            </p>
            <p>added by {blog.user.name}</p>
            {blog.user.username === currentUser.username ? (
              <button id="removeBtn" onClick={removeBlog}>
                remove
              </button>
            ) : null}
            <Comments id={blog.id} />
        </div>
    );
}

export default BlogInfo;