import { FaXTwitter, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcApplePay, FaGooglePay } from "react-icons/fa6";
import { BiLogoFacebookCircle, BiLogoInstagram, BiLogoLinkedinSquare, BiLogoYoutube } from "react-icons/bi";

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

type Props = {
  logo: ImageProps;
  heading: string;
  description: string;
  columnLinks: ColumnLinks[];
  socialMediaLinks: SocialMediaLink[];
  footerText?: string;
  footerImages: ImageProps[];
  paymentMethodLinks: PaymentMethodLink[];
};

export type FooterProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const Footer = (props: FooterProps) => {
  const { columnLinks, footerText, paymentMethodLinks } = {
    ...FooterDefaults,
    ...props,
  };

  return (
    <footer className="px-global py-20 font-satoshi">
      <div className="container mx-auto">
        <div className="py-12 md:py-18 lg:py-20">
          <div className="h-px w-full bg-black" />
        </div>
        <div className="rb-12 mb-12 grid grid-cols-1 items-start gap-x-8 gap-y-10 sm:grid-cols-3 md:mb-18 md:gap-y-12 lg:mb-20 lg:grid-cols-6">
          {columnLinks.map((column, index) => (
            <div key={index} className="flex flex-col items-start justify-start">
              <h2 className="mb-2 font-semibold">{column.title}</h2>
              <ul>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="py-2 text-sm">
                    <a href={link.url} className="flex items-center gap-3">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="h-px w-full bg-black/10" />
        <div className="flex flex-col items-center gap-4 pt-4 text-sm sm:flex-row sm:justify-between md:pt-8">
          <p>{footerText}</p>
          <div className="flex items-center justify-center gap-3">
            {paymentMethodLinks.map((link, index) => (
              <a key={index} href={link.url}>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterDefaults: Props = {
  logo: {
    url: "#",
    src: "https://d22po4pjz3o32e.cloudfront.net/logo-image.svg",
    alt: "Logo image",
  },
  heading: "Medium length footer heading goes here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  columnLinks: [
    {
      title: "Company",
      links: [
        { title: "About", url: "#" },
        { title: "Features", url: "#" },
        { title: "Works", url: "#" },
        { title: "Career", url: "#" },
      ],
    },
    {
      title: "HELP",
      links: [
        { title: "Customer Support", url: "#" },
        { title: "Delivery Details", url: "#" },
        { title: "Terms & Conditions", url: "#" },
        { title: "Privacy Policy", url: "#" },
      ],
    },
    {
      title: "FAQ",
      links: [
        { title: "Customer Support", url: "#" },
        { title: "Delivery Details", url: "#" },
        { title: "Terms & Conditions", url: "#" },
        { title: "Privacy Policy", url: "#" },
      ],
    },
    {
      title: "RESOURCES",
      links: [
        { title: "Free eBook", url: "#" },
        { title: "Development Tutorial", url: "#" },
        { title: "How to - Blog", url: "#" },
        { title: "Youtube Playlist", url: "#" },
      ],
    },
  ],
  socialMediaLinks: [
    { url: "#", icon: <BiLogoFacebookCircle /* className="size-6" */ /> },
    { url: "#", icon: <BiLogoInstagram /* className="size-6" */ /> },
    { url: "#", icon: <FaXTwitter /* className="size-6 p -0.5" */ /> },
    { url: "#", icon: <BiLogoLinkedinSquare /* className="size-6" */ /> },
    { url: "#", icon: <BiLogoYoutube /* className="size-6" */ /> },
  ],
  footerText: "Shop.co © 2000-2023, All Rights Reserved",
  paymentMethodLinks: [
    { url: "#", icon: <FaCcVisa /> },
    { url: "#", icon: <FaCcMastercard /> },
    { url: "#", icon: <FaCcPaypal /> },
    { url: "#", icon: <FaCcApplePay /> },
    { url: "#", icon: <FaGooglePay /> },
  ],
  footerImages: [
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg",
      alt: "Relume placeholder image",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg",
      alt: "Relume placeholder image",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg",
      alt: "Relume placeholder image",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg",
      alt: "Relume placeholder image",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg",
      alt: "Relume placeholder image",
    },
  ],
};

export default Footer;
