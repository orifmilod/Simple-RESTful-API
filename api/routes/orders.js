const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const ordersController = require('../controller/order.js');


//Handling incoming requests to /orders
router.get('/', checkAuth, ordersController.GET_ALL_ORDERS);
router.post('/', checkAuth, ordersController.CREATE_ORDER);
router.get('/:orderID', checkAuth, ordersController.GET_ORDER);
router.delete('/:orderID', checkAuth, ordersController.DELETE_ORDER);

module.exports = router;