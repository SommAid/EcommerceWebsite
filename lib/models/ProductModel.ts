
const { Sequelize, DataTypes } = require('sequelize');
import {v4 as uuidv4} from 'uuid';

// Create a connection with the PostgreSQL database
import sequelize from "../postgres";

// Define the Product model
const ProductModel = sequelize.define('Product', {
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: uuidv4()
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
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

