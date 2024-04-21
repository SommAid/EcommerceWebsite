const client = require('../../../../lib/postgres');
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

  try {
    console.log("GODDDDDDDDDDDDDDDDDD: ",params);
    const { rows } = await client.query('SELECT * FROM orders WHERE order_id = $1', [params.id]);
    const order = rows[0];
    console.log("HELLLLLLLLLLLLLLL ",order);
    return Response.json(order);
  } catch (error) {
    console.error('Error retrieving order:', error);
    return Response.json(
      { message: 'An error occurred while retrieving the order' },
      {
        status: 500,
      }
    );
  }
}) as any;