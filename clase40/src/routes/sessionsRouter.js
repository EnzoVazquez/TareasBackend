import { Router } from 'express';
import uploader from '../services/upload.js';
import passport from 'passport'
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();

router.post('/register',uploader.single('avatar'),sessionsController.register);

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail',session:false}),sessionsController.login);

router.get('/loginFail',sessionsController.loginFail)

router.get('/github',passport.authenticate('github',{scope:[]}),(req,res)=>{
    //este punto solo se encarga de ABRIR LA APLICACION EN EL NAVEGADOR
})

router.get('/githubCallback',passport.authenticate('github'),sessionsController.githubCallback)

export default router