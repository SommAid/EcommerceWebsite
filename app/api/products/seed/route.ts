import data from '@/lib/data'
import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'
import { NextRequest, NextResponse } from 'next/server'
const client = require('../postgres');


const users = [
    { username: 'user1', email: 'user1@example.com' },
    { username: 'user2', email: 'user2@example.com' },
    // Add more users as needed
  ];
  
  const products = [
    { name: 'Product 1', price: 10.99, category: 'Category 1' },
    { name: 'Product 2', price: 20.99, category: 'Category 2' },
    // Add more products as needed
  ];

export const GET = async (request: NextRequest) => {
    try {

      await client.query('BEGIN');
  
      // Seed users
      for (const user of users) {
        await client.query('INSERT INTO users (username, email) VALUES ($1, $2)', [user.username, user.email]);
      }
  
      // Seed products
      for (const product of products) {
        await client.query('INSERT INTO products (name, price, category) VALUES ($1, $2, $3)', [product.name, product.price, product.category]);
      }
  
      await client.query('COMMIT');
      client.release();
  
      return NextResponse.json({
        message: 'Seeded successfully',
        users,
        products,
      });
    } catch (error) {
      console.error('Error seeding database:', error);
      return NextResponse.json(
        { message: 'An error occurred while seeding the database' },
        {
          status: 500,
        }
      );
    }
  };