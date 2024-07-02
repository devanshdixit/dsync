import React from "react";
import { motion } from "framer-motion";
import { cards } from "../../View-all";

// Cards transition parent element

const CardsParentWrapper = ({ children }: any) => {
  return (
    <motion.div variants={cards} initial="hidden" animate="show" exit="hide">
      {children}
    </motion.div>
  );
};

export default CardsParentWrapper;
