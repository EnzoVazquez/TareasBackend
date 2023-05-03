import nodemailer from 'nodemailer'
import config from '../configs/config.js'

export const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth:{
        user: config.nodemailer.USER,
        pass: config.nodemailer.PWD
    }
});
