import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../redux/CartSlice";

function CartItem({ item }) {
  const [number, setNumber] = useState(Number(item.num));
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [out, setOut] = useState(false);
  const dec = () => {
    setOut(false);
    if (number >= 1) {
      setNumber((prev) => prev - 1);
    }
  };
  const removeItem = () => {
    dispatch(
      setCartItem(
        cartItems.filter((ele) => {
          return ele.id !== item.id;
        })
      )
    );
    localStorage.setItem(
      "cart",
      JSON.stringify(
        cartItems.filter((ele) => {
          return ele.id !== item.id;
        })
      )
    );
  };
  const inc = () => {
    if (+item.stock > number) {
      setNumber((prev) => prev + 1);
    } else {
      setOut(true);
    }
  };
  useEffect(() => {
    if (number >= 1) {
      dispatch(
        setCartItem(
          cartItems.map((ele) => {
            return ele.id === item.id
              ? { ...ele, num: number.toString() }
              : ele;
          })
        )
      );
      localStorage.setItem(
        "cart",
        JSON.stringify(
          cartItems.map((ele) => {
            return ele.id === item.id
              ? { ...ele, num: number.toString() }
              : ele;
          })
        )
      );
    } else {
      dispatch(
        setCartItem(
          cartItems.filter((ele) => {
            return ele.id !== item.id;
          })
        )
      );
      localStorage.setItem(
        "cart",
        JSON.stringify(
          cartItems.filter((ele) => {
            return ele.id !== item.id;
          })
        )
      );
    }
  }, [number]);

  return (
    <div className="flex justify-between items-center w-full h-[90px] pb-3 border-b">
      <div className="w-[25%] h-full">
        <img
          src={item.imgUrl}
          alt="item"
          className=" object-cover w-full h-full rounded-md "
        />
      </div>
      <div className=" w-[40%] h-full flex justify-between items-start flex-col">
        <h1 className=" font-semibold text-lg">{item.title}</h1>
        <div className=" flex items-center justify-between w-full h-[45%]  border border-primary">
          <button
            onClick={dec}
            className="cursor-pointer flex justify-center items-center w-full  h-full  border-r border-r-primary hover:bg-green-600 hover:text-white text-primary transition-all duration-200 ease-in-out"
          >
            <AiOutlineMinus />
          </button>
          <span className=" w-full flex justify-center items-center  h-full   border-r text-primary border-r-primary font-bold ">
            {item.num}
          </span>
          {!out ? (
            <button
              onClick={inc}
              className=" w-full h-full cursor-pointer flex justify-center items-center  hover:bg-green-600 hover:text-white text-primary transition-all duration-200 ease-in-out"
            >
              <AiOutlinePlus />
            </button>
          ) : (
            <button className=" w-full h-full cursor-pointer flex justify-center items-center hover:bg-red-600 hover:text-white text-primary transition-all duration-200 ease-in-out">
              <AiOutlinePlus />
            </button>
          )}
        </div>
      </div>
      <div className="w-[30%] flex flex-col items-end h-full justify-between">
        <MdClose
          onClick={removeItem}
          size={22}
          className="hover:text-primary transition-all duration-200 ease-in-out cursor-pointer"
        />
        {item.onSale ? (
          <p className="  text-sm md:text-xl font-semibold ">
            {Number(item.newPrice) * number} DA
          </p>
        ) : (
          <p className="  text-sm md:text-xl font-semibold ">
            {Number(item.price) * number} DA
          </p>
        )}
      </div>
    </div>
  );
}

export default CartItem;
