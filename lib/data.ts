import bcrypt from 'bcryptjs'
//import {v4 as uuidv4} from 'uuid'


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
    users:[
        {
            user_id: 1,
            name: 'example admin',
            email: 'exampleAdmin@example.com',
            password: '12345',
            isAdmin: true,
        },
        {
            user_id: 2,
            name: 'example user',
            email: 'exampleUser@example.com',
            password: 'Hallow',
            isAdmin: false,
        }
    ],

    products:
    [
        {
            name: 'Anime shirt',
            slug: 'shirt-shirt1',
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
        {
            name: 'Basketball shoes',
            slug: 'shoes-shoes1',
            category: "Footrwear",
            image: '/images/basket_shoes.jpeg',
            price: 30,
            brand: 'Nike',
            rating: 5.5,
            numReviews: 10,
            countInStock: 10,
            description: 'basketball shoes',
            isFeatured: true,
            banner: '/images/basket_shoes.jpeg'
        },
        {
            name: 'brown jacket',
            slug: 'jacket-jacket1',
            category: "jacket",
            image: '/images/brown_jacket.avif',
            price: 89,
            brand: 'TBLO',
            rating: 5.3,
            numReviews: 102,
            countInStock: 120,
            description: 'a cool jacket',
            isFeatured: false,
            banner: '/images/brown_jacket.avif'
        },
        {
            name: 'cargo pants',
            slug: 'pants-pants2',
            category: "pants",
            image: '/images/cargo_pants.webp',
            price: 14,
            brand: 'kke',
            rating: 3.5,
            numReviews: 120,
            countInStock: 130,
            description: 'thats the jacket the someone wore',
            isFeatured: true,
            banner: '/images/cargo_pants.webp'
        },
        {
            name: 'cool mens hoodie',
            slug: 'hoodie-hoodie3',
            category: "hoodie",
            image: '/images/men_hoodie.webp',
            price: 130,
            brand: 'GGDS',
            rating: 5.5,
            numReviews: 130,
            countInStock: 130,
            description: 'a Cool hoodie for men.',
            isFeatured: false,
            banner: '/images/men_hoodie.webp'
        },
        {
            name: 'womens hoodie',
            slug: 'hoodie-hoodie4',
            category: "hoodie",
            image: '/images/women_hoodie.jpg',
            price: 102,
            brand: 'MGM',
            rating: 9.5,
            numReviews: 120,
            countInStock: 1230,
            description: 'the best womens hoodie',
            isFeatured: true,
            banner: '/images/women_hoodie.jpg'
        },
        {
            name: 'cool sports shoes',
            slug: 'shoes-shoes5',
            category: "Footwear",
            image: '/images/sport_shoes.jpg',
            price: 50,
            brand: 'LOKE',
            rating: 2.5,
            numReviews: 130,
            countInStock: 130,
            description: 'Some sports shoes',
            isFeatured: true,
            banner: '/images/sport_shoes.jpg'
        },
    ]
}


export default data