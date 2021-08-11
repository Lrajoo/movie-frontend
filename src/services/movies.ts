import axios from 'axios';

const baseUrl = 'https://moviesdb-backend.herokuapp.com/api/movies';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAll };
