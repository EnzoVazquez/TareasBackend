import mongoose from 'mongoose';

const collecion = 'Users';

const schema = new mongoose.Schema({
    first_name:{
        type: String,
        required:true
        //el nombre tiene que venir si o si
    },
    last_name: String,
    email:{
        type:String,
        required:true,
        unique:true
        //no puede haber 2 emails iguales
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default: 'user'
    }
});

const userModel = mongoose.model(collecion,schema);

export default userModel