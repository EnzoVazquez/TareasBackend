import { Router } from "express";
import context from "../contexts/MongoDB/context.js"
import __dirname from "../utils.js"

let router = new Router();
//este es para fs
//let contenedor = new context(__dirname + "/files/productos.json")
let contenedor = new context()
let DB  = "mongoAtlas"

//traer todos los productos
router.get("/",async(req,res,next)=>{
    try {
        let productos = await contenedor.getAll();
        res.send(productos);
    } catch (error) {
        console.log(error);
    }
});

//traer un producto por su id
router.get("/:id", async(req,res,next)=>{
    try {
        let idFilter = req.params.id
        let productoFilter = await contenedor.getById(idFilter);
        res.send(productoFilter);
    } catch (error) {
        console.log(error);
    }
});

//agregar un producto
router.post("/", async(req,res,next)=>{
    try {
        let {title,price,thumbnail,stock} = req.body
        if(!title||!price||!thumbnail||!stock){
            console.log("faltan valores");
        }else{
            await contenedor.save({title:title, price:price, thumbnail:thumbnail, stock:stock});
            res.redirect('/products')
        }
    } catch (error) {
        console.log(error);
    }
});

//actualizar un producto
router.put("/:id", async(req,res,next)=>{
    try {
        let id = req.params.id;
        let {title,price,thumbnail,stock} = req.body
        if(!title || !price || !thumbnail || !stock){
            res.send("faltan datos")
        }else{
            let updateProduct ={
                title,
                price,
                thumbnail,
                stock
            };
            await contenedor.update({id,updateProduct})
            res.send(`se actualizo el producto ${updateProduct.title}`)
        }
    } catch (error) {
        console.log(error)
    }
});

//borrar un producto
router.delete("/:id", async(req,res,next)=>{
    try {
        let id = req.params.id;
        await contenedor.deleteById(id);
        res.send(`producto con el Id ${id} fue borrado con exito`)
    } catch (error) {
        console.log(error)
    }
})
export default router