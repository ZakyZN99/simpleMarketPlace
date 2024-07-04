import React, { useState, useEffect } from 'react';
import orderService from '../../services/orderService';

const OrderModal = ({ product, onCancel, onSave }) => {
    const [qty, setQty] = useState(1);

    const handleIncrease = () => {
        setQty(prevQty => prevQty + 1);
    };

    const handleDecrease = () => {
        if (qty > 1) {
            setQty(prevQty => prevQty - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const or_amount = product.pd_price * qty;
        try {
            await orderService.create({
                or_pd_id: product.pd_code, // menggunakan pd_code sebagai or_pd_id
                or_amount: or_amount,
                or_qty: qty
            });
            onSave();
        } catch (error) {
            console.error('Error ordering product:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Order Product</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Product Name: {product.pd_name}
                    </label>
                    <label>
                        Product Code: {product.pd_code}
                    </label>
                    <label>
                        Product Price: {product.pd_price}
                    </label>
                    <label>
                        Quantity:
                        <div>
                            <button type="button" onClick={handleDecrease}>-</button>
                            <input type="number" value={qty} readOnly />
                            <button type="button" onClick={handleIncrease}>+</button>
                        </div>
                    </label>
                    <button type="submit">Order</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default OrderModal;
