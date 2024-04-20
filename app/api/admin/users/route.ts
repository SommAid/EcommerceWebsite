import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/lib/models/UserModel'
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

    const queryText = 'SELECT * FROM users';
    const { rows: users } = await client.query(queryText);

    client.release();

    return Response.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return Response.json(
      { message: 'An error occurred while fetching users' },
      {
        status: 500,
      }
    );
  }
}) as any;