import winston from 'winston'

const customLevelsOptions = {
    levels:{
        fatal:0,
        error:1,
        http:2,
        debug:3
    }
}

const logger = winston.createLogger({
    levels:customLevelsOptions.levels,

    transports:[
        new winston.transports.Console({level:'http'}),
        new winston.transports.File({filename:'./errors.log',level:'debug'})
    ]
})

export const addLogger = (req,res,next) =>{
    req.logger = logger
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`);
    next()
}