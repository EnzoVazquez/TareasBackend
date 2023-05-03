import UserDao from "../src/DAO/MongoDB/userDAO.js";
import mongoose from "mongoose";
import { strict as assert} from 'assert';

mongoose.connect("mongodb+srv://enzo:coder123@clustercoderback.a4dyco9.mongodb.net/proyecto?retryWrites=true&w=majority");
const usersService = new UserDao();

describe('test general del Dao',()=>{
    describe('prueba de lectura',()=>{
        it('el DAO debe obtener a los usuarios', async function(){
            const result = await usersService.getUsers();
            assert.ok(result);
            assert.strictEqual(Array.isArray(result), true)
        })
    })
    describe('pruebas de escritura',()=>{
        before(async function(){
            await usersService.drop();
        })
        it('el DAO debe poder insertar un usuario',async function(){
            const user = {
                first_name:'cosme',
                last_name:'fulanito',
                email:'cosme@correo.com',
                password:'123'
            }
            const result = await usersService.createUser(user);
            assert.ok(result._id)
        })
    })
})
