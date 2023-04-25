import { Router } from 'express';
import uploader from '../services/upload.js';
import passport from 'passport'
import sessionsControllers from '../controllers/sessions.controllers.js';

const router = Router();

router.post('/register',uploader.single('avatar'),sessionsControllers.register);

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail',session:false}),sessionsControllers.login);

router.get('/loginFail',sessionsControllers.loginFail);

export default router