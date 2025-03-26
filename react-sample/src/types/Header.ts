type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type MegaMenuLink = {
  url: string;
  image: ImageProps;
  title: string;
  description: string;
  // button?: ButtonProps;
};

type CategoryLink = {
  title: string;
  links: MegaMenuLink[];
};

export type MegaMenuLinkProps = {
  categoryLinks: CategoryLink[];
  featuredSections: {
    title: string;
    links: MegaMenuLink[];
  };
  // button: ButtonProps;
};

type LinkProps = {
  title: string;
  url: string;
  megaMenu?: MegaMenuLinkProps;
};

export type NavBarDefaultProps = {
  logo: ImageProps;
  links: LinkProps[];
  // buttons: ButtonProps[];
};

export type NavbarProps = React.ComponentPropsWithoutRef<"section"> & Partial<NavBarDefaultProps>;
