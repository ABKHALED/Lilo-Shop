import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FullCartItems from "./FullCartItems";
import { Link } from "react-router-dom";

function FullCart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [total, setTotle] = useState(0);
  useEffect(() => {
    setTotle(0);
    cartItems.map((ele) => {
      if (ele.onSale) {
        return setTotle((prev) => {
          return prev + Number(ele.newPrice) * Number(ele.num);
        });
      } else {
        return setTotle((prev) => {
          return prev + Number(ele.price) * Number(ele.num);
        });
      }
    });
  }, [cartItems]);
  return (
    <>
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-auto flex lg:flex-row flex-col gap-4 lg:gap-0 justify-between relative ">
          <div className="w-full lg:w-[69%] border border-primary rounded-lg ">
            <p className="p-3 border-b border-b-primary text-lg text-gray-500 text-center ">
              All cart items
            </p>
            <div className="flex flex-col gap-2 p-3 ">
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map((ele) => {
                  return <FullCartItems key={ele.id} item={ele} />;
                })}
            </div>
          </div>
          <div className="w-full lg:w-[29%] border border-primary rounded-lg h-fit sticky top-[90px] right-0 ">
            <p className="p-3 border-b text-lg text-gray-500 text-center ">
              CART TOTALS
            </p>
            <div className="p-3 border-b text-lg mb-2">
              <div className="flex justify-between items-center mb-2 ">
                <p>Subtotal:</p>
                <p>{total}DA</p>
              </div>
              <div className="flex justify-between items-center mb-2 ">
                <p>Shipping:</p>
                <p>0DA</p>
              </div>
              <div className="flex justify-between items-center mb-2 ">
                <p>Total:</p>
                <p>{total}DA</p>
              </div>
            </div>
            <Link
              to="/vuecart/checkout"
              type="button"
              className=" mb-3 flex w-[220px] h-[50px] mx-auto border-primary border rounded-lg text-primary justify-center items-center hover:text-white hover:bg-primary text-lg font-semibold transition-all duration-200 ease-in-out"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-red-600 text-3xl mb-10 font-bold">
            Your cart is currently empty.
          </h1>
          <Link
            to="/"
            className="w-[180px] h-[50px] mx-auto text-lg rounded-xl text-primary flex justify-center items-center border border-primary hover:text-white hover:bg-primary transition-all duration-200 ease-in-out"
          >
            RETURN TO SHOP
          </Link>
        </div>
      )}
    </>
  );
}

export default FullCart;
