
import fs from 'fs';
import __dirname from '../utils.js';

class chatContext{
   
    constructor(){
        this.path = __dirname + "/files/chat.json"
    }

    getUsers = async() =>{
        try{
            if(fs.existsSync(this.path)){
                let data = await fs.promises.readFile(this.path, 'utf-8');
                let lista = JSON.parse(data);
                return lista
            }else{
                return [];
            }
        }catch(error){
            console.log(error)
        }
    }

    save = async(message) =>{
        try {
            let date = new Date();
            let messages = await this.getUsers();
            message.date = date.toLocaleString();
            messages.push(message);
            console.log(message);
            await fs.promises.writeFile(this.path,JSON.stringify(messages,null,"\t"));
        } catch (error) {
            console.log("error al escribir el archivo" + error)
        }
    }
}

export default chatContext;