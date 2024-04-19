
const { Sequelize, DataTypes } = require('sequelize');
import {v4 as uuidv4} from 'uuid'



// Create a connection with the PostgreSQL database
import sequelize from "../postgres";

// Define the Product model
const ProductModel = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: uuidv4()
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  numReviews: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  countInStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  banner: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

// Sync the model with the database
ProductModel.sync();

// Export the model
export default ProductModel;

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
//     sequelize.models.Product// || sequelize.model('productSchema')

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

