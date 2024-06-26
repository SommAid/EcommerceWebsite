import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
import { auth } from '@/lib/auth'

export const GET = auth(async (...request: any) => {
  const [req, { params }] = request
  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  await dbConnect()
  //console.log("ParamsID", request);
  const order = await OrderModel.findAll({
    where: {
      order_id: params.id
    }
  });
  //const order = await OrderModel.findById(params.id)
  return Response.json(order)
}) as any