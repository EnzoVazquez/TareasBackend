import mongoose from "mongoose";
import cartModel from "../../models/cartModel.js";

//string de conexion
const connection = mongoose.connect(
    "mongodb+srv://enzo:coder123@clustercoderback.a4dyco9.mongodb.net/?retryWrites=true&w=majority",
    (error) => {
      if (error) console.log(error);
      else console.log("base conectada");
    }
);

class contenedor{

    //traer los carritos
    getCarts = async() =>{
      try {
        let info = await cartModel.find();
        return info;
      } catch (error) {
        console.log(error)
      }
    };

    //traer carro por id
    getCartById = async(id) =>{
      try {
        let cart = await cartModel.find({_id: id.toString()});
        return cart;
      } catch (error) {
        console.log(error);
      }
    };

    //crear nuevo carro
    newCart = async(producto) => {
      try {
        let date = new Date();
        let newCart = new cartModel({date,[productos]})
        
      } catch (error) {
        
      }
    }

}