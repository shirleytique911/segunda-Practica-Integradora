import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';


const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: [{
        
        type: String,
    }],
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        
        type: Boolean,
        default: true,
    },
    category: {
        type: String,
        required: true
    }

})

ProductSchema.plugin(mongoosePaginate)  

export const ProductsModel = mongoose.model("Product", ProductSchema)