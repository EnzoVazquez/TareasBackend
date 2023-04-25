import fs from 'fs';

const path = 'src/files/productos.json'

class contenedor{

    getAll = async() =>{
        try {
           if(fs.existsSync(path)){
            let data = await fs.promises.readFile(path, 'utf-8');
            let listaProductos = JSON.parse(data);
            return listaProductos;
           }else{
            console.log('hay problemas con la ruta del archivo');
           }
        } catch (error) {
            console.log(error)
        }
    }
    
    save = async(producto)=>{
        try {
            let productos = await this.getAll();
            if(productos.length === 0){
                producto.id = 0;
                productos.push(producto);
                console.log(producto);
                await fs.promises.writeFile(path, JSON.stringify(productos,null,'\t'));
            }else{
                producto.id = productos[productos.length-1].id+1;
                productos.push(producto);
                console.log(producto);
                await fs.promises.writeFile(path, JSON.stringify(productos,null,'\t'))
            }
   
        } catch (error) {
            console.log(error)
        }
    }

    getById = async(idFilter)=>{
        try {
            let productos = await this.getAll();
            let filter = productos.find(e=>e.id == idFilter)
            console.log(filter);
            if(filter.id != Number(idFilter)){
                // let filter = productos.filter((element)=> element.id == (idFilter));
                console.log('inexistente')
            }else{
                return filter
            }
        } catch (error) {
            console.log(error)
        }
    }

    deleteById = async(idDelete)=>{
        try {
            let productos = await this.getAll();
            if(productos.id != idDelete){
               let filter = productos.filter((element)=> element.id != idDelete);
                await fs.promises.writeFile(path, JSON.stringify(filter,null, '\t'))
            }
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll = async()=>{
        try {
            fs.promises.unlink(path);
            console.log("stock eliminado");
        } catch (error) {
            console.log(error)
        }
    }

    update = async(objeto)=>{
        let productos = await this.getAll();
        let id = objeto.id;
        let title = objeto.title;
        let price = objeto.price;
        let thumbnail = obj.thumbnail;
        productos.map(function(newInfo){
            if(newInfo.id == id){
                newInfo.title = title;
                newInfo.prices = price;
                newInfo.thumbnail = thumbnail;
            }
        })
        await fs.promises.writeFile(path,JSON.stringify(productos,null,'\t'));
        return productos;

    }
}

export default contenedor;