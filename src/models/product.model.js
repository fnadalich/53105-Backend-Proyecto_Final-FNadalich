const mongoose = require ("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        index: true
    },
    img: {
        type: String
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    thumbnail: {
        type: [String]
    }
})

productSchema.plugin(mongoosePaginate)

const ProductModel = mongoose.model("products", productSchema);
module.exports =ProductModel;