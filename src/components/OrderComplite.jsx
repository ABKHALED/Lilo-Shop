import React, { useEffect, useState } from "react";
import { getUserData } from "../utils/firebaseFunctions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function OrderComplite() {
  const [ordr, setOrder] = useState(null);
  const [totle, setTotle] = useState(0);
  const info = useSelector((state) => state.user.value);
  useEffect(() => {
    const dd = getUserData(info.uid);
    dd.then((res) => setOrder(res[0]));
  }, []);

  useEffect(() => {
    if (ordr) {
      setTotle(0);
      ordr.items.map((ele) => {
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
    }
  }, [ordr]);

  return (
    <>
      {ordr ? (
        <div className="pt-4">
          <h1 className=" mb-5 text-center text-2xl font-semibold text-green-600">
            Thank you. Your order has been received.
          </h1>
          <div className=" px-14 py-8 flex justify-between flex-col gap-3 sm:gap-0 sm:flex-row items-center bg-gray-300">
            <div className="flex flex-wrap justify-center items-center gap-2">
              <p className=" text-lg font-semibold">Order Number :</p>
              <p className=" text-base text-gray-500">{ordr.id}</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2">
              <p className=" text-lg font-semibold">Date :</p>
              <p className=" text-base text-gray-500">{ordr.dateOfOrder}</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2">
              <p className=" text-lg font-semibold">Total:</p>
              <p className=" text-base text-gray-500">{totle} DA</p>
            </div>
          </div>
          <p className="text-center text-2xl font-semibold  pt-5 mb-5">
            The is your latest oredr, We will contact you as soon as possible
          </p>
          <div className="flex gap-10 justify-center flex-wrap items-center">
            <Link
              to="/"
              className="w-[180px] h-[50px]  text-lg rounded-xl text-primary flex justify-center items-center border border-primary hover:text-white hover:bg-primary transition-all duration-200 ease-in-out"
            >
              RETURN TO SHOP
            </Link>
            <Link
              to="/ordersHistory"
              className="w-[180px] h-[50px] text-lg rounded-xl text-primary flex justify-center items-center border border-primary hover:text-white hover:bg-primary transition-all duration-200 ease-in-out"
            >
              Orders History
            </Link>
          </div>
        </div>
      ) : (
        <div className="pt-4">
          <div className="px-14 py-8 bg-red-400">
            <h1 className="text-center text-2xl font-semibold text-white ">
              please confirm your order in the previous step
            </h1>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderComplite;
