import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
const client = require('../postgres');

export const PUT = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ message: 'Not authenticated' }, { status: 401 })
  }
  const { user } = req.auth;
  console.log("something", user);
  const { name, email, password } = await req.json();
  try {
    const queryText = 'SELECT * FROM users WHERE id = $1';
    const { rows: [dbUser] } = await client.query(queryText, [user._id]);
    if (!dbUser) {
     // client.release();
      return Response.json(
        { message: 'User not found' },
        {
          status: 404,
        }
      );
    }

    dbUser.name = name;
    dbUser.email = email;
    dbUser.password = password ? await bcrypt.hash(password, 5) : dbUser.password;

    const updateQueryText = 'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4';
    await client.query(updateQueryText, [dbUser.name, dbUser.email, dbUser.password, dbUser.id]);

    //client.release();
    return Response.json({ message: 'User has been updated' });
  } catch (err) {
    console.error('Error updating user:', err);
    return Response.json(
      { message: 'An error occurred while updating the user' },
      {
        status: 500,
      }
    );
  }
}) as any;