import React from "react";
import { motion } from "framer-motion";
import { HashLink as Link } from "react-router-hash-link";

const NavItem = (props) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Link
        smooth
        to={props.href}
        className="w-20 lg:inline-block hover:text-brand_secondary lg:mt-2 lg:mr-8 lg:w-auto"
      >
        {props.children}
      </Link>
    </motion.div>
  );
};

export default NavItem;
