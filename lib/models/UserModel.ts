// @ts-ignore
const client = require('../postgres');

// Define the User model module
const UserModel = {
    // Method to fetch all users
    findAll: async () => {
        try {
            const query = 'SELECT * FROM customers';
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error fetching customers:', error);
            throw error;
        }
    },

    // Method to find a user by customer_id
    findOne: async (email: any) => {
        try {
            console.log("Before query");
            const query = 'SELECT * FROM customers WHERE email = $1';
            console.log("After query");
            const result = await client.query(query, [email]);
            console.log("After query await");
            console.log(result);

            return result.rows[0];
        } catch (error) {
            console.error('Error fetching customers by ID:', error);
            throw error;
        }
    },

    // Method to create a new user
    create: async (user: any) => {
        try {
            const query = 'INSERT INTO Customers (name, email, password) VALUES ($1, $2, $3) RETURNING *';
            const result = await client.query(query, [user['name'], user['email'],user['password']]);
            // return result.rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

};

module.exports = UserModel;