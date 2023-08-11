import React from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { NavLink, Route, Routes } from "react-router-dom";
import FullCart from "./FullCart";
import CheckOut from "./CheckOut";
import OrderComplite from "./OrderComplite";

function CartVue() {
  return (
    <div className=" pt-20 w-full min-h-[100vh]">
      <div className=" px-5 md:px-12 w-full pt-16">
        <div className=" mb-10 flex  gap-3 lg:gap-0 flex-wrap items-center justify-start sm:justify-center">
          <NavLink
            to="fullcart"
            className={({ isActive }) =>
              isActive
                ? "group  flex items-center gap-2  text-primary "
                : "group  flex items-center gap-2  text-black "
            }
          >
            <span className="w-[25px] group-hover:text-white transition-all duration-200 ease-in-out group-hover:bg-primary h-[25px] flex items-center justify-center rounded-full bg-gray-400 text-white text-lg font-semibold">
              1
            </span>
            <p className="text-lg lg:text-3xl group-hover:text-primary transition-all duration-200 ease-in-out font-semibold">
              SHOPPING CART
            </p>
          </NavLink>
          <MdOutlineNavigateNext className=" text-gray-400 text-[40px] hidden md:block" />
          <NavLink
            to="checkout"
            className={({ isActive }) =>
              isActive
                ? "group  flex items-center gap-2  text-primary "
                : "group  flex items-center gap-2  text-black "
            }
          >
            <span className="w-[25px] group-hover:text-white transition-all duration-200 ease-in-out group-hover:bg-primary h-[25px] flex items-center justify-center rounded-full bg-gray-400 text-white text-lg font-semibold">
              2
            </span>
            <p className="text-lg lg:text-3xl group-hover:text-primary transition-all duration-200 ease-in-out font-semibold">
              CHECKOUT DETAILS
            </p>
          </NavLink>
          <MdOutlineNavigateNext className=" text-gray-400 text-[40px] hidden md:block" />
          <NavLink
            to="orderCom"
            className={({ isActive }) =>
              isActive
                ? "group  flex items-center gap-2  text-primary "
                : "group  flex items-center gap-2  text-black "
            }
          >
            <span className="w-[25px] group-hover:text-white transition-all duration-200 ease-in-out group-hover:bg-primary h-[25px] flex items-center justify-center rounded-full bg-gray-400 text-white text-lg font-semibold">
              3
            </span>
            <p className="text-lg lg:text-3xl group-hover:text-primary transition-all duration-200 ease-in-out font-semibold">
              ORDER COMPLETE
            </p>
          </NavLink>
        </div>
        <Routes>
          <Route path="fullcart" element={<FullCart />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="orderCom" element={<OrderComplite />} />
        </Routes>
      </div>
    </div>
  );
}

export default CartVue;
