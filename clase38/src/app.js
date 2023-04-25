import express from 'express'
import __dirname from './utils.js';
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import sessionsRouter from './routes/sessions.router.js'
import mongoose from 'mongoose';
import initializePassport from './config/passport.config.js';
import cookieParser from 'cookie-parser'

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect('mongodb+srv://enzo:coder123@clustercoderback.a4dyco9.mongodb.net/proyecto?retryWrites=true&w=majority');

//motor de plantillas
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

//middlewares
app.use(express.static(__dirname +'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
initializePassport();

//Routers
app.use('/',viewsRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(PORT,()=> console.log(`listening on ${PORT}`));


