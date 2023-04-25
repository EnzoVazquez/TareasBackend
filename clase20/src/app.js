import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import views from './routes/views.router.js';
import productosRouter from './routes/productos.router.js'
import contenedor from './contexts/productos.context.js';
import { Server } from 'socket.io';
import chatContext from './contexts/chat.context.js';
import db from './db/sqlite3.js';


const utilidades = new contenedor();
const utilidadesChat = new chatContext();

const app = express();

const server = app.listen(8080,()=>console.log('conectado al puerto 8080'));


const io = new Server(server)
//seteo del motor de vistas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');
//lectura de archivos json
app.use(express.json());
//lectura de archivos estaticos
app.use(express.static(__dirname +'/public'));
app.use(express.urlencoded({ extended: true }))
//vistas
app.use('/',views);
app.use('/api/productos', productosRouter);
//socket
io.on("connection", async(socket)=>{
    console.log("socket conectado");
    let productos = await db('products').select('*');
    let chat = await db('chat').select('*');
    io.emit("updatedProductList", productos);
    io.emit("chatMessages", chat);

    //socket chat
    socket.on("message", async(data)=>{
        await db('chat').insert(data)
        let chat = await db('chat').select('*');
        io.emit("chatMessage", chat)
    })

    //socket productos
    socket.on("newProduct", async(data)=>{
        await db('products').insert(data);
        let stock = await db('products').select('*');
        io.emit("updateProductList", stock)
    })
})
