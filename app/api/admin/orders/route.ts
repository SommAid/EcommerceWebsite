import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
import UserModel from "@/lib/models/UserModel";
import {list} from "postcss";


export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  await dbConnect()
  const orders = await OrderModel.findAll({});
  let list_of_orders = orders.map((x) => JSON.parse(JSON.stringify(x)));
  //console.log("ORDERS: ", list_of_orders);
    // .sort({ createdAt: -1 })
    // .populate('user', 'name')

  let users = [];
  for(let i = 0; i < list_of_orders.length; i++) {
    let temp = await UserModel.findAll({
      where: {
        user_id: list_of_orders[i].user_id
      },
      raw: true
    });
    users.push(temp);
  }

  let names: any = {};
  // @ts-ignore
  //users.forEach((user) => names.push(user[0]['name']));
  users.forEach((user: any) => {
    let key: any = user[0]['user_id'];
    names[key] = user[0]['name'];
  })

  console.log("PRE-SUBMIT NAMES: ", names);

  // @ts-ignore
  //console.log("ROUTE TEST: ", names, list_of_orders);

  return Response.json([list_of_orders, names]);
}) as any
