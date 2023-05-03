export default {
    mongo:{
        URL:process.env.MONGO_URL
    },
    jwt:{
        COOKIE:process.env.JWT_COOKIE,
        SECRET:process.env.JWT_SECRET
    },
    nodemailer:{
        USER:process.env.GMAIL_USER,
        PWD:process.env.GMAIL_PWD
    }
}