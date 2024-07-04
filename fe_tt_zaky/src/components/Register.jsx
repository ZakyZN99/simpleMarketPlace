import React, { useState } from 'react';
import authService from '../services/authServices';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        us_name: '',
        us_email: '',
        us_password: '',
        us_address: '',
        us_phone_number: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    let navigate  = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register(formData);
            alert('Registration successful!');
            navigate('/')
            // Optionally, redirect to login page or other page after successful registration
        } catch (error) {
            console.error('Error registering:', error);
            alert('Registration failed. Please try again.');
        }
    };
    const handleLogin = () =>{
        navigate('/')
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="us_name">Name:</label>
                    <input type="text" id="us_name" name="us_name" value={formData.us_name} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="us_email">Email:</label>
                    <input type="email" id="us_email" name="us_email" value={formData.us_email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="us_password">Password:</label>
                    <input type="password" id="us_password" name="us_password" value={formData.us_password} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="us_address">Address:</label>
                    <input type="text" id="us_address" name="us_address" value={formData.us_address} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="us_phone_number">Phone Number:</label>
                    <input type="text" id="us_phone_number" name="us_phone_number" value={formData.us_phone_number} onChange={handleChange} />
                </div>
                <button type="submit">Register</button>
            </form>
            <button type="submit" onClick={handleLogin}>Login</button>

        </div>
    );
};

export default Register;