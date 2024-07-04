import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';
import categoryService from '../../services/categoryService';

const ProductModal = ({ product, onCancel, onSave }) => {
    const [formData, setFormData] = useState({
        pd_name: '',
        pd_code: '',
        pd_price: 0,
        pd_ct_id: ''
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const { data } = await categoryService.getAll();
        setCategories(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (product) {
                await productService.update(product._id, formData);
            } else {
                await productService.create(formData);
            }
            onSave();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{product ? 'Edit Product' : 'Add Product'}</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Product Name:
                        <input type="text" name="pd_name" value={formData.pd_name} onChange={handleChange} />
                    </label>
                    <label>
                        Product Code:
                        <input type="text" name="pd_code" value={formData.pd_code} onChange={handleChange} />
                    </label>
                    <label>
                        Product Price:
                        <input type="number" name="pd_price" value={formData.pd_price} onChange={handleChange} />
                    </label>
                    <label>
                        Product Category:
                        <select name="pd_ct_id" value={formData.pd_ct_id} onChange={handleChange}>
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.ct_name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
