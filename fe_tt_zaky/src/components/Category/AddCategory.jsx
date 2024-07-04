import React, { useState } from 'react';
import categoryService from '../../services/categoryService';
import Sidebar from '../SideBar';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const [formData, setFormData] = useState({
        ct_code: '',
        ct_name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await categoryService.create(formData);
            alert('Category added successfully!');
            // Optionally, redirect or update state after successful addition
            navigate('/categories')
        } catch (error) {
            console.error('Error adding category:', error);
            alert('Failed to add category. Please try again.');
        }
    };

    return (
        <>
        <Sidebar/>
        <div>
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="ct_code">Category Code:</label>
                    <input type="text" id="ct_code" name="ct_code" value={formData.ct_code} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="ct_name">Category Name:</label>
                    <input type="text" id="ct_name" name="ct_name" value={formData.ct_name} onChange={handleChange} required />
                </div>
                <button type="submit">Add Category</button>
            </form>
        </div>
        </>
    );
};

export default AddCategory;