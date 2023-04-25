import { Router } from "express";
import crearNumeros from "../function/random.js";

const router = Router();

router.get('/',(req,res)=>{
    res.render('login')
})

router.get('/register',(req,res)=>{
    res.render('register')
})

router.get('/data',(req,res)=>{
    if(!req.session.user) return res.redirect('/login');
    res.render('data',{user:req.session.user})
})

router.get('/info',(req,res)=>{
    res.json({
        config : {
            directorio: process.cwd(),
            id: process.pid,
            version: process.version,
            titulo: process.title,
            sistema: process.platform,
            usoMemoria: process.memoryUsage()
        }
    })
});

router.get('/api/randoms/:number',async(req,res)=>{
    const limit = req.params.number;
    let numerosRandom = await crearNumeros(limit);
    console.log(numerosRandom)
    res.json(numerosRandom);
})
export default router