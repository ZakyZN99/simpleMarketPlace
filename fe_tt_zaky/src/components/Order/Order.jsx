import React, { useEffect, useState } from 'react';
import orderService from '../../services/orderService';
import Sidebar from '../SideBar';
import OrderModal from './OrderModal';
import ConfirmModal from './ConfirmModal';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [editOrder, setEditOrder] = useState(null);
    const [deleteOrderId, setDeleteOrderId] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [action, setAction] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const { data } = await orderService.getAll();
        setOrders(data);
    };

    const handleAddOrder = () => {
        setEditOrder(null);
        setShowOrderModal(true);
    };

    const handleEditOrder = (order) => {
        setEditOrder(order);
        setShowOrderModal(true);
    };

    const handleDeleteOrder = (orderId) => {
        setDeleteOrderId(orderId);
        setAction('delete');
    };

    const handleSave = () => {
        setShowOrderModal(false);
        fetchOrders();
    };

    const handleCancel = () => {
        setShowOrderModal(false);
        setDeleteOrderId(null);
    };

    const handleConfirm = () => {
        fetchOrders();
        handleCancel();
    };

    return (
        <>
            <Sidebar />
            <div>
                <h2>Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order Code</th>
                            <th>Order Name</th>
                            <th>Order Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order.or_pd_id ? order.or_pd_id.pd_code : '-'}</td>
                                <td>{order.or_pd_id ? order.or_pd_id.pd_name : '-'}</td>
                                <td>{order.or_amount}</td>
                                <td>
                                    <button onClick={() => handleEditOrder(order)}>Edit</button>
                                    <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleAddOrder}>Add Order</button>
            </div>

            {showOrderModal && (
                <OrderModal
                    order={editOrder}
                    onCancel={handleCancel}
                    onSave={handleSave}
                />
            )}

            {deleteOrderId && (
                <ConfirmModal
                    orderId={deleteOrderId}
                    action={action}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
            )}
        </>
    );
};

export default Order;
