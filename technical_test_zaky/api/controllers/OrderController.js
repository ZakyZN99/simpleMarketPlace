const OrderModel = require('../model/OrderModel');
const ProductModel = require('../model/ProductModel');

const createOrder = async (req, res, next) => {
    try {
        let payload = req.body;

        if(payload.or_pd_id){
            let or_pd_id = await ProductModel.findOne({pd_code: {$regex: payload.or_pd_id, $options: 'i'}});
                if(or_pd_id){
                    payload = {...payload, or_pd_id: or_pd_id._id};
                }else{
                    delete payload.or_pd_id
                }
        }
        let order = new OrderModel(payload);
        
        await order.save()
        return res.json(order)
    } catch (err) {
        next(err);
    }
}

const updateOrder = async (req, res, next) => {
    try {
        let payload = req.body;
        let {id} = req.params

        // Update karna ada relasi dengan product
        if(payload.or_pd_id){
            let or_pd_id = await ProductModel.findOne({pd_code: {$regex: payload.or_pd_id, $options: 'i'}});
                if(or_pd_id){
                    payload = {...payload, or_pd_id: or_pd_id._id};
                }else{
                    delete payload.or_pd_id
                }
        }


        let order =  await OrderModel.findByIdAndUpdate(id, payload,{
            new: true,
            runValidators: true    
                })
        return res.json(order);
    } catch (err) {
        next(err);
    }
}

const deleteOrder = async (req, res, next) => {
    try {
        const order = await OrderModel.findByIdAndDelete({_id: req.params.id});
        if (!order) {
            return res.status(404).json({
                error: 1,
                message: 'Order tidak ditemukan'
            });
        }

        return res.json({
            message: 'Order berhasil dihapus'
        });
    } catch (err) {
        next(err);
    }
}

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await OrderModel.find().populate('or_pd_id');
        return res.json(orders);
    } catch (err) {
        next(err);
    }
}

const getOrderById = async (req, res, next) => {
    try {
        let { id } = req.params;
        const order = await OrderModel.findById(id).populate('or_pd_id', 'pd_name pd_code');
        if (!order) {
            return res.status(404).json({
                error: 1,
                message: 'Order tidak ditemukan'
            });
        }

        return res.json(order);
    } catch (err) {
        next(err);
    }
}




module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
}