type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Links = {
  title: string;
  url: string;
};

type ColumnLinks = {
  title: string;
  links: Links[];
};

type SocialMediaLink = {
  url: string;
  icon: React.ReactNode;
};

type PaymentMethodLink = {
  url: string;
  icon: React.ReactNode;
};

export type FooterDefaultProps = {
  logo: ImageProps;
  heading: string;
  description: string;
  columnLinks: ColumnLinks[];
  socialMediaLinks: SocialMediaLink[];
  footerText?: string;
  footerImages: ImageProps[];
  paymentMethodLinks: PaymentMethodLink[];
};

export type FooterProps = React.ComponentPropsWithoutRef<"section"> & Partial<FooterDefaultProps>;
