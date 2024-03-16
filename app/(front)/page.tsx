import Image from "next/image";
import data from "@/lib/data";
import ProductItem from "@/components/products/ProductItem";

export default function Home() {
  // grid: mobile 1 per row, med::screen 3 per row, lrg::screen 4 per row
  return (
    <>
        <h2 className="text-2xl py-2">Latest products</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {
                  data.products.map((product) => (
                      <ProductItem key={product.slug} product={product} />
                  ))}
        </div>
    </>
  );
}
