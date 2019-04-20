const mongoose = require('mongoose');
 
const productSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true }
})


module.exports = mongoose.model('Product', productSchema);