import productModel from './models/productsModel.js'

export default class productsDao {

    getProducts = (params) =>{
        return productModel.find(params).lean();
    }

    createProduct = (product) =>{
        return productModel.create(product);
    }

    getBy = (params) =>{
        productModel.findOne(params).lean();
    }

    deleteProduct = (params) =>{
        productModel.deleteOne(params)
    }

}