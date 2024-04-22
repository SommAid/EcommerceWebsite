import * as pg from 'pg';
import { Sequelize } from "sequelize";

const ruk = 'password';
const sequelize = new Sequelize("ddd_proj", "postgres", ruk, {
    host: "localhost", 
    dialect: 'postgres',
    dialectModule: pg,
    schema:'public'
})

export default sequelize

// const {Client} = require('pg')

// const client = new Client({
//     host: "localhost",
//     user: "postgres",
//     port: 5432,
//     password: "pass",
//     database: "ddd_proj"
// })

// module.exports = client

