import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/lib/models/UserModel'

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json()
  // await dbConnect() TODO
  //const hashedPassword = await bcrypt.hash(password, 5)
  // @ts-ignore
  const newUser = new UserModel({
    name,
    email,
    password: password,
  })
  try {
    await newUser.save()
    return Response.json(
      { message: 'User has been created' },
      {
        status: 201,
      }
    )
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    )
  }
}