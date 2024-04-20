import dbConnect from '@/lib/dbConnect'
const client = require('../../../../lib/postgres');
import { auth } from '@/lib/auth'

export const GET = auth(async (req: any) => {
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
    const queryText = 'SELECT * FROM orders WHERE customer_id = $1';
    const { rows: orders } = await client.query(queryText, [user._id]);
    client.release();
    return Response.json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return Response.json(
      { message: 'An error occurred while retrieving the orders' },
      {
        status: 500,
      }
    );
  }
}) as any;
