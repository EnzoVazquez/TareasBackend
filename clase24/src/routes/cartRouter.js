import { Router } from "express";
import context from "../contexts/FileSystem/cartContext.js"
import __dirname from "../utils.js";
import productContext from "../contexts/FileSystem/context.js"

let router = new Router();
let contenedor = new context(__dirname + "/files/cart.json")
let contenedorProductos = new productContext(__dirname + "/files/productos.json")

//crear nuevo carrito
router.post("/",async(req,res,next)=>{
    try {
        let cart = await contenedor.newCart()
        return cart
    } catch (error) {
        console.log(error)
    }
})

//traer el carrito
router.get("/", async(req,res,next)=>{
    try {
        let carts = await contenedor.getCarts();
        res.send(carts)
    } catch (error) {
        console.log(error)
    }
})

//borrar un carrito
router.delete("/:id", async(req,res,next)=>{
    try {
        let idDelete = req.params.id;
        await contenedor.deleteCart(idDelete);
        console.log("carrito eliminado con exito");
    } catch (error) {
     console.log(error)   
    }
})

//agregar productos por id de producto
router.post("/:id/productos/:productId",async(req,res,next)=>{
    try {
        let productId = req.params.productId;
        let cartId = req.params.id;
        let productFilter = await contenedorProductos.getById(productId);
        let productAdded = await contenedor.addProduct(productFilter, cartId);
        console.log(productAdded);
    } catch (error) {
        console.log(error)
    }
})

//borrar producto por id
router.delete("/:id/productos/:productId", async(req,res,next)=>{
    try {
        let productId = req.params.productId;
        let cartId = req.params.id;
        await contenedor.deleteProduct(cartId, productId)
    } catch (error) {
        console.log(error)
    }
})
export default router