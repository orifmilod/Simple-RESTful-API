const Order = require('../models/order');
const mongoose = require('mongoose');

exports.GET_ALL_ORDERS = (req, res, next) => {
    Order
    .find()
    .select('-__v')
    .then(result => res.status(200).json({ 
        count: result.length,
        orders: result
    }))
    .catch(error => res.status(500).json(error))
}

exports.CREATE_ORDER = (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productID
    });

    order
    .save()
    .then(result => res.status(201).json(result))
    .catch(error => res.status(500).json({ error: error }))
}

exports.GET_ORDER = (req, res, next) => {
    Order
    .findById(req.params.orderID)
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error))
}

exports.DELETE_ORDER = (req, res, next) => {
    Order
    .remove({ _id: req.params.orderID })
    .then(result => res.status(200))
    res.status(200).json({
        message: 'Order deleted',
        orderID: req.params.orderID
    });
}