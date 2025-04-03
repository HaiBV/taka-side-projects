import { ProductCardProps } from "@/types/Product";
import { FaStar /* FaStarHalf */ } from "react-icons/fa6";

const productData = {
  url: "#",
  image: {
    src: "/products/image-7.png",
    alt: "Relume placeholder image",
  },
  title: "Product name",
  originPrice: 160,
  price: 130,
  discount: 30,
  variant: "Variant",
  rate: 4,
};

const TOTAL_RATE = 5;

export default function ProductCard(props: ProductCardProps) {
  const { url, image, title, price, originPrice, discount, rate } = { ...productData, ...props };
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
        <div className="flex gap-1 lg:gap-2 items-center">
          <div className="typo-product-price">${originPrice}</div>
          <div className="typo-product-price text-black/40 line-through decoration-black/40">${price}</div>
          <div className="typo-small py-1.5 px-3.5 leading-none bg-red/10 text-red rounded-16">-{discount}%</div>
        </div>
      </div>
    </a>
  );
}
