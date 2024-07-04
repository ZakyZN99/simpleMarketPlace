import React, { useEffect, useState } from 'react';
import productService from '../../services/productService';
import '../../assets/css/Product.css';
import Sidebar from '../SideBar';
import ProductModal from './ProductModal';
import ConfirmModal from './ConfirmModal';
import OrderModal from './OrderModal';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [orderProduct, setOrderProduct] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const { data } = await productService.getAll();
        setProducts(data.data);
    };

    const handleAddProduct = () => {
        setEditProduct(null);
        setShowProductModal(true);
    };

    const handleEditProduct = (product) => {
        setEditProduct(product);
        setShowProductModal(true);
    };

    const handleDeleteProduct = (productId) => {
        setDeleteProductId(productId);
    };

    const handleOrderProduct = (product) => {
        setOrderProduct(product);
        setShowOrderModal(true);
    };

    const handleSave = () => {
        setShowProductModal(false);
        setShowOrderModal(false);
        fetchProducts();
    };

    const handleCancel = () => {
        setShowProductModal(false);
        setShowOrderModal(false);
        setDeleteProductId(null);
        setOrderProduct(null);
    };

    const handleConfirm = () => {
        fetchProducts();
        handleCancel();
    };

    return (
        <>
            <Sidebar />
            <div>
                <h2>Products</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Code</th>
                            <th>Product Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.pd_name}</td>
                                <td>{product.pd_code}</td>
                                <td>{product.pd_price}</td>
                                <td>
                                    <button onClick={() => handleEditProduct(product)}>Edit</button>
                                    <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                    <button onClick={() => handleOrderProduct(product)}>Order</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleAddProduct}>Add Product</button>
            </div>

            {showProductModal && (
                <ProductModal
                    product={editProduct}
                    onCancel={handleCancel}
                    onSave={handleSave}
                />
            )}

            {showOrderModal && (
                <OrderModal
                    product={orderProduct}
                    onCancel={handleCancel}
                    onSave={handleSave}
                />
            )}

            {deleteProductId && (
                <ConfirmModal
                    productId={deleteProductId}
                    action="delete"
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
            )}
        </>
    );
};

export default Product;
