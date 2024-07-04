import React, { useState, useEffect } from 'react';
import orderService from '../../services/orderService';

const OrderModal = ({ order, onCancel, onSave }) => {
    const [formData, setFormData] = useState({
        or_pd_id: '',
        or_amount: 0,
        or_qty: 1
    });

    useEffect(() => {
        if (order) {
            setFormData({
                or_pd_id: order.or_pd_id ? order.or_pd_id.pd_code : '',
                or_amount: order.or_amount,
                or_qty: order.or_qty
            });
        }
    }, [order]);

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
            if (order) {
                await orderService.update(order._id, formData);
            } else {
                await orderService.create(formData);
            }
            onSave();
        } catch (error) {
            console.error('Error saving order:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{order ? 'Edit Order' : 'Add Order'}</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Order Product Code:
                        <input type="text" name="or_pd_id" value={formData.or_pd_id} onChange={handleChange} />
                    </label>
                    <label>
                        Order Amount:
                        <input type="number" name="or_amount" value={formData.or_amount} onChange={handleChange} />
                    </label>
                    <label>
                        Order Quantity:
                        <input type="number" name="or_qty" value={formData.or_qty} onChange={handleChange} />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default OrderModal;
