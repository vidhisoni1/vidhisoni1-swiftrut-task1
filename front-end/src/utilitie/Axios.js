import axios from 'axios';

// Create a base instance with the API URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000'

});

export default axiosInstance;
