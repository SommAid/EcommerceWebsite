import bcrypt from 'bcryptjs'
import dbConnect from './dbConnect'
const client = require('./postgres');
import pool from "@/lib/dbhandler";
const fetchDataFromDB = async () => {
    try {
        console.log("Connected to DB")
        const  client = await pool.connect();
        const result = await client.query("SELECT * FROM public.items")
        const data = result.rows.map(row => ({
            name: row.name,
            slug: row.slug,
            category: row.category,
            image: row.image,
            price: row.price,
            brand: row.brand,
            rating: row.rating,
            numReviews: row.numReviews,
            countInStock: row.countInStock,
            description: row.description,
            isFeatured: row.isFeatured,
            banner: row.banner
        }));
        console.log("Fetched data:", data)

       // client.release(); // release the client back to the pool
        return data;
    } catch(error) {
        console.error("Error fetching data:", error)
        throw error
    }
}
 export default fetchDataFromDB;

// const data = {
//     users:[{
//         name: 'example admin',
//         email: 'exampleAdmin@example.com',
//         password: bcrypt.hashSync('123456'),
//         isAdmin: true,
//     },
//     {
//         name: 'example user',
//         email: 'exampleUser@example.com',
//         password: bcrypt.hashSync('123456'),
//         isAdmin: false,
//     }
// ],

//     products: 
//     [
//         {
//             name: 'Shirt shirt',
//             slug: 'shirt-shirt',
//             category: "Shirt",
//             image: '/images/shirt1.png',
//             price: 10,
//             brand: 'Nikke',
//             rating: 5.5,
//             numReviews: 10,
//             countInStock: 10,
//             description: 'A shirt of all time!',
//             isFeatured: true,
//             banner: '/images/banner1.png'
//         },

//         {
//             name: 'Shirt shirt',
//             slug: 'shirt-shirt',
//             category: "Shirt",
//             image: '/images/shirt1.png',
//             price: 10,
//             brand: 'Nikke',
//             rating: 5.5,
//             numReviews: 10,
//             countInStock: 10,
//             description: 'A shirt of all time!',
//             isFeatured: true,
//             banner: '/images/banner1.png'
//         },
//     ]
// }


// export default data