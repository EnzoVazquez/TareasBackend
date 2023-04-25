import fs from "fs"

class contenedor{
    constructor(path){
        this.path = path
    }

    //traer todos los productos
    getAll = async() =>{
        try {
            if(fs.existsSync(this.path)){
                let info = await fs.promises.readFile(this.path, 'utf-8');
                let products = JSON.parse(info);
                return products
            }else{
                console.log
            }
        } catch (error) {
            console.log(error)
        }
    }

    //agregar productos
    save = async(title,price,thumbnail) =>{
        let producto = {
            title: title,
            price: price,
            thumbnail: thumbnail
        }
        let stock = await this.getAll();
        try {
            if(stock.length === 0){
                producto.id = 0;
                stock.push(producto)
                await fs.promises.writeFile(this.path, JSON.stringify(stock,null,'\t'))
            }else{
                producto.id = stock[stock.length-1].id+1
                stock.push(producto)
                await fs.promises.writeFile(this.path,JSON.stringify(stock,null,'\t'))
            }
        } catch (error) {
            console.log(error)
        }
    }

    //traer por id
    getById = async(number) =>{
        let stock = await this.getAll();
        try {
            let filter = stock.find(e => e.id == number)
            return filter
        } catch (error) {
            console.log(error)
        }
    }

    //borrar por id
    deleteById = async(number) =>{
        let stock = await this.getAll();
        try {
            let filter = stock.filter(product =>product.id != number)
            await fs.promises.writeFile(this.path, JSON.stringify(filter,null,'\t'))
        } catch (error) {
            console.log(error);
        }
    }

    //borrar el archivo
    deleteAll = async() =>{
        try {
            await fs.promises.writeFile(this.path,JSON.parse('[]'))
        } catch (error) {
            console.log(error)
        }
    }
}

let path = new contenedor('productos.json')
//agregar productos
//path.save('9FIFTY New York Yankees Snapback Marron ','33,00','https://cdn.shopify.com/s/files/1/0809/2599/products/ecom_tienda_1022_033_740x986.jpg?v=1666089974');
//path.save('LACOSTE Classic Pique 5 panel navy', '75,00','https://cdn.shopify.com/s/files/1/0809/2599/products/ecom_tienda_0422_053_707x943.jpg?v=1649234632');
//path.save('POLO Bear Classic Corduroy Dadhat Verde', '79,00', 'https://cdn.shopify.com/s/files/1/0809/2599/products/ecom_tienda_1022_077_708x943.jpg?v=1667383404')
//trayendo producto por id
//path.getById(2).then(val=> console.log(val))
//borrar por id
//path.deleteById(2)
//borrar todo
//path.deleteAll()