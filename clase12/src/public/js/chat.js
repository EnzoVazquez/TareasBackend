const socket = io();

let user;

const chatBox = document.getElementById("chat");

swal.fire({
    title:"Dinos tu mail para ingresar al chat",
    input:"text",
    inputValidator: (value) =>{
        return !value || !value.includes("@") && "necesitamos tu mail para continuar"
    },
    allowOutsideClick:false,
    allowEscapeKey:false,
}).then(result =>{
    user = result.value
})

/*eventos*/
chatBox.addEventListener('keyup',e=>{
    if(e.key === 'Enter'){
        if(chatBox.value.trim().length>0){
            socket.emit('message',{user: user,message: chatBox.value})
            chatBox.value="";
        }
    }
});

socket.on('chatMessages',(data) =>{
    let chatMessages = document.getElementById("data");
    let messages = "";
    data.forEach(message => {
        messages = messages + `<span>${message.date}</span>${message.user}:${message.message}</br>`
    });
    chatMessages.innerHTML = messages;
})