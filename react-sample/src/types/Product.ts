export type ImageProps = {
  src: string;
  alt?: string;
};

export type ProductCardProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<{
    url: string;
    image: ImageProps;
    title: string;
    originPrice: number;
    price: number;
    discount: number;
    variant: string;
    rate: number;
  }>;
