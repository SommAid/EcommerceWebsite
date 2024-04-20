import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
const client = require('../postgres');

export const PUT = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  try {
    const queryText = 'SELECT * FROM orders WHERE id = $1';
    const { rows: [order] } = await client.query(queryText, [params.id]);

    if (order) {
      if (!order.is_paid) {
        client.release();
        return Response.json(
          { message: 'Order is not paid' },
          {
            status: 400,
          }
        );
      }

      const updateQueryText = 'UPDATE orders SET is_delivered = $1, delivered_at = $2 WHERE id = $3';
      const values = [true, new Date(), params.id];
      await client.query(updateQueryText, values);

      client.release();
      return Response.json(order);
    } else {
      client.release();
      return Response.json(
        { message: 'Order not found' },
        {
          status: 404,
        }
      );
    }
  } catch (err) {
    console.error('Error updating order:', err);
    return Response.json(
      { message: 'An error occurred while updating the order' },
      {
        status: 500,
      }
    );
  }
}) as any;