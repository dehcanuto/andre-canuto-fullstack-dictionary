import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

export async function login(email: string, password: string) {
  const response = await axios.post(`${API_URL}/signin`, { email, password });
  const { access_token } = response.data;
  localStorage.setItem('token', access_token);
  return access_token;
}

export async function signup(email: string, password: string) {
  return axios.post(`${API_URL}/signup`, { email, password });
}

export function logout() {
  localStorage.removeItem('token');
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}
