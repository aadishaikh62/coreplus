import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5279', // Replace with your actual backend API URL
});

export default instance;
