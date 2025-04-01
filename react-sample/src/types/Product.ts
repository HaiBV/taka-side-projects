export type ImageProps = {
  src: string;
  alt?: string;
};

export type ProductCardProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<{
    url: string;
    image: ImageProps;
    title: string;
    price: string;
    variant: string;
    rate: number;
  }>;
