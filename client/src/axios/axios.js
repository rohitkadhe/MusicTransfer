import axios from 'axios';
const ax = axios.create({
  baseURL: 'http://localhost:5433/',
});

export default ax;
