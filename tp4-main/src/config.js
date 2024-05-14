const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const productCollection = new mongoose.model("products", productSchema);

module.exports = productCollection;