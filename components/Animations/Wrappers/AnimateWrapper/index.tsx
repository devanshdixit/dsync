import React from "react";
import { motion } from "framer-motion";
import { pageBottomToTop } from "../../PageSwitch";
import { useRouter } from "next/router";

// Page transition parent element

const AnimateWrapper = ({ children }: any) => {
  return (
    <motion.div
      variants={pageBottomToTop}
      initial="hidden"
      animate="show"
      exit="hide"
    >
      {children}
    </motion.div>
  );
};

export default AnimateWrapper;
