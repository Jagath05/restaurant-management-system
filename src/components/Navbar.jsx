import React, { useState } from "react";
import {
  Search,
  Menu,
  X,
  ChefHat
} from "lucide-react";

import {
  Link,
  NavLink
} from "react-router-dom";

export default function Navbar() {

  const [openMenu, setOpenMenu] =
    useState(false);

  const navStyle =
    ({ isActive }) =>
      `relative px-4 py-2 rounded-full transition-all duration-500 text-[16px]
      ${
        isActive
          ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/20 shadow-lg shadow-yellow-500/10 scale-105"
          : "text-white hover:text-yellow-300 hover:scale-105"
      }`;

  return (

    <nav className="w-full sticky top-0 z-50 border-b border-white/10 bg-[#262235]/95 backdrop-blur-xl">

      <div className="max-w-[1600px] mx-auto px-5 lg:px-10 py-5 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 hover:scale-105 duration-500"
        >

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-700 flex items-center justify-center shadow-lg shadow-yellow-500/20">

            <ChefHat
              size={26}
              className="text-white"
            />

          </div>

          <div>

            <h1 className="text-white text-xl sm:text-2xl font-bold tracking-wide">

              Restaurant

            </h1>

            <p className="text-gray-400 text-xs">

              Premium Dining

            </p>

          </div>

        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex items-center gap-4 xl:gap-4 lg:gap-2 -ml-9 font-medium absolute left-1/2 transform -translate-x-1/2">

          <li>
            <NavLink
              to="/"
              className={navStyle}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/breakfast"
              className={navStyle}
            >
              Menu
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={navStyle}
            >
              About Us
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/reservation"
              className={navStyle}
            >
              Reserve Table
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/order-status"
              className={navStyle}
            >
              Track Order
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/feedback"
              className={navStyle}
            >
              Feedback
            </NavLink>
          </li>

        </ul>

        {/* SEARCH */}
        <div className="hidden md:flex items-center">

          <div className="hidden lg:flex items-center bg-white/5 border border-white/10 px-5 py-3 rounded-2xl w-[290px] xl:w-[340px] shadow-lg hover:border-yellow-500/40 duration-500">

            <Search
              size={20}
              className="text-yellow-400 shrink-0"
            />

            <input
              type="text"
              placeholder="Search foods..."
              className="bg-transparent outline-none text-white placeholder:text-gray-400 w-full ml-4"
            />

          </div>

          <button className="lg:hidden text-white hover:text-yellow-300 duration-300">

            <Search size={26} />

          </button>

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() =>
            setOpenMenu(!openMenu)
          }
          className="lg:hidden text-white hover:text-yellow-300 duration-300"
        >

          {
            openMenu
              ? <X size={30} />
              : <Menu size={30} />
          }

        </button>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          openMenu
            ? "max-h-[700px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >

        <div className="px-6 pb-6 bg-[#262235] border-t border-white/10">

          {/* Mobile Search */}
          <div className="flex items-center bg-white/5 border border-white/10 px-5 py-3 rounded-2xl mt-5">

            <Search
              size={20}
              className="text-yellow-400"
            />

            <input
              type="text"
              placeholder="Search foods..."
              className="bg-transparent outline-none text-white placeholder:text-gray-400 w-full ml-4"
            />

          </div>

          {/* Mobile Links */}
          <ul className="flex flex-col gap-4 mt-8">

            {
              [
                ["Home", "/"],
                ["Menu", "/breakfast"],
                ["About Us", "/about"],
                ["Reserve Table", "/reservation"],
                ["Track Order", "/order-status"],
                ["Feedback", "/feedback"]
              ].map(([name, path]) => (

                <li key={name}>

                  <NavLink
                    to={path}
                    onClick={() =>
                      setOpenMenu(false)
                    }
                    className={navStyle}
                  >

                    {name}

                  </NavLink>

                </li>
              ))
            }

          </ul>

        </div>

      </div>

    </nav>
  );
}