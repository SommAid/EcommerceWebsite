import { cache } from "react";
import dbConnect from "../dbConnect";
import ProductModel, { Product } from "../models/ProductModel";

export const revalidate = 3600

const getLatest = cache(async () => {
    await dbConnect()
    const products = await ProductModel.findAll();
    const plainProducts = products.map((product) => product.get({ plain: true }));
    return plainProducts
})

const productService = {
  getLatest
}

export default productService


// const getFeatured = cache(async () => {
//     await dbConnect()
//     const products = await ProductModel.find({ isFeatured: true})
//     return products
// })

// const getBySlug = cache(async (slug: string) => {
//     await dbConnect();
//     const product = await ProductModel.findOne({slug}).lean()
//     return product as Product
// })
