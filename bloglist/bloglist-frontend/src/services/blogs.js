import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { 'Content-Type': 'application/json', Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, updatedObject) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config);
  return response.data;
};

const addComment = async (blogId, message) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  const response = await axios.post(
    `${baseUrl}/${blogId}/comments/`,
    { message },
    config,
  );
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getByUserId = async (userId) => {
  const response = await axios.get(`${baseUrl}/user/${userId}`);
  return response.data;
};

const blogService = {
  getAll,
  create,
  update,
  addComment,
  remove,
  getById,
  getByUserId,
  setToken,
};

export default blogService;
