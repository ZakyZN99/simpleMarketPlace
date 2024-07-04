import React from 'react';
import productService from '../../services/productService';

const ConfirmModal = ({ productId, action, onCancel, onConfirm }) => {
    const handleConfirm = async () => {
        try {
            if (action === 'delete') {
                await productService.remove(productId);
            } else if (action === 'order') {
                // Tambahkan logika pemesanan produk jika ada
            }
            onConfirm();
        } catch (error) {
            console.error(`Error during ${action}:`, error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Confirm {action === 'delete' ? 'Delete' : 'Order'} Product</h3>
                <p>Are you sure you want to {action} this product?</p>
                <button onClick={handleConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    );
};

export default ConfirmModal;