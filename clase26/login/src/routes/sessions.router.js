import { Router } from "express";
import userService from "../models/user.js";
import {createHash, isValidPassword} from '../utils.js'
import passport from "passport";

const router = Router();

router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerFail'}), async(req,res)=>{
    console.log(req.user);
    req.session.user = {
        name:req.user.name,
        email:req.user.email,
        id:req.user._id
    }
    res.redirect('/data')
})

router.get('/registerFail',(req,res)=>{
    console.log('error al registrar');
    res.status(500).send({status:'error', error:''})
})

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail'}),async(req,res)=>{
    //no meter informacion sensible en la cookie(password)
    req.session.user = {
        name:req.user.name,
        email:req.user.email,
        id:req.user._id
    }
    res.send({status:'success',payload:req.session.user});
})

router.get('/loginFail',(req,res)=>{
    res.status(500).send({status:'error', error:'error en login'});
})

router.get('/github',passport.authenticate('github',{scope:[]}),(req,res)=>{
    //este punto solo se encarga de ABRIR LA APLICACION EN EL NAVEGADOR
})

router.get('/githubCallback',passport.authenticate('github'),(req,res)=>{
    req.session.user = {
        name:req.user.name,
        email:req.user.email,
        location:req.user.location,
        id:req.user._id
    }
    res.redirect('/data')
})
export default router;