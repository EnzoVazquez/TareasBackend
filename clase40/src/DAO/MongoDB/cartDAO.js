import cartModel from "./models/cartModel.js";
import productModel from "./models/productsModel";
import { logger } from '../../middleware/logger.js'

export default class cartsDao {
  getCartByEmail = async(email) => {
    try {
      const cart = await cartModel.findOne({usuario:email});
      return cart
    } catch (error) {
      logger.warn(`error en el getCartByEmail: ${error}`)
    }
  };

  createCart = async(email) => {
    try {
      const cart = {usuario: email, productos:[]}
      await cartModel.create(cart);
      return await cartModel.find(cart)._id
    } catch (error) {
      logger.warn(`error en createCart: ${error}`)
    }
  };

  saveProduct = async(idCart, idProduct) =>{
    try {
      const cart = await cartModel.findById({_id: idCart});
      const product = await productModel.findById({_id: idProduct});
      if(!cart) return logger.warn(`error en el saveProduct, no encontramos el carrito`)
      if(!product) return logger.warn(`error en el saveProduct, no encontramos el producto`)
      const exists = cart.productos.some((item)=>item._id === product._id)
      exists ? cart.productos.cantidad +1 : cart.productos.push(product);
      await cartModel.updateOne({_id: idCart}, {productos: cart.productos})
    } catch (error) {
      logger.warm(`error en el save product ${error}`)
    }
  }

  deleteCart = async(id) =>{
    try {
      await cartModel.findByIdAndDelete({_id:id});
    } catch (error) {
      logger.warn(`error en el deleteCart ${error}`)
    }
  }
}
