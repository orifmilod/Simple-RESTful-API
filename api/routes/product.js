const express = require('express');
const router = express.Router();

//GET
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /products"
    });
});

//POST
router.post('/', (req, res, next) => {
    const product = { 
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: "Handling POST request to /products",
        createdProduct: product
    });
});

//product ID GET
router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    if(id === 'special') {
        res.status(200).json({
            message: "You found out special product"
        });
    }
    else {
        res.status(200).json({
            message: `You are viewing ${id} product`
        })
    }
});

//product ID PATCH
router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;
    res.status(200).json({
        message: `Updated product ${id}`
    });
});

//product ID DELETE
router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID;
    res.status(200).json({
        message: `Deleted product ${id}`
    });
});
module.exports = router;