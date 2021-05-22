import { React, useState, useRef } from "react";
import logo from "../../images/logo_icon.png";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { MenuToggle } from "./menu_toggle";
import { motion } from "framer-motion";
import NavItem from "./navitem"

function NavBar() {
  const [collapsed, setCollapsed] = useState(true);
  const { width, height } = useWindowDimensions();
  const containerRef = useRef(null);
  return (
    <>
      <nav
        class="flex items-start justify-between flex-wrap p-3 sticky top-0 z-50 bg-white bg-opacity-90 
      border-b-4 border-black border-opacity-20 lg:border-none"
      >
        <div class="flex items-center flex-shrink-0 text-white mr-6">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
          <a href="/#">
            <img src={logo} alt="Computer Society Logo" class="w-12 ml-5" />
          </a>
          </motion.div>
        </div>
        <motion.div
          class="mt-1.5 flex-column mr-5"
          animate={!collapsed ? "open" : "closed"}
        >
          <MenuToggle toggle={() => setCollapsed(!collapsed)} />
        </motion.div>
        {(width > 1020 || !collapsed) && (
          <div class="w-full flex-grow lg:mr-12 lg:flex lg:items-center lg:w-auto">
            <div class="font-highlight-semibold text-brand_primary text-lg lg:flex-grow lg:flex lg:justify-end">
              <NavItem>TEST</NavItem>
              <NavItem>TEST</NavItem>
              <NavItem>TEST</NavItem>
              <NavItem>TEST</NavItem>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default NavBar;
