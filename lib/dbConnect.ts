import sequelize from "./postgres";

async function dbConnect() {
    try{ 
        await sequelize.authenticate();
        // sequelize.close() if you need to close the connection to the DB
        console.log("Connection has been established!")
    }catch (error){
        console.error('Unable to connect to the database:', error);
    }
}

export default dbConnect

// export default async function dbConnect(){
//     return true
// }

// const myClient = require('./postgres.ts');
// const express = require('express');

// const app = express();

// app.listen(3300, ()=>{
//     console.log("server is now listening at port 3300")
// })

// myClient.connect()

// app.get('/users', (req, res)=>{
//     myClient.query(`Select * from users`, (err, result)=>{
//         if(!err){
//             res.send(result.rows);
//         }
//     });
//     myClient.end;
// })

// const a = app.get('http://localhost:3300/users/', (req, res)=>{
//     myClient.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
//         if(!err){
//             res.send(result.rows);
//         }
//     });
//     myClient.end;
// })

// console.log(a)
