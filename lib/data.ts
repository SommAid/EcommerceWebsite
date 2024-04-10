import bcrypt from 'bcryptjs'

// const fetchDataFromDB = cache(async () => {
//     try{
//         const client = await pool.connect()
//         console.log("Connected to DB")

//         const result = await client.query("SELECT * FROM public.items")
//         const data = result.rows;
//         console.log("Fetched data:", data)

//         client.release(); // release the client back to the pool
//         return data;
//     } catch(error){
//         console.error("Error fetching data:", error)
//         throw error
//     }
// })

// fetchDataFromDB()
//     .then(data => {
//         console.log("Received data:", data)
//     })
//     .catch(error => {
//         // Handle the error
//         console.log("Error fetching the data:", error)
//     });

const data = {
    users:[{
        name: 'example admin',
        email: 'exampleAdmin@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
    },
    {
        name: 'example user',
        email: 'exampleUser@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
    }
],

    products: //fetchDataFromDB()
    [
        {
            name: 'Shirt shirt',
            slug: 'shirt-shirt',
            category: "Shirt",
            image: '/images/shirt1.png',
            price: 10,
            brand: 'Nikke',
            rating: 5.5,
            numReviews: 10,
            countInStock: 10,
            description: 'A shirt of all time!',
            isFeatured: true,
            banner: '/images/banner1.png'
        },
    ]
}


export default data