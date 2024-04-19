
const client = require('../postgres');
// const {Sequelize, Model} = require('sequilize');


// const ProductModel =
//     sequelize.models.Product// || sequelize.model('productSchema')

// export default ProductModel


  const fetchDataFromDB = async () => {
    try {
        console.log("Connected to DB")

        const result = await client.query("SELECT * FROM product")
        const data = result.rows.map(row => ({
            name: row.name,
            slug: row.slug,
            category: row.category,
            image: row.image,
            price: row.price,
            brand: row.brand,
            rating: row.rating,
            numReviews: row.numreviews,
            countInStock: row.countinstock,
            description: row.description,
            isFeatured: row.isfeatured,
            banner: row.banner
        }));
        console.log("Fetched data:", data)

        //client.release(); // release the client back to the pool
        return data;
    } catch(error) {
        console.error("Error fetching data:", error)
        throw error
    }
}


 const ProductModel =  fetchDataFromDB()
export default ProductModel

export type Product = {
    _id?: string
    name: string
    slug: string
    image: string
    banner?: string
    price: number
    brand: string
    description: string
    category: string 
    rating: number
    numReviews: number
    countInStock: number
    colors?: []
    sizes?: []
}


  
//   // Define the Product type
//   const Product = {
//     _id?: string,
//     name: string,
//     slug: string,
//     image: string,
//     banner?: string,
//     price: number,
//     brand: string,
//     description: string,
//     category: string,
//     rating: number,
//     numReviews: number,
//     countInStock: number,
//     colors?: [],
//     sizes?: [],
//   };
  
//   // Export the Product type
//   module.exports.Product = Product;