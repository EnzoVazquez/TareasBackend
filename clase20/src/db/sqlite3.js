import knex from 'knex';

const sqlite3 = {
    client: 'sqlite3',
    connection:{
        filename:'ecommerce.sqlite'
    },
    useNullAsDefault: true
}

let db = knex(sqlite3)

try{
    let validation = await db.schema.hasTable('products');
    if(validation){
        console.log('tabla ya existente')
    }else{
        await db.schema.createTable('products',(table)=>{
            table.primary('id');
            table.increments('id');
            table.string('title',50);
            table.integer('price');
            table.string('thumbnail',200)
        });
    }
}catch(err){console.log(err)};

try{
    let validationChat = await db.schema.hasTable('chat');
    if(validationChat){
        console.log('tabla chat ya existente')
    }else{
        await db.schema.createTable('chat',(table)=>{
            table.string('user');
            table.string('message');
            table.string('date')
        });
    }
}catch(err){console.log(err)};

export default db