import passport from "passport";
import local from "passport-local";
import userService from "../models/user.js";
import {createHash, isValidPassword} from '../utils.js'
import githubStrategy from 'passport-github2'

const LocalStrategy = local.Strategy;

const initializePassport = () =>{

    passport.use('register',new LocalStrategy({passReqToCallback:true,usernameField:'email'},
    async(req,email,password,done)=>{
        try {
        const {name} = req.body;
        if(!name||!email||!password) return done(null,false,{message:'faltan valores'})
        //revisar si existe el usuario
        const exists = await userService.findOne({email:email});
        if(exists) return done(null,false,{message:'usuario ya existente'})
        //meter a la base
        const newUser = {
        name,
        email,
        password:createHash(password)
        };
        let result = await userService.create(newUser);
        return done(null,result);

        } catch (error) {
           done(error)
        }
    }))

    passport.use('login',new LocalStrategy({usernameField:'email'},
    async(email,password,done)=>{
        if(!email||!password) return done(null,false,{message:"Incomplete values"})
        let user = await userService.findOne({email:email});
        if(!user) return done(null,false,{message:"Incorrect credentials"})
        if(!isValidPassword(user,password)) return done(null,false,{message:"Incorrect password"});
        return done(null,user);
    }))

    passport.use('github', new githubStrategy({
        //se consiguen en github app
        clientID:'Iv1.19fa312571169e3d',
        clientSecret:'ed64c61a0432a654b297f06b0cec144eb4460f55',
        callbackURL:'http://localhost:8080/api/sessions/githubCallback'
    },async(accessToken,refreshToken,profile,done)=>{
        //extraer data del perfil
        console.log(profile);
        const {name,location,email} = profile._json
        //revisar si esta logueado
        let user = await userService.findOne({email:email});
        //si no existe se crea el usuario
        if(!user){
            let newUser = {
                name,
                email,
                location,
                password:''
            }
            let result = await userService.create(newUser);
            return done(null,result);
        }else{
            //si entra aca, ya tiene un usuario
            return done(null,user);
        }
    }));

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    });
    passport.deserializeUser(async(id,done)=>{
        let result = await userService.findOne({_id:id})
        return done(null,result)
    })

}

export default initializePassport;
