import { Router } from "express";
import context from "../contexts/productos.context.js"

const utilidades = new context();
const router = Router();

router.post('/',async(req,res)=>{
    console.log(req.body);
    const {title, price, thumbnail} = req.body;
    if(!title||!price||!thumbnail){
        return res.status(400).send({status: "error", error: "faltan valores"});
    }

    let producto = {
        title,
        price,
        thumbnail
    };
    await utilidades.save(producto);
    res.send({status: "sucess", message: "Producto nuevo agregado"});
})

export default router;