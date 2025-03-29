import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
  FaGooglePay,
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa6";

import { FooterDefaultProps } from "@/types/Footer";
import { FooterProps } from "@/types/Footer";

const Footer = (props: FooterProps) => {
  const { columnLinks, footerText, paymentMethodLinks, heading, description, socialMediaLinks } = {
    ...FooterDefaults,
    ...props,
  };

  return (
    <footer className="mt-12">
      <div className="px-global relative before:content-[''] before:absolute before:top-1/2 before:bottom-0 before:left-0 before:right-0 before:bg-grey-primary before:-z-1">
        <div className="container mx-auto">
          <div className="bg-black rounded-[20px] px-6 py-8 flex flex-col gap-8 lg:flex-row lg:justify-between lg:px-16 lg:py-9 lg:items-center">
            <p className="text-white font-bold font-integral text-[2rem] leading-9 lg:max-w-5/10 lg:text-[2.5rem]">
              STAY UPTO DATE ABOUT OUR LATEST OFFERS
            </p>
            <div className="flex flex-col gap-4 lg:min-w-3/10">
              <div className="relative">
                <FaEnvelope size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
                <input
                  type="text"
                  placeholder="Enter your email address"
                  className="pr-4 py-3 pl-12 bg-white w-full rounded-4xl"
                />
              </div>
              <button className="px-4 py-3 font-medium bg-white w-full rounded-4xl text-center">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-global pb-20 pt-8 bg-grey-primary">
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
      </div>
    </footer>
  );
};

export default Footer;

const FooterDefaults: FooterDefaultProps = {
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
    { url: "#", icon: <FaFacebook size={28} /> },
    { url: "#", icon: <FaInstagram size={28} /> },
    { url: "#", icon: <FaYoutube size={28} /> },
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
