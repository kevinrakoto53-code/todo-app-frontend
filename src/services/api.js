import axios from 'axios';

const API_URL = 'https://todo-api-backend-h9ge.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Ajouter le token automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


// AUTH
export const register = (userData) => api.post('/auth/register', userData);
export const login = (userData) => api.post('/auth/login', userData);
export const getMe = () => api.get('/auth/me');

// TODOS
export const getTodos = (params) => api.get('/todos', { params });
export const getTodoById = (id) => api.get(`/todos/${id}`);
export const createTodo = (todoData) => api.post('/todos', todoData);
export const updateTodo = (id, todoData) => api.put(`/todos/${id}`, todoData);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
export const toggleTodo = (id) => api.patch(`/todos/${id}/toggle`);
export const getStats = () => api.get('/todos/stats');
export const searchTodos = (q) => api.get('/todos/search', { params: { q } });
export const filterTodos = (filters) => api.get('/todos/filter', { params: filters });

export default api;