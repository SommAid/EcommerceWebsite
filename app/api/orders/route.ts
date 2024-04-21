import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import  { OrderItem } from '@/lib/models/OrderModel' // TODO
import ProductModel from '@/lib/models/ProductModel' //TODO
import { round2 } from '@/lib/utils'
import OrderModel from "@/lib/models/OrderModel";
import UserModel from '@/lib/models/UserModel';

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
    console.log("USER: ", user);

    const user_info = await UserModel.findOne({
      where: {
        email: user.email
      }
    });

    // Calculate prices for the order
    const itemsPrice = payload.itemsPrice;
    const taxPrice = payload.taxPrice;
    const shippingPrice = payload.shippingPrice;
    const totalPrice = payload.totalPrice;
    //const items = JSON.stringify([payload.items.map((x:any) => [x.product_id, x.qty])]);
    const items = JSON.stringify([payload.items]);
    console.log("SHIPPING ADDRESS: ", payload.shippingAddress);

    const newOrder = await OrderModel.create({
      items,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      shippingAddress: JSON.stringify(payload.shippingAddress),
      paymentMethod: payload.paymentMethod,
      user_id: user_info?.dataValues.user_id,
    });

    const most_recent_order = await OrderModel.findOne({
      order: [ [ 'order_id', 'DESC' ]],
    });

    const order_id =  most_recent_order?.dataValues.order_id;
    //console.log("FindAll: ", temp?.dataValues.order_id);

    return Response.json(
      { message: 'Order has been created', order: newOrder, order_id },
      {       status: 201,
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