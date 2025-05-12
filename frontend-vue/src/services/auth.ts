import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

export async function login(email: string, password: string) {
  const response = await axios.post(`${API_URL}/signin`, { email, password });
  const { token } = response.data;
  localStorage.setItem('token', token);
  return token;
}

export async function signup(name: string, email: string, password: string) {
  return axios.post(`${API_URL}/signup`, { name, email, password });
}

export function logout() {
  localStorage.removeItem('token');
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}
