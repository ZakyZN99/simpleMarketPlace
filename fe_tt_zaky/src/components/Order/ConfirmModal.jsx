import React from 'react';
import orderService from '../../services/orderService';

const ConfirmModal = ({ orderId, action, onCancel, onConfirm }) => {
    const handleConfirm = async () => {
        try {
            if (action === 'delete') {
                await orderService.remove(orderId);
            }
            onConfirm();
        } catch (error) {
            console.error(`Error ${action}ing order:`, error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Confirm {action.charAt(0).toUpperCase() + action.slice(1)}</h3>
                <p>Are you sure you want to {action} this order?</p>
                <button onClick={handleConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    );
};

export default ConfirmModal;
