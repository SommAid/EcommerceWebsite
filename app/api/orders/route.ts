import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
const client = require('../postgres');
import { round2 } from '@/lib/utils'
import OrderModel, { OrderItem } from '@/lib/models/OrderModel'

const calcPrices = (orderItems: OrderItem[]) => {
  // Calculate the items price
  const itemsPrice = round2(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  // Calculate the shipping price
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10)
  // Calculate the tax price
  const taxPrice = round2(Number((0.15 * itemsPrice).toFixed(2)))
  // Calculate the total price
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
  return { itemsPrice, shippingPrice, taxPrice, totalPrice }
}

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
  try {
    const payload = await req.json();

    // Fetch prices of products from the database
    const productIds = payload.items.map((x: any) => x._id);
    const queryText = 'SELECT _id, price FROM products WHERE _id = ANY($1)';
    const { rows: dbProductPrices } = await client.query(queryText, [productIds]);
    client.release();

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
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(dbOrderItems);

    // Insert the new order into the database
    const insertOrderQuery = `
      INSERT INTO orders (items, items_price, tax_price, shipping_price, total_price, shipping_address, payment_method, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const { rows: [createdOrder] } = await client.query(insertOrderQuery, [
      JSON.stringify(dbOrderItems),
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      JSON.stringify(payload.shippingAddress),
      payload.paymentMethod,
      user._id,
    ]);
    client.release();

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