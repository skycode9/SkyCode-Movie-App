import axios from 'axios';

const baseUrl = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
  },
});

export default baseUrl;
