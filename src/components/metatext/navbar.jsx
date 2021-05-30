import { React, useState } from "react";
import i18n from "../../i18n/index.js";
import logo from "../../images/logo_nav.png";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { MenuToggle } from "./menu_toggle";
import { motion } from "framer-motion";
import NavItem from "./navitem";
import header from "../../data/header.json";

function NavBar() {
  const [collapsed, setCollapsed] = useState(true);
  const { width } = useWindowDimensions();
  const variants = {
    nonCollapsed: {
      x: 0,
      opacity: 1,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        x: { stiffness: 1000, velocity: -200 },
        display: { stiffness: 1000 },
      },
    },
    closed: {
      x: 30,
      display: "none",
      opacity: 0,
      transition: {
        x: { stiffness: 1000, velocity: -100 },
        display: { stiffness: 1000 },
      },
    },
  };
  return (
    <>
      <nav
        className="flex items-start justify-between flex-wrap p-3 fixed top-0 z-50 bg-white bg-opacity-90 
      border-b-4 border-black border-opacity-20 lg:border-none w-full"
      >
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <a href="/#">
              <img
                src={logo}
                alt="Computer Society Logo"
                className="w-12 ml-5"
              />
            </a>
          </motion.div>
        </div>
        <motion.div
          className="mt-1.5 flex-column mr-5"
          animate={!collapsed ? "open" : "closed"}
        >
          <MenuToggle toggle={() => setCollapsed(!collapsed)} />
        </motion.div>
        <motion.div
          variants={variants}
          animate={
            width > 1020 ? "nonCollapsed" : !collapsed ? "open" : "closed"
          }
          className="w-full flex-grow lg:mr-12 lg:flex lg:items-center lg:w-auto lg:pt-2"
        >
          <div className="font-highlight-semibold text-brand_primary text-lg lg:flex-grow lg:flex lg:justify-end">
            {header.links.map((link, index) => {
              return (
                <NavItem key={index} href={link.href}>
                  {i18n.t(link.text).toUpperCase()}
                </NavItem>
              );
            })}
          </div>
        </motion.div>
      </nav>
    </>
  );
}

export default NavBar;
