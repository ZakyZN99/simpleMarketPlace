const CategoryModel = require('../model/CategoryModel')

const createCategory = async (req, res, next) => {
    try {
        const { ct_code, ct_name } = req.body;

        const category = new CategoryModel({ ct_code, ct_name });
        await category.save();

        return res.status(201).json(category);
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

// Mendapatkan semua kategori
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find();
        return res.json(categories);
    } catch (err) {
        next(err);
    }
}

// Mendapatkan kategori berdasarkan ID
const getCategoryById = async (req, res, next) => {
    try {
        const category = await CategoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                error: 1,
                message: 'Kategori tidak ditemukan'
            });
        }

        return res.json(category);
    } catch (err) {
        next(err);
    }
}

// Memperbarui kategori berdasarkan ID
const updateCategory = async (req, res, next) => {
    try {
        const { ct_code, ct_name } = req.body;

        const category = await CategoryModel.findByIdAndUpdate(
            req.params.id,
            { ct_code, ct_name },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({
                error: 1,
                message: 'Kategori tidak ditemukan'
            });
        }

        return res.json(category);
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

// Menghapus kategori berdasarkan ID
const deleteCategory = async (req, res, next) => {
    try {
        const category = await CategoryModel.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({
                error: 1,
                message: 'Kategori tidak ditemukan'
            });
        }

        return res.json({
            message: 'Kategori berhasil dihapus'
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}