import axios from "axios";

const API_URL = 'http://localhost:3000/api/';

const register = (data) => axios.post(`${API_URL}/register`, data);
const login = (data) => axios.post(`${API_URL}/login`, data);
const logout = () => localStorage.removeItem('user');
const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

export default {
    register,
    login,
    logout,
    getCurrentUser,
};