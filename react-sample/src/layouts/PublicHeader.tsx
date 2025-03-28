import { useState } from "react";
import { RxChevronDown /* RxChevronRight */ } from "react-icons/rx";
import { FaSearch, FaShoppingCart, FaRegUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { MegaMenuLinkProps, NavbarProps } from "@/types/Header";
import { PublicHeaderDefaults } from "@/constants/defaultProps";
import { HamburgerIcon } from "@/components/HamburgerIcon";

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
      <div className="size-full lg:container lg:mx-auto lg:flex lg:items-center lg:justify-between">
        <div className="lg:flex">
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
            className="overflow-auto px-[5%] lg:mx-10 lg:flex lg:items-center lg:px-0 lg:gap-6 lg:[--height-closed:auto] lg:[--height-open:auto]"
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
        <div className="hidden text-2xl lg:flex lg:gap-3">
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
const SubMenu = ({ title, isMobile, megaMenu }: { title: string; isMobile: boolean; megaMenu: MegaMenuLinkProps }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className="flex w-full items-center justify-between gap-x-2 py-3 text-center text-md lg:w-auto lg:flex-none lg:justify-start lg:px-0 lg:py-6 lg:text-base"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <motion.span
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          animate={isDropdownOpen ? "rotated" : "initial"}
          transition={{ duration: 0.3 }}
        >
          <RxChevronDown />
        </motion.span>
      </button>
      <motion.div
        variants={{
          open: {
            visibility: "visible",
            opacity: 1,
            height: "var(--height-open, auto)",
          },
          close: {
            visibility: "hidden",
            opacity: "0",
            height: "var(--height-close, 0)",
          },
        }}
        initial="close"
        exit="close"
        animate={isDropdownOpen ? "open" : "close"}
        transition={{ duration: 0.3 }}
        className="bottom-auto left-0 top-full w-full min-w-full max-w-full overflow-hidden bg-white lg:absolute lg:w-[100vw] lg:px-global lg:[--height-close:auto]"
      >
        <div className="mx-auto flex size-full max-w-full items-center justify-between lg:container lg:my-auto">
          <div className="w-full lg:flex">
            <div className="grid flex-1 gap-x-8 gap-y-6 py-4 pr-8 md:grid-cols-2 md:px-0 md:py-8 lg:py-8 lg:pr-8">
              {megaMenu.categoryLinks.map((group, index) => (
                <div key={index} className="grid auto-rows-max grid-cols-1 grid-rows-[max-content] gap-y-2 md:gap-y-4">
                  <h4 className="text-sm font-semibold leading-[1.3]">{group.title}</h4>
                  {group.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="grid w-full grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                    >
                      <div className="flex size-6 flex-col items-center justify-center">
                        <img src={link.image.src} alt={link.image.alt} />
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        <h5 className="font-semibold">{link.title}</h5>
                        <p className="hidden text-sm md:block">{link.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              ))}
            </div>
            <div className="max-w-none relative flex flex-1 p-6 md:py-8 md:pl-8 md:pr-0 lg:max-w-md">
              <div className="relative z-10 grid w-full auto-cols-fr auto-rows-max grid-cols-1 grid-rows-[max-content_max-content] gap-4">
                <h4 className="text-sm font-semibold leading-[1.3]">{megaMenu.featuredSections.title}</h4>
                <div className="grid auto-cols-fr grid-cols-1 grid-rows-[auto_auto] items-start gap-y-2 lg:grid-rows-[auto]">
                  {megaMenu.featuredSections.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="flex auto-cols-fr grid-cols-[0.6fr_1fr] flex-col gap-x-6 py-2 md:grid"
                    >
                      <div className="relative w-full pt-[66.66%]">
                        <img
                          src={link.image.src}
                          alt={link.image.alt}
                          className="absolute inset-0 size-full object-cover"
                        />
                      </div>
                      <div className="rt-4 mt-4 flex flex-col justify-start md:mt-0">
                        <h5 className="mb-1 font-semibold">{link.title}</h5>
                        <p className="text-sm">{link.description}</p>
                        {/* {link.button && (
                          <div className="mt-1.5">
                            <Button {...link.button} className="text-sm underline">
                              {link.button.title}
                            </Button>
                          </div>
                        )} */}
                      </div>
                    </a>
                  ))}
                </div>
                <div className="flex items-center">
                  {/* <Button {...megaMenu.button}>{megaMenu.button.title}</Button> */}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-auto top-0 min-w-full bg-background-secondary lg:min-w-[100vw]" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PublicHeader;
