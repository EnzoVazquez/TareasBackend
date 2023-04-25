import { Router } from "express";
import context from "../contexts/productos.context.js"

const utilidades = new context();

const router = Router();

router.get('/',(req,res)=>{
    res.render('inicio');
});


router.get('/productos',async(req, res)=>{
    let stock = await utilidades.getAll();
    res.render('productos',{stock});

});

router.get('/productoNuevo',(req,res)=>{
    res.render('productoNuevo');
});

router.get('/chat',(req,res)=>{
    res.render('chat');
})

export default router