import * as pg from 'pg';
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("EcomWeb", "postgres", "password", {
    host: "localhost", 
    dialect: 'postgres',
    dialectModule: pg,
    schema:'public'
})

export default sequelize