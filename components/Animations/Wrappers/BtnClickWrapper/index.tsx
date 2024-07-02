import React from "react";
import { motion } from "framer-motion";
import { pageBottomToTop } from "../../PageSwitch";
import { useRouter } from "next/router";

// Page transition parent element

const BtnClickWrapper = ({ children }: any) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }}>
      {children}
    </motion.div>
  );
};

export default BtnClickWrapper;
