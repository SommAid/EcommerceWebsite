import { NextRequest, NextResponse } from 'next/server';
import data from "@/lib/data";
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';
import ProductModel from '@/lib/models/ProductModel';

export const GET = async (request: NextRequest) => {
  try {
    // Assuming you have data arrays for users and products
    const users = data.users;
    const products = data.products;

    // Connect to the database (assuming you have already set up Sequelize connection)
    dbConnect();

    // Delete existing records
    await UserModel.destroy({ where: {} });
    await ProductModel.destroy({ where: {} });

    // Insert new records
    await UserModel.bulkCreate(users);
    await ProductModel.bulkCreate(products);

    return NextResponse.json({
      message: 'seeded successfully',
      users,
      products,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.error();
  }
};








// import data from "@/lib/data";
// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/lib/models/UserModel";
// import { NextRequest, NextResponse } from "next/server";

// export const GET = async (request: NextRequest) => {
//     const {users, products} = data
//     await dbConnect()
//     console.log('______________________________________________________________________')
//     await UserModel.destroy({
//     //     where: {},
//     //     truncate: true
//     // })
//     await UserModel.bulkCreate(users)

//     // await UserModel.destroy()
//     // await UserModel.bulkCreate(products)

//     // console.log('seeded successfully')
//     return NextResponse.json({
//         message: 'seeded successfully', users, products,
//     })
// }