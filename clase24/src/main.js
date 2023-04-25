import express from "express"
import productsRouter from "./routes/productsRouter.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js";
import views from "./routes/viewsRouter.js"
import cartRouter from "./routes/cartRouter.js"
import mongoose from "mongoose";
import sessionsRouter from './routes/sessionsRouter.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { addLogger } from "./middlewares/logger.js";

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect('mongodb+srv://enzo:coder123@clustercoderback.a4dyco9.mongodb.net/?retryWrites=true&w=majority')
app.use(session({
    store: MongoStore.create({
         mongoUrl:"mongodb+srv://enzo:coder123@clustercoderback.a4dyco9.mongodb.net/?retryWrites=true&w=majority"//importante agregar la collecion antes del ?
    }),
    secret: 'coderSecret',
    resave:false,
    saveUninitialized: false
}));

app.listen(PORT,()=> console.log(`escuchando en el puerto ${PORT}`));

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
app.use("/api/carrito",cartRouter);
app.use('/api/sessions', sessionsRouter);

//logger
app.use(addLogger);

app.get('/logger',(req,res)=>{
    res.send('ok')
})