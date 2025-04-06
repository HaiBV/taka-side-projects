import { ProductListProps } from "@/types/Product";
import ProductCard from "@/components/ProductCard";

export default function ProductList(props: ProductListProps) {
  const { products } = props;
  return (
    <div className="grid grid-cols-7 lg:grid-cols-12 gap-4 lg:gap-5">
      {products?.map((product, index) => (
        <div className="col-span-4 lg:col-span-3">
          <ProductCard key={index} {...product} />
        </div>
      ))}
    </div>
  );
}
