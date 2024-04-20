
const client = require('../postgres');
// const {Sequelize, Model} = require('sequilize');


// const ProductModel =
//     sequelize.models.Product// || sequelize.model('productSchema')

// export default ProductModel


const ProductModel = {
    fetchDataFromDB: async () => {
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
    },

    find: async () => {
        try {
            const query = 'SELECT DISTINCT category FROM product';
            const result = await client.query(query);
            return result.rows[0];
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            throw error;
        }
    },

    find1: async (category) => {
        try {
            const query = 'SELECT * FROM product WHERE category = $1';
            const result = await client.query(query, [category['category']]);
            console.log(category)
            return result.rows[0];
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            throw error;
        }
    }
} 
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