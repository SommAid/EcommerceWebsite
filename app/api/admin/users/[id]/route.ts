import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/lib/models/UserModel'
const client = require('../postgres');

export const GET = auth(async (...args: any) => {
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

    const queryText = 'SELECT * FROM users WHERE id = $1';
    const { rows: [user] } = await client.query(queryText, [params.id]);

    client.release();

    if (!user) {
      return Response.json(
        { message: 'User not found' },
        {
          status: 404,
        }
      )
    }

    return Response.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return Response.json(
      { message: 'An error occurred while fetching user' },
      {
        status: 500,
      }
    );
  }
}) as any;

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

  const { name, email, isAdmin } = await req.json();

  try {
    await dbConnect(pool);

    const client = await pool.connect();

    const queryText = `
      UPDATE 
        users 
      SET 
        name = $1, 
        email = $2, 
        is_admin = $3 
      WHERE 
        id = $4
      RETURNING 
        *
    `;

    const values = [name, email, isAdmin, params.id];

    const { rows: [updatedUser] } = await client.query(queryText, values);

    client.release();

    if (!updatedUser) {
      return Response.json(
        { message: 'User not found' },
        {
          status: 404,
        }
      )
    }

    return Response.json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return Response.json(
      { message: 'An error occurred while updating user' },
      {
        status: 500,
      }
    );
  }
}) as any;

export const DELETE = auth(async (...args: any) => {
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
    await dbConnect(pool);

    const client = await pool.connect();

    const queryText = 'DELETE FROM users WHERE id = $1 RETURNING *';

    const { rows: [deletedUser] } = await client.query(queryText, [params.id]);

    client.release();

    if (!deletedUser) {
      return Response.json(
        { message: 'User not found' },
        {
          status: 404,
        }
      )
    }

    if (deletedUser.is_admin) {
      return Response.json(
        { message: 'User is admin' },
        {
          status: 400,
        }
      )
    }

    return Response.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return Response.json(
      { message: 'An error occurred while deleting user' },
      {
        status: 500,
      }
    );
  }
}) as any;