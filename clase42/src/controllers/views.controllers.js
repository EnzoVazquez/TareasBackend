import cartsDao from "../DAO/MongoDB/cartDAO.js";
import productsDao from "../DAO/MongoDB/productsDAO.js";

const cartService = new cartsDao();
const productService = new productsDao();

const login = async (req, res) => {
  res.render("login");
};

const register = async (req, res) => {
  res.render("register");
};

const main = async (req, res) => {
  res.render("inicio");
};

const addProduct = async (req, res) => {
  res.render("addProduct");
};

const logout = async (req,res)=>{
    res.render('logout', {user:req.user});
    res.cookie(config.jwt.COOKIE,'',{expires: new Date(0)})
    if(!req.user) return console.log('sesion terminada!')
}

export default {
  login,
  register,
  main,
  addProduct,
  logout
};
