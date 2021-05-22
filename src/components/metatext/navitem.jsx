import React from "react";
import { motion } from "framer-motion";

const NavItem = (props) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <a
        href="/#"
        class="w-20 lg:inline-block hover:text-brand_secondary mt-4 lg:mt-0 lg:mr-8 lg:w-auto"
      >
        {props.children}
      </a>
    </motion.div>
  );
};

export default NavItem;
