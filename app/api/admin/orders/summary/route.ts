import dbConnect from '@/lib/dbConnect'
import { auth } from '@/lib/auth'
import OrderModel from '@/lib/models/OrderModel'
import UserModel from '@/lib/models/UserModel'
import ProductModel from '@/lib/models/ProductModel'
import sequelize from '@/lib/postgres'

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

  const ordersCount = await OrderModel.count()
  const productsCount = await ProductModel.count()
  const usersCount = await UserModel.count()

  const ordersPriceGroup = await OrderModel.findAll({
    attributes: [
      [sequelize.fn('SUM', sequelize.col('totalPrice')), 'sales']
    ],
    raw: true
  });
  const ordersPrice =
    ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;

    const salesData = await OrderModel.findAll({
      attributes: [
        // Use sequelize.fn to format the date and group by month and year
        //[sequelize.fn('date_format', sequelize.col('createdAt'), '%Y-%m'), 'monthYear'],
        [sequelize.fn('COUNT', sequelize.col('user_id')), 'totalOrders'],
        [sequelize.fn('SUM', sequelize.col('totalPrice')), 'totalSales']
      ],
      //group: 'monthYear',
      // order: [
      //   // Sort by monthYear in ascending order
      //   ['monthYear', 'ASC']
      // ],
      raw: true
    });
    
    const productsData = await ProductModel.findAll({
      attributes: [
        'category',
        [sequelize.fn('COUNT', sequelize.col('category')), 'totalProducts']
      ],
      group: 'category',
      order: [
        ['category', 'ASC']
      ],
      raw: true
    });
    
    const usersData = await UserModel.findAll({
      attributes: [
        //[sequelize.fn('date_format', sequelize.col('createdAt'), '%Y-%m'), 'monthYear'],
        [sequelize.fn('COUNT', '*'), 'totalUsers']
      ],
      // group: 'monthYear',
      // order: [['monthYear', 'ASC']],
      raw: true
    });

  return Response.json({
    ordersCount,
    productsCount,
    usersCount,
    ordersPrice,
  })
}) as any
