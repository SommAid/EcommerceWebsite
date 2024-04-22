import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
import { auth } from '@/lib/auth'
import UserModel from "@/lib/models/UserModel";

export const GET = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  const { user } = req.auth
  await dbConnect();
  console.log("USSSSSSSEEEEEEEERRRRRRRRRR: ", user);

  const dbUser = await UserModel.findOne({
    where:
        {email: user.email},
  });
  //console.log("DB USER: ", dbUser);

  const orders = await OrderModel.findAll({
    where: {user_id: dbUser?.dataValues.user_id},
    raw: true
  });

  //console.log("ORDERSSSSS: ", orders);

  return Response.json(orders)
}) as any