import axios from "axios";

const baseUrl = "/api/persons";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const create = async (newObject) => {
  const request = await axios.post(baseUrl, newObject);
  return request.data;
};

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject);
  return request.data;
};

const remove = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`);
  return request.data;
};
export { getAll, create, update, remove };
