import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/lib/models/UserModel'

export const GET = auth(async (...args: any) => {
  const [req, { params }] = args
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  await dbConnect()
  const user = await UserModel.findOne({
    where: {
      user_id: params.id,
    }
  });

  if (!user) {
    return Response.json(
      { message: 'user not found' },
      {
        status: 404,
      }
    )
  }
  return Response.json(user)
}) as any

export const PUT = auth(async (...p: any) => {
  const [req, { params }] = p
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }

  const { name, email, isAdmin } = await req.json()

  try {
    await dbConnect()
    const user = await UserModel.findOne({
      where: {
        user_id: params.id,
      }
    });

    if (user) {
      await user.update({
        name,
        email,
        isAdmin
      });

      await user.save();

      return Response.json({
        message: 'User updated successfully',
        user,
      })
    } else {
      return Response.json(
        { message: 'User not found' },
        {
          status: 404,
        }
      )
    }
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    )
  }
}) as any

export const DELETE = auth(async (...args: any) => {
  const [req, { params }] = args
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }

  try {
    await dbConnect()
    const user = await UserModel.findOne({
      where: {
        user_id: params.id,
      }
    });

    if (user) {
      if (user.dataValues.isAdmin)
        return Response.json(
          { message: 'User is admin' },
          {
            status: 400,
          }
        )
      await user.destroy()
      return Response.json({ message: 'User deleted successfully' })
    } else {
      return Response.json(
        { message: 'User not found' },
        {
          status: 404,
        }
      )
    }
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    )
  }
}) as any
