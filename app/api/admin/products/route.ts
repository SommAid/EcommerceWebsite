import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'
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
    const queryText = 'SELECT * FROM products';
    const { rows: products } = await client.query(queryText);

    //client.release();

    return Response.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json(
      { message: 'An error occurred while fetching products' },
      {
        status: 500,
      }
    );
  }
}) as any;

export const POST = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }

  const {
    name,
    slug,
    image,
    price,
    category,
    brand,
    countInStock,
    description,
    rating,
    numReviews,
  } = await req.json();

  try {

    const queryText = `
      INSERT INTO 
        products(name, slug, image, price, category, brand, count_in_stock, description, rating, num_reviews) 
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
      RETURNING 
        *
    `;

    const values = [
      name,
      slug,
      image,
      price,
      category,
      brand,
      countInStock,
      description,
      rating,
      numReviews,
    ];

    const { rows: [product] } = await client.query(queryText, values);

    //client.release();

    return Response.json({
      message: 'Product created successfully',
      product,
    }, {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return Response.json(
      { message: 'An error occurred while creating product' },
      {
        status: 500,
      }
    );
  }
}) as any;