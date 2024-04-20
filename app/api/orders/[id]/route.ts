
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
    const { rows } = await client.query('SELECT * FROM orders WHERE id = $1', [params.id]);
    const order = rows[0];
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