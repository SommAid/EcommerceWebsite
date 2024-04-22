import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/lib/models/UserModel'
import bcrypt from 'bcryptjs'

export const PUT = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ message: 'Not authenticated' }, { status: 401 })
  }
  const { user } = req.auth
  const { name, email, password, address, payment } = await req.json()
  // await dbConnect() TODO
  try {
    const dbUser = await UserModel.findOne({
      where: {
        email: user.email,
      }
    });
    if (!dbUser) {
      return Response.json(
        { message: 'User not found' },
        {
          status: 404,
        }
      )
    }

    console.log("ADDRESSSS: ", address);
    await dbUser.update({
      name: name ? name : dbUser.dataValues.name,
      email: email ? email : dbUser.dataValues.email,
      address: address ? address : dbUser.dataValues.address,
      payment: payment ? payment : dbUser.dataValues.payment,
      password: password ? password : dbUser.dataValues.password,
      isAdmin: user.isAdmin
    });

    await dbUser.save();
    return Response.json({ message: 'User has been updated' })
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    )
  }
}) as any