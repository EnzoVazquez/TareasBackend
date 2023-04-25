const socket = io();

socket.on('productList',(data)=>{
    let lista = document.getElementById('productList')
    data.forEach(e => {
        e = e + `<img src=${e.thumbnail}>
        <p>${e.title}</p><p>${e.price}</p>`
    });
    lista.innerHTML = e;
})