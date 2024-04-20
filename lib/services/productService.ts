import { cache } from 'react'
import dbConnect from '@/lib/dbConnect'
import ProductModel, { Product } from '@/lib/models/ProductModel'
const client = require('../postgres');

export const revalidate = 3600

// Define SQL queries
const SQL_GET_LATEST = `
  SELECT * FROM product
  ORDER BY product_id DESC
  LIMIT 6;
`;

const SQL_GET_FEATURED = `
  SELECT * FROM product
  WHERE isfeatured like 'true'
  LIMIT 3;
`;

const SQL_GET_BY_SLUG = `
  SELECT * FROM product
  WHERE slug = $1;
`;

// Define functions to execute SQL queries
async function getLatest() {
    await dbConnect();
    const { rows } = await client.query(SQL_GET_LATEST);
    return rows;
  }
  
  async function getFeatured() {
    await dbConnect();
    const { rows } = await client.query(SQL_GET_FEATURED);
    return rows;
  }
  
  async function getBySlug(slug) {
    await dbConnect();
    const { rows } = await client.query(SQL_GET_BY_SLUG, [slug]);
    return rows[0]; // Return the first result (if any)
  }
const PAGE_SIZE = 3
const getByQuery = cache(
  async ({
    q,
    category,
    sort,
    price,
    rating,
    page = '1',
  }: {
    q: string
    category: string
    price: string
    rating: string
    sort: string
    page: string
  }) => {
    await dbConnect()

    const queryFilter =
      q && q !== 'all'
        ? {
            name: {
              $regex: q,
              $options: 'i',
            },
          }
        : {}
    const categoryFilter = category && category !== 'all' ? { category } : {}
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {}
    // 10-50
    const priceFilter =
      price && price !== 'all'
        ? {
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {}
    const order: Record<string, 1 | -1> =
      sort === 'lowest'
        ? { price: 1 }
        : sort === 'highest'
        ? { price: -1 }
        : sort === 'toprated'
        ? { rating: -1 }
        : { _id: -1 }

    const categories = await ProductModel.find()
    const products = await ProductModel.find(
    )
    // const countProducts = await ProductModel.countDocuments({
    //   ...queryFilter,
    //   ...categoryFilter,
    //   ...priceFilter,
    //   ...ratingFilter,
    // })

    return {
      products: products as Product[],
      page,
      pages: Math.ceil(PAGE_SIZE),
      categories,
    }
  }
)

const getCategories = cache(async (category) => {
  await dbConnect()
  const categories = await ProductModel.find()
  return categories
})

const productService = {
  getLatest,
  getFeatured,
  getBySlug,
  getByQuery,
  getCategories,
}
export default productService