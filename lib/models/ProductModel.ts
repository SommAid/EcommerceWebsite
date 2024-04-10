// import sequelize from "../postgres";
// const {Sequelize, Model} = require('sequilize');

// const productSchema = sequelize.define('productSchema',{
//     name: {type: Sequelize.STRING, allowNull: false},
//     slug: {type: Sequelize.STRING, allowNull: false, unique:true},
//     category: {type: Sequelize.STRING, allowNull: false},
//     image: {type: Sequelize.STRING, allowNull: false},
//     price: {type: Sequelize.DECIMAL(5,2), allowNull: false},
//     brand: {type: Sequelize.STRING, allowNull: false},
//     rating: {type: Sequelize.DECIMAL(1,2), allowNull: false},
//     numReviews: {type: Sequelize.INT, allowNull: false, defaultValue: 0},
//     countInStock: {type: Sequelize.INT, allowNull: false, defaultValue: 0},
//     description: {type: Sequelize.TEXT, allowNull: false},
//     isFeatured: {type: Sequelize.BOOLEAN, defaultValue: false},
// },
// {
//     timestamps: true
// }
// )

// const ProductModel =
//     sequelize.models.Product || sequelize.model('productSchema')

// export default ProductModel

// export type Product = {
//     _id?: string
//     name: string
//     slug: string
//     image: string
//     banner?: string
//     price: number
//     brand: string
//     description: string
//     category: string 
//     rating: number
//     numReviews: number
//     countInStock: number
//     colors?: []
//     sizes?: []
// }

