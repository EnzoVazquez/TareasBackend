import mongoose from "mongoose";

const collection = 'productos'

const schema = new mongoose.Schema({
    title: String,
    price: Number,
    thumbnail:  String,
    stock: Number,
});

mongoose.set('strictQuery', true)

const productModel = mongoose.model(collection,schema);

export default productModel;