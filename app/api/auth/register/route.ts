import { NextRequest, NextResponse, Response } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();


  try {
    // Connect to the database
    await dbConnect();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5); // Increase the salt rounds for better security

    // Create a new user instance
    const newUser = {
      name,
      email,
      password: password,
    };

    // Save the new user to the database
    await UserModel.create(newUser);

    return NextResponse.json(
      { message: 'User has been created' },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' },{status:500});
  }
};
