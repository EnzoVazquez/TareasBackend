const crearNumeros = (limit) =>{
    let randomNumbers = [];
    for(let i=0 ; i<limit; i++){
        let numeros = Math.floor(Math.random()*1000)+1;
        randomNumbers.push(numeros)
    }
    return randomNumbers
};
export default crearNumeros;