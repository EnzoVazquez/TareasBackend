const socket = io();

const productosForm = document.getElementById('productosForm');

productosForm.addEventListener("submit",e =>{
    e.preventDefault();
    const formData = new FormData(productosForm);
    console.log(formData);
    let newData = JSON.stringify(formData);
    fetch('/api/productos',{
        method:'POST',
        body: newData,
        //para que lea Json
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>console.log(result));
    socket.emit("newProduct", formData);

});

socket.on("updatedProductList", (data)=>{
    let log = document.getElementById("productList");
    let productos = "";
    data.forEach(producto => {
        productos = productos + 
        `
        <tr>
                <td>${producto.thumbnail}</th>
                <td>${producto.title}</td>
                <td>${producto.price}</td>
        </tr>

        `
    });
    console.log(productos);
    log.innerHTML = productos;
})