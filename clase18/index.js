import mongoose, { mongo } from "mongoose";

// Configurar mongoose para no mostrar warnings de protocolas deprecados
mongoose.set("strictQuery", false);

//productos
const productos = [
  {
    title: "9FIFTY New York Yankees Snapback Marron ",
    price: 12000,
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0809/2599/products/ecom_tienda_1022_033_740x986.jpg?v=1666089974",
    stock: 6,
  },
  {
    title: "LACOSTE Classic Pique 5 panel navy",
    price: 17000,
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0809/2599/products/ecom_tienda_0422_053_707x943.jpg?v=1649234632",
    stock: 4,
  },
  {
    title: "POLO Bear Classic Corduroy Dadhat Verde",
    price: 20000,
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0809/2599/products/ecom_tienda_1022_077_708x943.jpg?v=1667383404",
    stock: 8,
  },
  {
    title: "Classic Polo Loft Bucket Hat Khaki ",
    price: 14000,
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0809/2599/products/ecom_tienda_0922_027_708x943.jpg?v=1662380014",
    stock: 6,
  },
  {
    title: "9FIFTY New York Yankees Big Apple Stadium Snapback Green ",
    price: 12000,
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0809/2599/products/SPrhQNwY_710x947.jpg?v=1668774206",
    stock: 3,
  },
  {
    title: "59Fifty San Francisco ",
    price: 12000,
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0809/2599/products/ecomT5568x3708-00933_710x947.jpg?v=1640176237",
    stock: 5,
  },
  {
    title: "Snail Mountain Dad Hat Olive ",
    price: 11500,
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0809/2599/products/wfhoEYIA_740x986.jpg?v=1668772217",
    stock: 6,
  },
];

//defino esquma y modelo para interactuar con la db

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  stock: { type: Number, required: true },
});

const productsDAO = mongoose.model("productos", productsSchema);

//mensajes

const mensajes = [
  {
    user: "enzo@correo.com",
    message: "Buen dia!",
    date: "28/12/2022, 13:24:44",
  },
  {
    user: "palo@correo.com",
    message: "hola a todos",
    date: "28/12/2022, 13:24:45",
  },
  {
    user: "juan@correo.com",
    message: "hola grupo",
    date: "28/12/2022, 13:24:47",
  },
  {
    user: "pablo@correo.com",
    message: "bienvenidos",
    date: "28/12/2022, 13:24:47",
  },
  {
    user: "ana@correo.com",
    message: "hola!",
    date: "28/12/2022, 13:24:48",
  },
];

const mensajesSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, requried: true },
  date: { type: String, required: true },
});

const mensajesDAO = mongoose.model("mensajes", mensajesSchema);

//conexion a la BD
await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
  serverSelectionTimeoutMS: 5000,
});
console.log("BASE DE DATOS CONECTADA !");

//escritura de la base de datos
const inserciones = [];

for (const producto of productos) {
  inserciones.push(productsDAO.create(producto));
}

const result = await Promise.allSettled(inserciones);

const rejected = result.filter((r) => r.status == "rejected");
if (rejected.length > 0) {
  console.log(`hay ${rejected.length} errores`);
} else {
  console.log("todo correcto");
}

//escritura de la base de datos mensajes
const insercionesMensajes = [];

for (const mensaje of mensajes) {
  insercionesMensajes.push(mensajesDAO.create(mensaje));
}

const resultMensajes = await Promise.allSettled(insercionesMensajes);

const rejectedMensajes = resultMensajes.filter((r) => r.status == "rejected");
if (rejectedMensajes.length > 0) {
  console.log(`hay ${rejected.length} errores en los mensajes`);
} else {
  console.log("todo correcto con los mensajes");
}

//traemos y mostramos ambas colecciones

productsDAO.find(function (err, productos) {
  if (err) return console.log(err);
  console.log(productos);
});

mensajesDAO.find(function (err, mensajes) {
  if (err) return console.log(err);
  console.log(mensajes);
});

//AGREGAMOS UN ITEM A CADA COLECCION

let mensajeNuevo = new mensajesDAO({
  user: "Franco@correo.com",
  message: "hola!, Me agregaron",
  date: "28/12/2022, 13:26:48",
});

mensajeNuevo.save(function (err) {
  if (err) return console.error(err);
});

let productoNuevo = new productsDAO({
  title: "Kangol bermuda Casual Black ",
  price: 19000,
  thumbnail:
    "https://cdn.shopify.com/s/files/1/0809/2599/products/ecom_tienda_0620_046_708x943.jpg?v=1592297542",
  stock: 6,
});

productoNuevo.save(function (err) {
  if (err) return console.error(err);
});

//TRAER PRODUCTOS CON PRICE < 15000
productsDAO.find({ price: { $lt: 15000 } }, function (err, productos) {
  if (err) return console.log(err);
  console.log(`PRODUCTOS POR MENOS DE 15000 ${productos}`);
});

//TRAER PRODUCTOS CON PRICE >15000 <17000
productsDAO.find({price: {$gte: 15000, $lte: 17000}}, function(err, productos){
  if(err) return console.log(err);
  console.log(`PRODUCTOS ENTRE 15000 Y 17000 ${productos}`);
});

//TRAER PRODUCOTS > 17000
productsDAO.find({price: {$gt: 17000 }}, function(err, productos){
  if (err) return console.log(err);
  console.log(`PRODUCTOS POR MAS DE 17000 ${productos}`);
});

//TRAER EL TERCER PRODUCTOS MAS BARATO
productsDAO.find({},{_id:0,title:1}).sort({price:1}).limit(1).skip(2);

//CAMBIAR LOS STOCK A 10
productsDAO.updateMany({},{$set: {stock: 10}},function(err){
  if (err) return console.log(err);
  console.log("STOCKS ACTUALIZADOS CON EXITO");
});

//CAMBIAR STOCK A 0 PARA PRODUCTOS CON VALOR >19000
productsDAO.find({price: {$gt: 19000}},{$set:{stock: 0}}, function(err){
  if (err) return console.log(err);
  console.log('STOCK A 0 PARA >19000');
});

//BORRAR PRODUCTOS CON PRECIO MENOR A 12000
productsDAO.deleteMany({price: {$lt: 12000}},function(err, productos){
  if (err) return console.log(err);
  console.log(productos);
});

//CERRAMOS LA CONEXION
//await mongoose.disconnect();