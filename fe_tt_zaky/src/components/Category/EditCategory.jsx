import React, { useState } from 'react';
import categoryService from '../../services/categoryService';

const EditCategory = ({ category, onCancel, onUpdate }) => {
    const [formData, setFormData] = useState({
        ct_code: category.ct_code,
        ct_name: category.ct_name
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedCategory = await categoryService.update(category._id, formData);
            onUpdate(updatedCategory.data); // Update state in parent component
            onCancel();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Edit Category</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Category Code:
                        <input type="text" name="ct_code" value={formData.ct_code} onChange={handleChange} />
                    </label>
                    <label>
                        Category Name:
                        <input type="text" name="ct_name" value={formData.ct_name} onChange={handleChange} />
                    </label>
                    <button type="submit">Update</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditCategory;