import React from "react";
import { motion } from "framer-motion";

const NavItem = (props) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <a
        href="/#"
        className="w-20 lg:inline-block hover:text-brand_secondary lg:mt-2` lg:mr-8 lg:w-auto"
      >
        {props.children}
      </a>
    </motion.div>
  );
};

export default NavItem;
