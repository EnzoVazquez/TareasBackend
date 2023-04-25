import { Router } from "express";
import userModel from "../models/userModel.js";
import session from "express-session";

const router = Router();

router.post('/register', async(req,res)=>{
    const {first_name, last_name, email, password} = req.body;
    if(!first_name || !last_name || !email || !password) return res.status(400).send({status:'error', error: 'valores incompletos'});
    const exists = await userModel.findOne({email});
    if(exists) return res.status(400).send({status: 'error', error: 'el usuario ya existe'});
    const result = await userModel.create({
        first_name,
        last_name,
        email,
        password
    });
    req.session.user = {
        id: result._id,
        name: result.first_name,
        lastName: result.last_name,
        role: result.role
    }
    console.log(req.session.user)
    res.send({status: 'success', payload: result})
});

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).send({status:'error', error: 'valores incompletos'});
    const user = await userModel.findOne({email,password});//cheakea que tanto el email y el password esten correctos
    if(!user) return res.status(400).send({status:'error', error:'correo o contraseña invalido'});
    req.session.user = {
        id: user._id,
        name: user.first_name,
        lastName: user.last_name,
        role: user.role
    }
    console.log(req.session.user)
    res.send({status: 'success', message: 'logueado', payload: user})
})

router.get('/logout', async(req,res)=>{
    try {
        req.session.destroy((err)=>{
            if(err){
                console.log(err)
            }
        });
        res.clearCookie('coderSecret')
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})


export default router