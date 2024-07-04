const CategoryModel = require('../model/CategoryModel');
const ProductModel = require('../model/ProductModel');

const store = async(req, res, next) => {
    try{
        let payload = req.body;

        if(payload.pd_ct_id){
            let pd_ct_id = 
                await CategoryModel.findOne({
                    ct_code: {$regex: payload.pd_ct_id, $options: 'i'}});
                    if(pd_ct_id){
                        payload = {...payload, pd_ct_id: pd_ct_id._id};
                    }else{
                        delete payload.pd_ct_id;
                    }
        }
        let product = new ProductModel(payload);
            await product.save();
            return res.json(product);

    }catch(err){
        if(err === 'Validation Error'){
            return res.json({
                error:1,
                message: err.message,
                fields: err.errors
                })
            }
        next(err);
    }
}

const update = async(req, res, next) => {
    try{
        let payload = req.body;
        let {id} = req.params
        
        // Update karna ada relasi dengan category
        if(payload.pd_ct_id){
            let category = 
                await CategoryModel.findOne({
                    ct_code: {$regex: payload.pd_ct_id, $options: 'i'}});
                    if(category){
                        payload = {...payload, pd_ct_id: pd_ct_id._id};
                    }else{
                        delete payload.pd_ct_id;
                    }
        }
        
        let product =  await ProductModel.findByIdAndUpdate(id, payload,{
            new: true,
            runValidators: true    
                })
        return res.json(product);
    }catch(err){
        if(err === 'Validation Error'){
            return res.json({
                error:1,
                message: err.message,
                fields: err.fields
                })
            }
        next(err);
    }
}

const destroy = async (req, res, next) => {
    try {
        let product = await ProductModel.findOneAndDelete({_id: req.params.id});

        return res.json(product)

    } catch (err) {
        next(err)
    }
}

const index = async(req, res, next) => {
    try {
        let{skip=0, q= '', pd_ct_id='', search} = req.query;

        let criteria = {};
        if(q.length){
            criteria = {
                ...criteria,
                pd_name: {$regex: `${q}`, $options: 'i'}
            }
        }
        
        if(pd_ct_id.length){
            let categoryResult = await CategoryModel.findOne({ct_code: {$regex: `${pd_ct_id}`, $options: 'i'}})

            if(categoryResult){
                criteria = {
                    ...criteria, pd_ct_id: categoryResult._id
                }
            }
        }

        if(search){
            criteria = {
                ...criteria,
                pd_name: { $regex: new RegExp(search, 'i') },
        }}

        let count  = await ProductModel.find().countDocuments();
        let product = await ProductModel.find(criteria)
        .skip(parseInt(skip))
        .populate('pd_ct_id', 'ct_name ct_code');
        return res.json({
            data: product,
            count
        });
    } catch (err) {
        next(err)
    }
}

const productById = async (req, res, next) => {
    try {
        let { id } = req.params;
        let product = await ProductModel.findById(id).populate('pd_ct_id', 'ct_name ct_code');

        if (!product) {
            return res.status(404).json({
                error: 1,
                message: 'Product not found'
            });
        }

        return res.json(product);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    store,
    index,
    update,
    destroy,
    productById
}