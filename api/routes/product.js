const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const productController = require('../controller/products');


//Handling all the incoming requests 
router.get('/', productController.GET_ALL_PRODUCTS);
router.post('/', checkAuth, productController.CREATE_PRODUCT);
router.get('/:productID', productController.GET_PRODUCT);
router.patch('/:productID', checkAuth, productController.UPDATE_PRODUCT);
router.delete('/:productID', checkAuth, productController.DELETE_PRODUCT);

module.exports = router;