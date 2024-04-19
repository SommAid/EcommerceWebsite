import Image from "next/image";
import data from "@/lib/data";
import ProductItem from "@/components/products/ProductItem";
import productService from '@/lib/services/productService'

export default async function Home() {
  // grid: mobile 1 per row, med::screen 3 per row, lrg::screen 4 per row
  const latestProds = await productService.getLatest()
  return (
    <>
        <h2 className="text-2xl py-2">Latest products</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {
                  latestProds.map((product) => (
                      <ProductItem key={product.slug} product={product} />
                  ))}
        </div>
    </>
  );
}

