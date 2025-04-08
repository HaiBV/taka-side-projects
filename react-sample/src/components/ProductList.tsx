import { ProductListProps } from "@/types/Product";
import ProductCard from "@/components/ProductCard";

export default function ProductList(props: ProductListProps) {
  const { products } = props;
  return (
    <div className="overflow-auto">
      <div className="grid grid-cols-7 lg:grid-cols-12 gap-4 lg:gap-5 grid-flow-col w-max auto-cols-fr lg:w-auto">
        {products?.map((product, index) => (
          <div className="col-span-4 lg:col-span-3">
            <ProductCard key={index} {...product} />
          </div>
        ))}
      </div>
    </div>
  );
}
