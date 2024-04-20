import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'
import { NextResponse } from 'next/server';
const client = require('../../../../lib/postgres');

export const GET = async (req: any) => {
    try {

      const queryText = 'SELECT DISTINCT category FROM product';
      const { rows: categories } = await client.query(queryText);
      console.log(categories);
      const newcatories = categories.map(row =>(row['category']));
      console.log(newcatories);
      return NextResponse.json(newcatories);
    } catch (error) {
      console.error('Error retrieving categories:', error);
      return Response.json(
        { message: 'An error occurred while retrieving the categories' },
        {
          status: 500,
        }
      );
    }
  };