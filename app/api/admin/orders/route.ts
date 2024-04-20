import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
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

    const queryText = `
      SELECT 
        o.*, 
        u.name AS user_name
      FROM 
        orders o
      LEFT JOIN 
        users u ON o.user_id = u.id
      ORDER BY 
        o.created_at DESC
    `;

    const { rows: orders } = await client.query(queryText);

    return Response.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return Response.json(
      { message: 'An error occurred while fetching orders' },
      {
        status: 500,
      }
    );
  }
}) as any;