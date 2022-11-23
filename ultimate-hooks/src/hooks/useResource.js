import { useState, useEffect } from 'react';
import axios from 'axios';

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const fetchResource = async () => {
    const response = await axios.get(baseUrl);
    setResources(response.data);
  };

  useEffect(() => {
    fetchResource();
  }, []);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources(resources.concat(response.data));
  };

  const update = async (id, resource) => {
    const response = await axios.put(`${baseUrl}/${id}`, resource);
    setResources(resources.map((r) => (r.id === id ? response.data : r)));
  };

  const deleteResource = async (id) => {
    await axios.delete(`${baseUrl}/${id}`);
    setResources(resources.filter((r) => r.id !== id));
  };

  return [resources, { create, update, delete: deleteResource }];
};

export default useResource;
