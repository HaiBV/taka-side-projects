export type ImageProps = {
  src: string;
  alt?: string;
};

export type ProductCardProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<{
    url: string;
    image: ImageProps;
    title: string;
    price: number;
    discount: number;
    originPrice: number;
    variant: string;
    rate: number;
  }>;

export type ProductListProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<{
    products: ProductCardProps[];
  }>;
