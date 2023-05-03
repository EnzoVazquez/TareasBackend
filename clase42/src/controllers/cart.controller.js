import mongoCart from '../DAO/MongoDB/cartDAO.js'

const cartService = new mongoCart();

const insertProduct = async(req,res)=>{
    const user = req.user;
    const productId = req.params.pid
    const cart = await cartService.getCartById(user.cart);
    const exists = cart.products.find(product => product._id.toString()===productId);
    if(exists) return res.status(400).send({status:'error', message:'ya tienes este producto en tu carrito'});
    cart.products.push({_id:productId});
    console.log(cart.products);
    await cartService.updateCart(cart._id,{products:cart.products});
    res.redirect('/cart')
};

export default {
    insertProduct
}