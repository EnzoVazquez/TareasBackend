import { Router } from "express";
import context from "../contexts/MongoDB/context.js"
import __dirname from "../utils.js"

let router = new Router();
let contenedor = new context(__dirname + "/files/productos.json");

router.get("/",async(req,res)=>{
    res.render('login');
});

router.get("/register",async(req,res)=>{
    res.render('register');
});

router.get("/main",async(req,res)=>{
    res.render('inicio', {user:req.session.user});
});

router.get("/addProduct",async(req,res)=>{
    res.render('addProduct');
});

router.get("/products",async(req,res)=>{
    let stock = await contenedor.getAll();
    res.render("products",{stock})
});

router.get('/logout', (req,res)=>{
    res.render('logout', {user:req.session.user});
    req.session.destroy();
    if(!req.session.user) return console.log('sesion terminada!')
})
export default router