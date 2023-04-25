console.log('conecte!')
let button = document.getElementById('logout')

button.addEventListener('click',e=>{
    fetch('/api/sessions/logout',{
        method:'GET',
    }).then(window.location.href = 'http://localhost:8080/')
})