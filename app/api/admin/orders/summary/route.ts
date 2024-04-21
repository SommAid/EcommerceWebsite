import dbConnect from '@/lib/dbConnect'
import { auth } from '@/lib/auth'
const client = require('../postgres');

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }

  try {
    const ordersCountQuery = 'SELECT COUNT(*) FROM orders';
    const productsCountQuery = 'SELECT COUNT(*) FROM products';
    const usersCountQuery = 'SELECT COUNT(*) FROM users';
    const ordersPriceQuery = 'SELECT SUM(total_price) FROM orders';
    const salesDataQuery = `
      SELECT 
        DATE_TRUNC('month', created_at) AS month, 
        COUNT(*) AS total_orders, 
        SUM(total_price) AS total_sales 
      FROM 
        orders 
      GROUP BY 
        month 
      ORDER BY 
        month ASC
    `;
    const productsDataQuery = `
      SELECT 
        category, 
        COUNT(*) AS total_products 
      FROM 
        products 
      GROUP BY 
        category 
      ORDER BY 
        category ASC
    `;
    const usersDataQuery = `
      SELECT 
        DATE_TRUNC('month', created_at) AS month, 
        COUNT(*) AS total_users 
      FROM 
        users 
      GROUP BY 
        month 
      ORDER BY 
        month ASC
    `;

    const [
      ordersCountResult,
      productsCountResult,
      usersCountResult,
      ordersPriceResult,
      salesDataResult,
      productsDataResult,
      usersDataResult,
    ] = await Promise.all([
      client.query(ordersCountQuery),
      client.query(productsCountQuery),
      client.query(usersCountQuery),
      client.query(ordersPriceQuery),
      client.query(salesDataQuery),
      client.query(productsDataQuery),
      client.query(usersDataQuery),
    ]);

    //client.release();

    const ordersCount = parseInt(ordersCountResult.rows[0].count);
    const productsCount = parseInt(productsCountResult.rows[0].count);
    const usersCount = parseInt(usersCountResult.rows[0].count);
    const ordersPrice = parseFloat(ordersPriceResult.rows[0].sum) || 0;
    const salesData = salesDataResult.rows.map(row => ({
      _id: row.month,
      totalOrders: parseInt(row.total_orders),
      totalSales: parseFloat(row.total_sales),
    }));
    const productsData = productsDataResult.rows.map(row => ({
      _id: row.category,
      totalProducts: parseInt(row.total_products),
    }));
    const usersData = usersDataResult.rows.map(row => ({
      _id: row.month,
      totalUsers: parseInt(row.total_users),
    }));

    return Response.json({
      ordersCount,
      productsCount,
      usersCount,
      ordersPrice,
      salesData,
      productsData,
      usersData,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return Response.json(
      { message: 'An error occurred while fetching data' },
      {
        status: 500,
      }
    );
  }
}) as any;