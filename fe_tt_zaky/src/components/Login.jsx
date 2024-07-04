import React, { useState } from 'react';
import authService from '../services/authServices';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        const { data } = await authService.login({ us_email: email, us_password: password });
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/products');
        } catch (error) {
        console.error('Login failed:', error);
        }
    };
    const handleregister = () =>{
        navigate('/register')
    }

    return (
        <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
        <button type="submit" onClick={handleregister}>Register</button>

        </div>
    );
};

export default Login;