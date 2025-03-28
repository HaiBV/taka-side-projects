import { useState } from "react";
import { motion } from "framer-motion";
import { RxChevronDown /* RxChevronRight */ } from "react-icons/rx";

import { MegaMenuLinkProps } from "@/types/Header";

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

export default SubMenu;