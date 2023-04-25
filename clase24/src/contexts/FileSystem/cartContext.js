import fs from "fs";

class contenedor {
  constructor(path) {
    this.path = path;
  }

  //traer el carrito
  getCarts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        let info = await fs.promises.readFile(this.path, "utf-8");
        let carts = JSON.parse(info);
        return carts;
      } else {
        console.log("no existen carritos");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //traer carro por id
  getCartById = async(id) =>{
    try {
      let carts = await this.getCarts();
      let cartFilter = carts.filter(e =>e.id == id)
      return cartFilter
    } catch (error) {
      console.log(error);
    }
  }

  //crear nuevo carro
  newCart = async () => {
    try {
      let cartInfo = await fs.promises.readFile(this.path, "utf-8");
      let cartInfoParsed = JSON.parse(cartInfo);
      let cart = {};
      let idInicial = 0;
      let date = new Date();
      if (cartInfoParsed.length > 0) {
        idInicial = cartInfoParsed[cartInfoParsed.length - 1].id + 1;
        cart = {
          id: idInicial,
          date: date,
          productos: [],
        };
        console.log(cart);
        cartInfoParsed.push(cart);
      } else {
        idInicial = 1;
        cart = {
          id: idInicial,
          date: date,
          productos: [],
        };
        console.log(cart);
        cartInfoParsed.push(cart);
      }
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(cartInfoParsed, null, "\t")
      );
      return cart.id;
    } catch (error) {
      console.log(error);
    }
  };

  //borrar carrito
  deleteCart = async (id) => {
    try {
      let carts = await this.getCarts();
      if (carts.id != id) {
        let filter = carts.filter((cart) => cart.id != id);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(filter, null, "\t")
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  //agregar productos por id
  addProduct = async (product, cartId) => {
  try {
    const cart = await this.getCartById(cartId);
    const {id,date,productos} = cart[0]
    console.log(cart)
    productos.push(product)
    console.log(productos)
    let carts = await this.getCarts();
    carts.map((e)=>{
      if(e.id == cart[0].id){
        e.productos=[...e.productos,product]
      }
    })
    await fs.promises.writeFile(this.path,JSON.stringify(carts,null,"\t"))
   return cart
  } catch (error) {
    console.log(error)
  }
  };

  //guardar carro
  save = async(cart)=>{
    try {
      let carts = await this.getCarts();
      carts.push(cart);
      await fs.promises.writeFile(this.path,JSON.stringify(carts,null,"\t"))
    } catch (error) {
      console.log(error);
    }
  }

  //borrar producto por su id
  deleteProduct = async(cartId, productId)=>{
    try {
      const cart = await this.getCartById(cartId);
      const {id,date,productos} = cart[0]
      let newProducts = productos.filter(e=>e.id != productId);
      let carts = await this.getCarts();
      carts.map((e)=>{
        if(e.id == cart[0].id){
          e.productos=newProducts;
        }
      })
      await fs.promises.writeFile(this.path,JSON.stringify(carts,null,"\t"))
    } catch (error) {
      console.log(error)
    }
  }
}

export default contenedor;
