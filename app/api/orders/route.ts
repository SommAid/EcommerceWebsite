import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import  { OrderItem } from '@/lib/models/OrderModel' // TODO
import ProductModel from '@/lib/models/ProductModel' //TODO
import { round2 } from '@/lib/utils'
import OrderModel from "@/lib/models/OrderModel";

//let OrderModel = require('@/lib/models/OrderModel');

export const POST = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  const { user } = req.auth
  try {
    const payload = await req.json()

    // Calculate prices for the order
    const itemsPrice = payload.itemsPrice;
    const taxPrice = payload.taxPrice;
    const shippingPrice = payload.shippingPrice;
    const totalPrice = payload.totalPrice;
    const items = JSON.stringify([payload.items.map((x:any) => [x.product_id, x.qty])]);

    const newOrder = await OrderModel.create({
      items,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      shippingAddress: JSON.stringify(payload.shippingAddress),
      paymentMethod: payload.paymentMethod,
      user: user._id,
    });



    const temp = await OrderModel.findOne({
      order: [ [ 'order_id', 'DESC' ]],
    });

    const order_id =  temp?.dataValues.order_id;
    //console.log("FindAll: ", temp?.dataValues.order_id);

    return Response.json(
      { message: 'Order has been created', order: newOrder, order_id },
      {
        status: 201,
      }
    )
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    )
  }
}) as any