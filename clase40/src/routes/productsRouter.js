import { Router } from "express";
import __dirname from "../utils.js"
import productController from '../controllers/products.controller.js'

let router = new Router();

//traer todos los productos
router.get("/",productController.getProducts);

//traer un producto por su id
router.get("/:id",productController.getById);

//agregar un producto
router.post("/",productController.addProduct);

//actualizar un producto
router.put("/:id",productController.updateProduct);

//borrar un producto
router.delete("/:id",productController.deleteProduct)

export default router