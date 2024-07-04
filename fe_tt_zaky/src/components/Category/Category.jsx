import React, { useEffect, useState } from 'react';
import categoryService from '../../services/categoryService';
import Sidebar from '../SideBar';
import '../../assets/css/Category.css';
import EditCategory from './EditCategory';
import DeleteCategory from './DeleteCategory';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [editCategory, setEditCategory] = useState(null);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);

    let navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const { data } = await categoryService.getAll();
        setCategories(data);
    };

    const handleAddCategory = () => {
        navigate('/add-category');
    };

    const handleEdit = (category) => {
        setEditCategory(category);
    };

    const handleUpdateCategory = (updatedCategory) => {
        const updatedCategories = categories.map(cat => (cat._id === updatedCategory._id ? updatedCategory : cat));
        setCategories(updatedCategories);
    };

    const handleDelete = (categoryId) => {
        setDeleteCategoryId(categoryId);
    };

    const handleDeleteCategory = (deletedCategoryId) => {
        const updatedCategories = categories.filter(cat => cat._id !== deletedCategoryId);
        setCategories(updatedCategories);
    };

    const cancelEdit = () => {
        setEditCategory(null);
    };

    const cancelDelete = () => {
        setDeleteCategoryId(null);
    };

    return (
        <>
            <Sidebar />
            <div>
                <h2>Categories</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Category Code</th>
                            <th>Category Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category._id}>
                                <td>{category.ct_code}</td>
                                <td>{category.ct_name}</td>
                                <td>
                                    <button onClick={() => handleEdit(category)}>Edit</button>
                                    <button onClick={() => handleDelete(category._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type='button' onClick={handleAddCategory}>Add Category</button>
            </div>

            {editCategory && (
                <EditCategory
                    category={editCategory}
                    onCancel={cancelEdit}
                    onUpdate={handleUpdateCategory}
                />
            )}

            {deleteCategoryId && (
                <DeleteCategory
                    categoryId={deleteCategoryId}
                    onCancel={cancelDelete}
                    onDelete={handleDeleteCategory}
                />
            )}
        </>
    );
};

export default Category;