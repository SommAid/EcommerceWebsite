// import sequelize from "../postgres";
// const {Sequelize, Model} = require('sequilize');

import sequelize from "../postgres"
import Data from "@/lib/data";
import ProductModel from "@/lib/models/ProductModel";
import UserModel from "@/lib/models/UserModel";
const { Sequelize, DataTypes } = require('sequelize');

// const orderSchema = new sequelize.define(
//   {
//     user: {
//       type: sequelize.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     items: [
//       {
//         product: {
//           type: sequelize.Schema.Types.ObjectId,
//           ref: 'Product',
//           required: true,
//         },
//         name: { type: String, required: true },
//         slug: { type: String, required: true },
//         qty: { type: Number, required: true },
//         image: { type: String, required: true },
//         price: { type: Number, required: true },
//       },
//     ],
//     shippingAddress: {
//       fullName: { type: String, required: true },
//       address: { type: String, required: true },
//       city: { type: String, required: true },
//       postalCode: { type: String, required: true },
//       country: { type: String, required: true },
//     },
//     paymentMethod: { type: String, required: true },
//     paymentResult: { id: String, status: String, email_address: String },
//     itemsPrice: { type: Number, required: true },
//     shippingPrice: { type: Number, required: true },
//     taxPrice: { type: Number, required: true },
//     totalPrice: { type: Number, required: true },
//     isPaid: { type: Boolean, required: true, default: false },
//     isDelivered: { type: Boolean, required: true, default: false },
//     paidAt: { type: Date },
//     deliveredAt: { type: Date },
//   },
//   {
//     timestamps: true,
//   }
// )


const OrderModel = sequelize.define('Order', {
    order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    items: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    itemsPrice: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    taxPrice: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    shippingPrice: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    shippingAddress: {
        type: DataTypes.STRING,
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
})

export default OrderModel

export type Order = {
  _id: string
  items: string,
  shippingAddress: {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  paymentResult?: { id: string; status: string; email_address: string }
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  isPaid: boolean
  isDelivered: boolean
  paidAt?: string
  deliveredAt?: string
    createdAt: string
    updatedAt: string
}

export type OrderItem = {
	name: string
	slug: string
	qty: number
	image: string
	price: number
	color: string
	size: string
}

export type ShippingAddress = {
	fullName: string
	address: string
	city: string
	postalCode: string
	country: string
  }

(async () => {
    try {
        await OrderModel.sync();
        console.log('User model synchronized with the database.');
    } catch (error) {
        console.error('Error syncing User model:', error);
    }
})();