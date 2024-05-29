import { Schema, model } from 'mongoose'

const ProductSchema = new Schema({
    name: {
        type: String,
        require: true
    }, 
    price: {
        type: Number,
        require: true
    },
     description: {
        type: String,
        require: true
    },

})

const Product = model("Product", ProductSchema);

export default Product;
