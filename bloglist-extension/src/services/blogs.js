import axios from 'axios';
const baseUrl = '/api/blogs';

let auth = null;

const setToken = (newToken) => {
  auth = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blog) => {
  const config = {
    headers: {
      Authorization: auth,
    },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, {
    ...blog,
    user: blog.user.id,
  });
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: auth,
    },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const postComment = async (comment) => {
  const response = await axios.post(`${baseUrl}/${comment.id}/comments`, { content: comment.content });
  return response.data;
};

export default { getAll, create, setToken, update, deleteBlog, postComment };
