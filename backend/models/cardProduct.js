const mongoose = require('mongoose');

const addToCartSchema = new mongoose.Schema({
   productId: {
        ref: 'product',
        type: String,
   },
   quantity: Number,
   userId: String,
}, {
    timestamps: true
});

const addToCartModel = mongoose.model("addToCart", addToCartSchema);

module.exports = addToCartModel;
