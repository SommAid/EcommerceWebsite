
// import { Sequelize } from "sequelize";

// const sequelize = new Sequelize("ddd_proj", "postgres", "293367", {
//     host: "localhost", 
//     dialect: 'postgres',
//     dialectModule: pg,
//     schema:'public'
// })

// export default sequelize

const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "password",
    database: "ddd_proj"
})

module.exports = client

