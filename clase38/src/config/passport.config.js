import passport from 'passport'
import local from 'passport-local'
import userModel from '../models/user.js'
import { validatePassword } from '../services/hash.js'

const LocalStrategy = local.Strategy;

const initializePassport = () =>{
    passport.use('login',new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
        const user = await userModel.findOne({email});
        if(!user) return done(null,false,{message:'El usuario no existe'});
        const isValidPassword = await validatePassword(password,user.password);
        if(!isValidPassword) return done(null,false,{message:"Contraseña incorrecta"});
        return done(null,user);
    }));
}

export default initializePassport;

