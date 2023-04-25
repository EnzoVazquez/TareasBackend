import productModel from './models/productsModel.js'

export default class productsDao {

    getProducts = (params,page=1) =>{
        return productModel.paginate(params,{page,limit:5,lean:true});
        // return videogamesModel.find(params).lean();
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