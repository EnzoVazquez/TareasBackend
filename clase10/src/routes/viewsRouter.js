import { Router } from "express";
import context from "../contexts/context.js"
import __dirname from "../utils.js"

let router = new Router();
let contenedor = new context(__dirname + "/files/productos.json");

router.get("/",async(req,res)=>{
    res.render('inicio');
});

router.get("/addProduct",async(req,res)=>{
    res.render('addProduct');
});

router.get("/products",async(req,res)=>{
    let stock = await contenedor.getAll();
    res.render("products",{stock})
});
export default router