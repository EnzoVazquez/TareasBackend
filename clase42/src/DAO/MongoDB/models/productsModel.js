import mongoose from "mongoose";
import mongoosePagination from 'mongoose-paginate-v2'

const collection = 'productos'

const schema = new mongoose.Schema({
    title: String,
    price: Number,
    thumbnail:  String,
    stock: Number,
});

schema.plugin(mongoosePagination); 

mongoose.set('strictQuery', true)

const productModel = mongoose.model(collection,schema);

export default productModel;