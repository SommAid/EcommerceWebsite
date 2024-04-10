import { Pool }  from 'pg'

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "293367",
    database: "ddd_proj",
})

export default pool