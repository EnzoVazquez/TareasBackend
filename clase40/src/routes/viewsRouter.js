import { Router } from "express";
import __dirname from "../utils.js"
import mongoProduct from '../DAO/MongoDB/productsDAO.js'
import viewsController from '../controllers/views.controllers.js'
import config from '../configs/config.js'

let router = new Router();
let productService = new mongoProduct()

router.get('/',viewsController.login);

router.get("/register",viewsController.register);

router.get("/main",viewsController.main);

router.get("/addProduct",viewsController.addProduct);

router.get("/products",async(req,res)=>{
    let stock = await productService.getProducts();
    console.log(stock)
    res.render("products",{stock})
});

router.get('/logout', viewsController.logout);

export default router