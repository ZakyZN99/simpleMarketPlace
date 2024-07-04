const router = require('express').Router();
const authController = require('../controllers/DummyController')

router.post('/dummyuser', authController.registerUser)
router.post('/dummyproduct', authController.addProduct)
router.post('/dummycategory', authController.addCategory)
router.post('/dummyorder', authController.addOrder)

module.exports = router;