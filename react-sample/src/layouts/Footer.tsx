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
  const { columnLinks, footerText, paymentMethodLinks, heading, description, socialMediaLinks } = {
    ...FooterDefaults,
    ...props,
  };

  return (
    <footer className="px-global py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 items-start gap-y-6 sm:grid-cols-3 md:gap-y-12 lg:mb-14 lg:flex lg:justify-between lg:w-full">
          <div className="col-span-2 sm:col-span-1 sm:row-span-2 lg:max-w-62">
            <h1 className="font-integral font-bold text-3xl mb-4">{heading}</h1>
            <p className="text-sm mb-6">{description}</p>
            <div className="flex gap-4">
              {socialMediaLinks.map((link, index) => (
                <a key={index} href={link.url}>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          {columnLinks.map((column, index) => (
            <div key={index} className="flex flex-col items-start justify-start">
              <h2 className="mb-3 font-medium text-sm uppercase tracking-[3px]">{column.title}</h2>
              <ul className="flex flex-col gap-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="text-sm">
                    <a href={link.url} className="flex items-center gap-3">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="h-px w-full bg-black/10 mb-4 mt-10 md:mb-6 md:mt-12" />
        <div className="flex flex-col items-center gap-4 text-sm sm:flex-row sm:justify-between">
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
  heading: "SHOP.CO",
  description: "We have clothes that suits your style and which you’re proud to wear. From women to men.",
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
    { url: "#", icon: <FaXTwitter size={28} /> },
    { url: "#", icon: <BiLogoFacebookCircle size={28} /> },
    { url: "#", icon: <BiLogoInstagram size={28} /> },
    { url: "#", icon: <BiLogoYoutube size={28} /> },
  ],
  footerText: "Shop.co © 2000-2023, All Rights Reserved",
  paymentMethodLinks: [
    { url: "#", icon: <FaCcVisa size={40} /> },
    { url: "#", icon: <FaCcMastercard size={40} /> },
    { url: "#", icon: <FaCcPaypal size={40} /> },
    { url: "#", icon: <FaCcApplePay size={40} /> },
    { url: "#", icon: <FaGooglePay size={40} /> },
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
