import client from "./postgres";

async function dbConnect() {
    try { 
        await client.connect();
        console.log("Connected to PostgreSQL database!");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default dbConnect;
