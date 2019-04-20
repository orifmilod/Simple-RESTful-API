const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');

//GET
router.get('/', (req, res, next) => {
    Product
    .find()
    .select('name price id') // or you can use select('-__v') to just exclude __v
    .then(products => {
        const response = {
            count: products.length,
            products: products.map(product => {
                return {
                    name: product.name,
                    price: product.price,
                    id: product.id,
                    request: {
                        type: 'GET',
                        url: 'http:localhost:3000/products/' + product._id
                    }
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err => res.status(500).json({ error: err }) );   
});

//POST
router.post('/', (req, res, next) => {
    const product = new Product({
        id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    //Saving product to Database
    product.save((err, product) => {
        if (err) res.status(500).json({ error: err });
        else res.status(201).json({ 
            message: 'Created product successfully',
            product: {
                id: product.id,
                name: product.name,
                price: product.price,
                request: {
                    type: 'GET',
                    url: 'http:localhost:3000/products/' + product._id
                }
            }
        });
    });
});


//GET
router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;

    //Fetching Data from Database
    Product
    .findById(id)
    .then(product => {
        if(product) res.status(200).json({ 
            id:  product.id,
            name: product.name,
            price: product.price
        });
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
    .update({ id: id }, {$set: updateOperations})
    .then( result => res.status(200).json(result) )
    .catch( err => res.status(500).json({ error: err }) );
});

//product ID DELETE
router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID;

    Product
    .remove({ id: id })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err }))
});

module.exports = router;