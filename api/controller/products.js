const mongoose = require('mongoose');
const Product = require('../models/product');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/')
    },
    filename: (req, file, callback) =>  {
        callback(null, Date.now() + file.originalname)
    }
});

const fileFilter = (req, file, callback) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        callback(null, true);
    else  
        callback(null, false);
}
const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});

exports.GET_ALL_PRODUCTS = (req, res, next) => {
    Product
    .find()
    .select('-__v') 
    .then(products =>  {
        const response = {
            count: products.length,
            products: products.map(product => {
                return {
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    _id: product._id,
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
}

exports.CREATE_PRODUCT = upload.single('image'), (req, res, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        image: req.file.path
    });

    //Saving product to Database
    product.save((err, product) => {
        if (err) res.status(500).json({ error: err });
        else res.status(201).json({ 
            message: 'Created product successfully',
            product: {
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                request: {
                    type: 'GET',
                    url: 'http:localhost:3000/products/' + product._id
                }
            }
        });
    });
} 
exports.GET_PRODUCT = (req, res, next) => {
    const id = req.params.productID;

    //Fetching Data from Database
    Product
    .findById(id)
    .then(product => {
        if(product) res.status(200).json({ 
            _id:  product._id,
            name: product.name,
            price: product.price,
            image: product.image
        });
        else res.status(404).json({ message: "No data was found for this ID" });
    })
    .catch(err => res.status(500).json({ error: err }));
}

exports.UPDATE_PRODUCT = (req, res, next) => {
    const id = req.params.productID;

    const updateOperations = {};
    for (const opertaion of req.body) {
        updateOperations[opertaion.propName] = opertaion.value;
    }

    Product
    .update({ _id: id }, {$set: updateOperations})
    .then( result => res.status(200).json(result) )
    .catch( err => res.status(500).json({ error: err }) );
}


exports.DELETE_PRODUCT = (req, res, next) => {
    Product
    .remove({ _id: req.params.productID })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err }))
}