import { ProductCardProps } from "@/types/Product";
import { FaStar /* FaStarHalf */ } from "react-icons/fa6";

const productData = {
  url: "#",
  image: {
    src: "/products/image-7.png",
    alt: "Relume placeholder image",
  },
  title: "Product name",
  price: "$55",
  variant: "Variant",
  rate: 4,
};

const TOTAL_RATE = 5;

export default function ProductCard(props: ProductCardProps) {
  const { url, image, title, price, rate } = { ...productData, ...props };
  return (
    <a href={url} className="">
      <div className="aspect-square rounded-5 overflow-hidden">
        <img src={image.src} alt={image.alt} className="size-full object-cover " />
      </div>
      <div className="mt-2 lg:mt-4 flex flex-col gap-1 lg:gap-2">
        <h3 className="typo-product-title">{title}</h3>
        <div className="flex gap-3 items-center">
          <div className="flex gap-1">
            {Array(rate)
              .fill(null)
              .map((_, starIndex) => (
                <FaStar key={starIndex} className="size-6 text-star" />
              ))}
          </div>
          <p className="">
            <span>{rate}/</span>
            <span className="text-black/60">{TOTAL_RATE}</span>
          </p>
        </div>
        <div className="typo-product-price">{price}</div>
      </div>
    </a>
  );
}
