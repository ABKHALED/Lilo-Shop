import React, { useEffect, useState } from "react";
import { items } from "../redux/products";

function OrderItems({ item }) {
  const [total, setTotle] = useState(0);
  useEffect(() => {
    setTotle(0);
    item.items.map((ele) => {
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
  }, [items]);
  return (
    <div className="flex md:flex-row flex-col gap-10 md:gap-5 border-b pb-2">
      <div className=" flex flex-wrap justify-between md:justify-start gap-3 items-center w-full md:w-[25%]  ">
        <p className="text-base  font-bold">Order ID:</p>
        <p className="text-base ">{item.id}</p>
      </div>
      <div className="flex gap-3 items-center justify-between md:justify-start flex-wrap w-full md:w-[38%]">
        <p className="text-base ms:text-2xl font-bold"> Items:</p>
        <div className="flex items-center gap-2 flex-wrap">
          {item.items.map((ele) => {
            return (
              <img
                key={ele.id}
                src={ele.imgUrl}
                alt={ele.title}
                className="w-[60px] h-[60px] object-cover border rounded-md"
              />
            );
          })}
        </div>
      </div>
      <div className="flex w-full flex-row md:justify-start justify-between md:flex-col md:w-[20%] gap-3">
        <div className=" flex flex-wrap gap-2 items-center  ">
          <p className="text-base  font-bold">Total:</p>
          <p className="text-base ">{total}DA</p>
        </div>
        <div className=" flex flex-wrap gap-2 items-center  ">
          <p className="text-base  font-bold">Date:</p>
          <p className="text-base ">{item.dateOfOrder}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-center md:w-[14%] gap-3">
        {item.sened ? (
          <div className="w-[100px] h-[50px] bg-green-600 flex justify-center items-center rounded-xl">
            <p className=" text-white font-semibold ">Order Sent</p>
          </div>
        ) : (
          <div className="w-[100px] h-[50px] bg-red-600 flex justify-center items-center rounded-xl">
            <p className=" text-white font-semibold">Processing</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderItems;
