import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const { data } = await axios.post(baseUrl, newObject, config);
  return data;
};

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  return await axios.delete(`${baseUrl}/${id}`, config);
};

export default { setToken, getAll, create, update, remove };
