import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { setCart, setCartItem } from "../redux/CartSlice";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import empty from "../assets/emptyCart.svg";
import { Link } from "react-router-dom";

function Cart() {
  const info = useSelector((state) => state.user.value);
  const cartState = useSelector((state) => state.cart.cartShow);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [total, setTotle] = useState(0);
  const dispatch = useDispatch();
  const ClearCart = () => {
    dispatch(setCartItem([]));
    localStorage.removeItem("cart");
    dispatch(setCart(!cartState));
  };
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
    <motion.div
      transition={{ duration: 0.5, ease: "easeInOut" }}
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      className=" fixed top-0 right-0 h-screen w-screen bg-[#00000099] z-50"
    >
      <div className="h-full w-full md:w-[500px] absolute top-0 right-0 bg-white flex flex-col">
        <div className="flex justify-between items-center border-b px-6 py-3 h-[9%]">
          <p className=" font-semibold text-lg ">Shopping Cart</p>
          {cartItems.length > 0 && (
            <motion.button
              transition={{ duration: 0.5, ease: "easeInOut" }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={ClearCart}
              type="button"
              className=" font-semibold  w-[150px] h-[40px] sm:h-full rounded-xl text-primary flex justify-center items-center border border-primary hover:text-white hover:bg-primary transition-all duration-200 ease-in-out"
            >
              Clear Cart
            </motion.button>
          )}
          <MdClose
            onClick={() => dispatch(setCart(!cartState))}
            size={25}
            className=" cursor-pointer text-black transition-all duration-200 h-fit ease-in-out hover:text-primary "
          />
        </div>
        <div className=" px-4 md:px-6 py-3 overflow-y-scroll h-[63%] sm:h-[75%] flex flex-col gap-2 select-none ">
          {cartItems && cartItems.length > 0 ? (
            cartItems.length > 0 &&
            cartItems.map((ele) => {
              return <CartItem key={ele.id} item={ele} />;
            })
          ) : (
            <>
              <div className="w-full h-[92%] relative">
                <img
                  src={empty}
                  alt="empty-cart"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="h-[8%] w-full flex items-center justify-center  text-xl text-gray-500 font-bold">
                Add some items to your cart
              </p>
            </>
          )}
        </div>
        <div className="px-4 md:px-6 py-3 h-[7%] border-t flex justify-between items-center">
          <p>Subtotal:</p>
          <p>{total} DA</p>
        </div>
        <div className=" h-[21%] sm:h-[9%] px-6 py-3 flex flex-col sm:flex-row items-center justify-between border-t ">
          {info ? (
            cartItems && cartItems.length > 0 ? (
              <>
                <Link
                  to="vuecart/checkout"
                  onClick={() => dispatch(setCart(!cartState))}
                  type="button"
                  className=" font-semibold  w-[150px] h-[40px] sm:h-full rounded-xl text-primary flex justify-center items-center border border-primary hover:text-white hover:bg-primary transition-all duration-200 ease-in-out"
                >
                  CHECKOUT
                </Link>
                <Link
                  onClick={() => dispatch(setCart(!cartState))}
                  to="vuecart/fullcart"
                  className=" font-semibold  w-[150px] h-[40px] sm:h-full rounded-xl text-primary flex justify-center items-center border border-primary hover:text-white hover:bg-primary transition-all duration-200 ease-in-out"
                >
                  VIEW CART
                </Link>
              </>
            ) : (
              <button
                onClick={() => dispatch(setCart(!cartState))}
                className="font-semibold mx-auto w-[150px] h-[40px] sm:h-full rounded-xl text-primary flex justify-center items-center border border-primary hover:text-white hover:bg-primary transition-all duration-200 ease-in-out"
              >
                KEEP SHOPPING
              </button>
            )
          ) : (
            <p className=" text-center w-full font-semibold text-gray-500 text-xl">
              You need to be loged in to check out
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Cart;
