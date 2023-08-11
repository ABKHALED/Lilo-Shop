import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../utils/firebaseFunctions";
import { Link } from "react-router-dom";
import { OrderItems } from "../components/index";

function OrdersHistory() {
  const [ordr, setOrder] = useState(null);
  const info = useSelector((state) => state.user.value);
  useEffect(() => {
    const dd = getUserData(info.uid);
    dd.then((res) => setOrder(res));
  }, []);

  return (
    <div className="h-screen  pt-24 w-full relative ">
      <div className=" px-5 md:px-12 w-full">
        <h1 className="text-center text-3xl text-primary font-bold mt-10 mb-10">
          Your Orders History
        </h1>
        <div className="flex flex-col gap-5 p-5 bg-gray-100 rounded-lg ">
          {ordr && ordr.length > 0 ? (
            ordr.map((ele) => {
              return <OrderItems key={ele.id} item={ele} />;
            })
          ) : (
            <div className="w-full flex flex-col p-10 bg-gray-200 rounded-lg">
              <h1 className="text-center text-3xl text-primary font-bold mt-10 mb-10">
                You dont have any order
              </h1>
              <Link
                to="/"
                className="w-[180px] h-[50px] mx-auto text-lg rounded-xl text-primary flex justify-center items-center border border-primary hover:text-white hover:bg-primary transition-all duration-200 ease-in-out"
              >
                RETURN TO SHOP
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersHistory;
