import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
const client = require('../../../lib/postgres');
import { round2 } from '@/lib/utils'
import OrderModel, { OrderItem } from '@/lib/models/OrderModel'
import useCartService from '@/lib/hooks/useCartStore'
import UserModel from '@/lib/models/UserModel';

// const calcPrices = (orderItems: any) => {
//
//   // const itemsPrice = round2(
//   //   orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//   // )
//
//   // Calculate the shipping price
//   const shippingPrice = round2(itemsPrice > 100 ? 0 : 10)
//   // Calculate the tax price
//   const taxPrice = round2(Number((0.15 * itemsPrice).toFixed(2)))
//   // Calculate the total price
//   const totalPrice = round2(Test())
//   console.log("TotalPrice: ",totalPrice);
//   return { itemsPrice, shippingPrice, taxPrice, totalPrice }
// }

export const POST = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  const { user } = req.auth;
  console.log("email: ", user['email']);
  try {
    const user_info = await UserModel.findOne(user['email']);
    const User_ID = user_info['customer_id'];
    console.log("User Info: ", user_info);

    const payload = await req.json();
    console.log("Payload: ",payload);

    // Fetch prices of products from the database
    const productIds = payload.items.map((x: any) => x.product_id);
    console.log("ProductIds: ",productIds);
    const queryText = 'SELECT product_id, price FROM product WHERE product_id = ANY($1)';
    const { rows: dbProductPrices } = await client.query(queryText, [productIds]);
    //client.release();

    // Create order items with prices fetched from the database
    const dbOrderItems = payload.items.map((item: any) => {
      const dbProduct = dbProductPrices.find((product: any) => product._id === item._id);
      return {
        ...item,
        product: item._id,
        price: dbProduct ? dbProduct.price : 0, // Set price to 0 if product not found
      };
    });

    // Calculate prices for the order
    const itemsPrice = payload.itemsPrice;
    const taxPrice = payload.taxPrice;
    const shippingPrice = payload.shippingPrice;
    const totalPrice = payload.totalPrice;

    //const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(payload["items"]);

    // Insert the new order into the database
    const insertOrderQuery = `
      INSERT INTO orders (customer_id, orderitems, itemsprice, taxprice, shippingprice, totalprice, shippingaddress, paymentmethod)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const { rows: [createdOrder] } = await client.query(insertOrderQuery, [
      User_ID,
      JSON.stringify([payload.items.map((x:any) => [x.product_id, x.qty])]),
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      JSON.stringify(payload.shippingAddress),
      payload.paymentMethod,
    ]);
    //client.release();
    await client.end();

    return Response.json(
      { message: 'Order has been created', order: createdOrder },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    console.error('Error creating order:', err);
    return Response.json(
      { message: 'An error occurred while creating the order' },
      {
        status: 500,
      }
    );
  }
}) as any;