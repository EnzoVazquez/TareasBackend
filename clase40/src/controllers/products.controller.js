import productsDao from '../DAO/MongoDB/productsDAO.js'
import __dirname from "../utils.js"

const productService = new productsDao();

const getProducts = async(req,res)=>{
    try {
        let productos = await productService.getProducts();
        res.send(productos);
    } catch (error) {
        console.log(error);
    }
};

const getById = async(req,res)=>{
    try {
        let idFilter = req.params.id
        let productoFilter = await productService.getBy(idFilter);
        res.send(productoFilter);
    } catch (error) {
        console.log(error);
    }
};

const addProduct = async(req,res)=>{
    try {
        let {title,price,thumbnail,stock} = req.body
        if(!title||!price||!thumbnail||!stock){
            console.log("faltan valores");
        }else{
            await productService.createProduct({title:title, price:price, thumbnail:thumbnail, stock:stock});
            res.redirect('/products')
        }
    } catch (error) {
        console.log(error);
    }
};

const updateProduct = async(req,res)=>{
    try {
        let id = req.params.id;
        let {title,price,thumbnail,stock} = req.body
        if(!title || !price || !thumbnail || !stock){
            res.send("faltan datos")
        }else{
            let updateProduct ={
                title,
                price,
                thumbnail,
                stock
            };
            await contenedor.update({id,updateProduct})
            res.send(`se actualizo el producto ${updateProduct.title}`)
        }
    } catch (error) {
        console.log(error)
    }
};

const deleteProduct = async(req,res)=>{
    try {
        let id = req.params.id;
        await productService.deleteProduct(id);
        res.send(`producto con el Id ${id} fue borrado con exito`)
    } catch (error) {
        console.log(error)
    }
}

export default {
    getProducts,
    getById,
    addProduct,
    updateProduct,
    deleteProduct
}