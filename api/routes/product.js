const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const mongoose = require('mongoose');

//GET
router.get('/', (req, res, next) => {
    Product
    .find()
    .then(docs => res.status(200).json(docs))
    .catch(err => res.status(500).json({ error: err }) );   
});

//POST
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    //Saving product to Database
    product.save((err, _product) => {
        if (err) res.status(500).json({ error: err });
        else res.status(201).json(_product);
    });
});


//GET
router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;

    //Fetching Data from Database
    Product
    .findById(id)
    .then(_product => {
        if(_product) res.status(200).json(_product);
        else res.status(404).json({ message: "No data was found for this ID" });
    })
    .catch(err => res.status(500).json({ error: err }));
});

//product ID PATCH
router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;

    const updateOperations = {};
    for (const opertaion of req.body) {
        updateOperations[opertaion.propName] = opertaion.value;
    }

    Product
    .update({ _id: id}, {$set: updateOperations})
    .then( result => res.status(200).json(result) )
    .catch( err => res.status(500).json({ error: err }) );
});

//product ID DELETE
router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID;

    Product
    .remove({ _id: id })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err }))
});

module.exports = router;