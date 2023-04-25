const register = (req,res) =>{
    res.render('register')
}

const login = (req,res) =>{
    res.render('login')
}

const main = (req,res) =>{
    res.render('inicio')
}

export default {
    register,
    login,
    main
}