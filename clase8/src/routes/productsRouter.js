import { Router } from "express";
import context from "../contexts/context.js"
import __dirname from "../utils.js"

let router = new Router();
let contenedor = new context(__dirname + "/files/productos.json")

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
        let {title,price,thumbnail} = req.body
        if(!title||!price||!thumbnail){
            console.log("faltan valores");
        }else{
            let newProduct = {
                title,
                price,
                thumbnail
            };
            await contenedor.save(newProduct);
            res.send(`${newProduct.id}`);
        }
    } catch (error) {
        console.log(error);
    }
});

//actualizar un producto
router.put("/:id", async(req,res,next)=>{
    try {
        let id = req.params.id;
        let {title,price,thumbnail} = req.body
        if(!title || !price || !thumbnail){
            res.send("faltan datos")
        }else{
            let updateProduct ={
                id,
                title,
                price,
                thumbnail
            };
            await contenedor.update(updateProduct)
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
        console.log("producto borrado con exito")
        res.send(`producto con el Id ${id} fue borrado con exito`)
    } catch (error) {
        console.log(error)
    }
})
export default router