import { motion } from "framer-motion";
import { bottomLineVariants, middleLineVariants, topLineVariants } from "@/constants/motionVariants";

export const HamburgerIcon = ({ isOpen = false }: { isOpen: boolean }) => {
  return (
    <div className="flex size-6 flex-col items-center justify-center">
      <motion.span
        className="my-0.5 h-0.5 w-5 bg-black"
        animate={isOpen ? ["open", "rotatePhase"] : "closed"}
        variants={topLineVariants}
      />
      <motion.span
        className="my-0.5 h-0.5 w-5 bg-black"
        animate={isOpen ? "open" : "closed"}
        variants={middleLineVariants}
      />
      <motion.span
        className="my-0.5 h-0.5 w-5 bg-black"
        animate={isOpen ? ["open", "rotatePhase"] : "closed"}
        variants={bottomLineVariants}
      />
    </div>
  );
};
