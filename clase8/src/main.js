import express from "express"
import productsRouter from "./routes/productsRouter.js"

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=> console.log(`escuchando en el puerto ${PORT}`));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/productos", productsRouter);