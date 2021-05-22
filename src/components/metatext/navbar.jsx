import { React, useState } from "react";
import logo from "../../images/logo_icon.png";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function NavBar() {
  const [collapsed, setCollapsed] = useState(false);
  const { width } = useWindowDimensions();
  return (
    <>
      <nav class="flex items-center justify-between flex-wrap p-3 sticky top-0 z-50 bg-white bg-opacity-90">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <a href="#">
            <img src={logo} alt="Computer Society Logo" class="w-12 ml-5" />
          </a>
        </div>
        <div class="block lg:hidden">
          <button
            class="bg-brand_primary flex items-center px-3 py-2 border rounded text-brand_secondary 
          border-brand_secondary hover:bg-brand_secondary hover:text-white hover:border-white"
            onClick={() => setCollapsed(!collapsed)}
          >
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        { (width > 1020 || !collapsed) &&
          <div class="w-full block flex-grow lg:background-black lg:mr-12 lg:flex lg:items-center lg:w-auto">
            <div class=" font-highlight-semibold text-brand_primary  text-lg lg:flex-grow lg:flex lg:justify-end">
              <a
                href="#sect1"
                class="w-20 block lg:inline-block hover:text-brand_secondary mt-4 lg:mt-0 lg:mr-8 lg:w-auto"
              >
                TEST
              </a>
              <a
                href="#sect2"
                class="w-20 block lg:inline-block hover:text-brand_secondary mt-4 lg:mt-0 lg:mr-8 lg:w-auto"
              >
                TEST
              </a>
              <a
                href="#sect3"
                class="w-20 block lg:inline-block hover:text-brand_secondary mt-4 lg:mt-0 lg:mr-8 lg:w-auto"
              >
                TEST
              </a>
              <a
                href="#sect4"
                class="w-20 block lg:inline-block hover:text-brand_secondary mt-4 lg:mt-0 lg:mr-8 lg:w-auto"
              >
                TEST
              </a>
            </div>
          </div>
        }
      </nav>
    </>
  );
}

export default NavBar;
