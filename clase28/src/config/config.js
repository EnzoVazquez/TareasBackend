import dotenv from 'dotenv'

dotenv.config({
    path:'./.env.development'
});

export default {
    app: {
        PORT: process.env.PORT || 8080
    },
    mongo:{
        URL: process.env.MONGO_URL
    }
}