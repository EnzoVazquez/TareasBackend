import  express  from "express";

import context from "./context.js";

const productContext = new context('productos.json')

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=> console.log(`escuchando en el puerto ${PORT}`))

app.get('/',(req,res)=>{
    res.send('Bienvenido')
});

app.get('/productos', async(req,res)=>{
    let productos = await productContext.getAll();
    console.log(productos)
    res.send(productos)
})

app.get('/productoRandom', async(req,res)=>{
    let productos = await productContext.getAll();
    let randomId = ([Math.floor(Math.random() * productos.length)]);
    let productoRandom = productos.find(e => e.id == randomId);
    res.send(productoRandom);
})