import { useState } from "react";

import { FaSearch, FaShoppingCart, FaRegUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { NavbarProps } from "@/types/Header";
import { PublicHeaderDefaults } from "@/constants/defaultProps";
import { HamburgerIcon } from "@/components/HamburgerIcon";
import SubMenu from "./SubMenu";

const PublicHeader = (props: NavbarProps) => {
  const { logo, links, heading /* , buttons */ } = {
    ...PublicHeaderDefaults,
    ...props,
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const isMobile = useMediaQuery("(max-width: 991px)");
  const isMobile = false;

  return (
    <section className="relative z-[999] flex w-full items-center justify-between lg:min-h-18 lg:px-global">
      <div className="size-full lg:container lg:mx-auto lg:flex lg:items-center lg:gap-x-10">
        <div className="lg:flex lg:gap-x-10">
          <div className="flex min-h-16 items-center md:min-h-18 lg:min-h-full lg:px-0 px-global">
            <button className="lg:hidden" onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
              <HamburgerIcon isOpen={isMobileMenuOpen} />
            </button>
            <a href={logo.url} className="font-integral font-bold text-2xl leading-none ml-4 mb-1 lg:ml-0">
              {heading}
            </a>
            <div className="flex gap-3 text-2xl ml-auto lg:hidden">
              <button className="">
                <FaSearch />
              </button>
              <button className="">
                <FaShoppingCart />
              </button>
              <button className="">
                <FaRegUserCircle />
              </button>
            </div>
          </div>
          <motion.div
            variants={{
              open: {
                height: "var(--height-open, 100dvh)",
              },
              close: {
                height: "var(--height-closed, 0)",
              },
            }}
            initial="close"
            exit="close"
            animate={isMobileMenuOpen ? "open" : "close"}
            transition={{ duration: 0.4 }}
            className="overflow-auto px-[5%] lg:flex lg:items-center lg:px-0 lg:gap-6 lg:[--height-closed:auto] lg:[--height-open:auto]"
          >
            {links.map((link, index) =>
              link.megaMenu ? (
                <SubMenu key={index} megaMenu={link.megaMenu} title={link.title} isMobile={isMobile} />
              ) : (
                <a
                  key={index}
                  href={link.url}
                  className="block py-3 text-md first:pt-7 lg:px-0 lg:py-6 lg:text-base first:lg:pt-6"
                >
                  {link.title}
                </a>
              )
            )}
            <div className="mt-6 flex w-full flex-col gap-y-4 pb-24 lg:hidden lg:pb-0">
              {/* {buttons.map((button, index) => (
                <Button key={index} className="w-full" {...button}>
                  {button.title}
                </Button>
              ))} */}
            </div>
          </motion.div>
        </div>
        <div className="relative lg:grow hidden lg:flex">
          <FaSearch className="text-black/40 absolute text-2xl left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-grey-primary py-3 pr-4 pl-13 rounded-full grow focus-visible:outline-none"
          />
        </div>
        <div className="hidden text-2xl lg:flex lg:gap-3 lg:ml-auto">
          <button className="">
            <FaShoppingCart />
          </button>
          <button className="">
            <FaRegUserCircle />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PublicHeader;
