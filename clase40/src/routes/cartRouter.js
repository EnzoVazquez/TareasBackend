import { Router } from "express";
import jwt from "jsonwebtoken";
import config from "../configs/config.js";
//import cartContext from "../contexts/MongoDB/cartContext.js";
//import productsController from "../controllers/products.controller.js";
import { transporter } from "../services/mailing.js";

const router = new Router();

//crear carrito
router.post("/", async (req, res) => {
  try {
    const body = JSON.stringify(req.body);
    const { email } = JSON.parse(body);
    const exist = await carrito.getCart(email);
    if (!exist) {
      await carrito.createCart(email);
      res.send({ status: "success", message: "carrito creado con exito" });
    } else {
      res.send({ status: "error", message: "el usuario ya posee un carrito" });
    }
  } catch (error) {
    console.log("error");
  }
});

//traer carrito por email
router.get("/", async (req, res) => {
  try {
    const body = JSON.stringify(req.body);
    const email = JSON.parse(body);
    const cart = await carrito.getCart(email);
    res.send(JSON.stringify(cart));
  } catch (error) {
    console.log(error);
  }
});

//finalizar compra
router.post("/add", async (req, res) => {
  try {
    const body = JSON.stringify(req.body);
    const bodyParser = JSON.parse(body);
    const token = req.cookies[config.jwt.COOKIE];
    const { nombre, email } = jwt.verify(token, config.jwt.SECRET);
    const cart = await carrito.getCart(email);
    cart.productos = [...bodyParsed];
    let emailBody = ``;
    for (const producto of bodyParser) {
      const prod = await productContext.getById(producto.id);
      if (prod) {
        contendor += `<div>
                    <p>Title: ${prod.title}</p>
                    <p>Price: ${prod.price}</p>
                    <img src="${prod.thumbnail}" alt="not found">
                    </div>`;
      }
    }
    const result = await transporter.sendMail({
      from: `${config.nodemailer.USER}`,
      to: email,
      subject: `Nuevo pedido de ${email}`,
      html: `${contendor}`,
    });
    res.send({ status: "success", message: "compra finalizada" });
  } catch (error) {
    console.log(error);
  }
});

//vaciar y borrar carrito
router.delete('/:id', async(req,res)=>{
  try {
    const id = req.params.id;
    await carrito.deleteById(id);
    res.send({status:'success', message: 'carrito eliminado'});
  } catch (error) {
    console.log(error);
  }
});

//listar todos los productos del carrito
router.get('/:id/productos', async(req,res)=>{
  try {
    const id = req.params.id;
    const productos = await carrito.getProducts(id);
    res.send(productos)
  } catch (error) {
    console.log(error)
  }
});

//agregar productos por id
router.post('/:id/productos/:id_prod', async(req,res)=>{
  try {
    const id = req.params.id;
    const productId = req.params.id_prod;
    await carrito.saveProduct(id, productId);
    res.send({status:'success', message:'producto agregado'});
  } catch (error) {
    console.log(error);
  }
});

//eliminar productos por id
router.delete('/:id/productos/:id_prod', async(req,res)=>{
  try {
    const id = req.params.id;
    const productId = req.params.id_prod;
    await carrito.deleteProduct(id, productId);
    res.send({status:'success', message:'producto eliminado'});
  } catch (error) {
    console.log(error);
  }
})

export default router