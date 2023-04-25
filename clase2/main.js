class usuario{
    constructor(name,lastName){
        this.name = name;
        this.lastName = lastName;
        this.books = [];
        this.pets = []
    }

    getFullName = () =>{
        return (`${this.name}${this.lastName}`)
    }

    addPet = (pet) =>{
        this.pets.push(pet)
    }

    countPets = () =>{
        const amount = this.pets.length
        return console.log(amount)
    }

    addBook = (title,author) =>{
        this.books.push({title: title,author: author})
    }

    getBooksNames = () =>{
        this.books.map(books=>{
            return console.log(`${books.title}`)
        })                                                                       
    }
}

let usuario1 = new usuario("enzo","vazquez");

usuario1.addBook("El Quijote de La Mancha","Miguel de Cervantes Saavedra");
usuario1.addBook("El Principito", "Antoine de Saint-Exupéry");
usuario1.addBook("1984","George Orwell");

usuario1.addPet("perro");
usuario1.addPet("loro");

console.log(usuario1.getFullName());
console.log(usuario1.countPets());
console.log(usuario1.getBooksNames())