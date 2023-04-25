import express from "express"
import productsRouter from "./routes/productsRouter.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js";
import views from "./routes/viewsRouter.js"
import { Server } from 'socket.io'
import chatContext from "./contexts/chatContext.js";
import productContext from './contexts/context.js'

//inicializamos el servidor
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=> console.log(`escuchando en el puerto ${PORT}`));
const io = new Server(server)

//contexts
let utilidadesChat = new chatContext();
let utilidadesProductos = new productContext(__dirname + '/files/productos.json');

//lectura de archivos estaticos
app.use(express.static(__dirname +'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//seteo motor de vistas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');

//vistas
app.use("/", views);
app.use("/api/productos", productsRouter);

//socket
io.on("connection", async(socket)=>{
    console.log("socket conectado");
    let chat = await utilidadesChat.getUsers();
    let productos = await utilidadesProductos.getAll();
    io.emit("chatMessages", chat);
    io.emit("productList", productos)

    //socket chat
    socket.on("message", async(data)=>{
        await utilidadesChat.save(data);
        let chat = await utilidadesChat.getUsers();
        io.emit("chatMessages",chat);
    });

})