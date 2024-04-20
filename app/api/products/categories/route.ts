import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'
const client = require('../postgres');

export const GET = async (req: any) => {
    try {

      const queryText = 'SELECT DISTINCT category FROM products';
      const { rows: categories } = await client.query(queryText);
      client.release();
      return Response.json(categories);
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