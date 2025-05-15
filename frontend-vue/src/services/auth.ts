import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

export async function signup(name: string, email: string, password: string) {
  return axios.post(`${API_URL}/signup`, { name, email, password });
}
