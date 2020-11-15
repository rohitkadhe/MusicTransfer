import axios from 'axios';
import { BASE_URL } from '../constants/strings';
const ax = axios.create({
  baseURL: BASE_URL,
});

export default ax;
