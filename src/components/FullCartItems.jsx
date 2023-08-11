import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../redux/CartSlice";

function FullCartItems({ item }) {
  const [out, setOut] = useState(false);
  const [number, setNumber] = useState(Number(item.num));
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

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
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center border-b pb-2 justify-between">
      <div className=" mx-auto sm:mx-0 border w-[150px] sm:w-[15%] h-full rounded-md">
        <img
          src={item.imgUrl}
          alt="cartItem"
          className="w-full h-[100px] object-cover rounded-md"
        />
      </div>
      <p className="w-full font-bold sm:w-[10%] h-full flex justify-center sm:justify-start items-center text-2xl text-gray-600">
        {item.title}
      </p>
      <>
        {item.onSale ? (
          <div className="flex justify-between items-center sm:flex-col  gap-3 w-full sm:w-[20%]  ">
            <p className="text-2xl sm:text-xl">price: {item.newPrice}DA</p>
            <div className="flex sm:text-base text-xl items-center  gap-1">
              <span>Olde price:</span>
              <p className=" line-through  text-gray-400">{item.price}DA</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 w-full  sm:w-[20%]">
            <p className="text-xl">Price: {item.price}DA</p>
          </div>
        )}
      </>
      <div className=" w-[60%] sm:w-[20%] h-[40px] border sm:mx-0 mx-auto flex items-center justify-center select-none">
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
      <div className="flex justify-between items-center w-full sm:w-[15%]">
        <p className=" text-xl font-bold sm:text-base">
          {item.onSale ? (
            <>{item.newPrice * item.num}</>
          ) : (
            <>{item.price * item.num}</>
          )}
          DA
        </p>
        <MdClose
          onClick={removeItem}
          size={22}
          className="hover:text-primary transition-all duration-200 ease-in-out cursor-pointer"
        />
      </div>
    </div>
  );
}

export default FullCartItems;
