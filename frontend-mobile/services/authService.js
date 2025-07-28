import axios from 'axios';

const API_URL = 'http://192.168.1.5:8000/api-token-auth/';

export async function login({ username, password }) {
  try {
    const res = await axios.post(API_URL, { username, password });
    return res.data.token; // <-- Guarda este token
  } catch (err) {
    throw err.response?.data || err.message;
  }
}
