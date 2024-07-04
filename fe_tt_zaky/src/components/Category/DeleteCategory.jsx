import React from 'react';
import categoryService from '../../services/categoryService';

const DeleteCategory = ({ categoryId, onCancel, onDelete }) => {

    const handleDelete = async () => {
        try {
            await categoryService.remove(categoryId);
            onDelete(categoryId); // Update state in parent component
            onCancel();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Confirm Delete Category</h3>
                <p>Are you sure you want to delete this category?</p>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteCategory;