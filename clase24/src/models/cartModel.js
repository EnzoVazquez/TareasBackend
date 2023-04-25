import mongoose from "mongoose";
import productModel from "./productsModel.js";
const collection = 'carritos'

const schema = new mongoose.Schema({
    date: Date,
    items: [productModel]
});

mongoose.set('strictQuery', true)

const cartModel = mongoose.model(collection, schema);

export default cartModel;