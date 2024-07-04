const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/OrderController');

const router = require('express').Router();

router.post('/orders', createOrder)
router.get('/orders', getAllOrders)
router.get('/orders/:id', getOrderById)
router.put('/orders/:id', updateOrder)
router.delete('/orders/:id', deleteOrder)

module.exports = router;