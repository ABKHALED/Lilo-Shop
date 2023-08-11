import React, { useEffect, useState } from "react";
import { orderState, re } from "../utils/firebaseFunctions";
import { MdClose } from "react-icons/md";

import { useSelector } from "react-redux";

function OrdesManItems({ item }) {
  const [totle, setTotal] = useState(0);
  const nothing = useSelector((state) => state.cart.lyzi);

  const sendOrder = () => {
    const data = {
      address: item.address,
      city: item.city,
      dateOfOrder: item.dateOfOrder,
      email: item.email,
      firstName: item.firstName,
      id: item.id,
      items: item.items,
      lastName: item.lastName,
      phone: item.phone,
      sened: true,
      ui: item.ui,
    };
    orderState(item.ui, item.id, data);
  };

  useEffect(() => {
    setTotal(0);
    item.items.map((ele) => {
      if (ele.onSale) {
        return setTotal((prev) => {
          return prev + Number(ele.newPrice) * Number(ele.num);
        });
      } else {
        return setTotal((prev) => {
          return prev + Number(ele.price) * Number(ele.num);
        });
      }
    });
  }, [item]);
  const removeOr = () => {
    re(item.ui, item.id);
  };

  return (
    <div className=" border rounded-md py-2 px-4 shadow-lg">
      {nothing && <div></div>}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b py-3">
          <p className="text-lg">
            Order ID:
            <span className="font-bold"> {item.id}</span>
          </p>
          <p className="text-lg">
            Email:
            <span className="font-bold"> {item.email}</span>
          </p>
          <p className="text-lg">
            Full Name:
            <span className="font-bold">
              {" "}
              {`${item.firstName} ${item.lastName}`}
            </span>
          </p>
          <p className="text-lg">
            Phone:
            <span className="font-bold"> {item.phone}</span>
          </p>
        </div>
        <div className="mb-3 border-b pb-3">
          <h1 className="text-center text-lg text-gray-500 mb-3 ">ITEMS:</h1>
          <div className="flex flex-wrap items-center gap-3 justify-center">
            {item.items.map((ele) => {
              return (
                <div
                  key={ele.id}
                  className="flex flex-col gap-2  justify-center p-3 border"
                >
                  <img
                    src={ele.imgUrl}
                    alt={ele.title}
                    className="w-[80px] h-[80px] border rounded-md"
                  />
                  <p className="text-base text-center font-bold">{ele.title}</p>
                  <p className="text-base text-center">
                    Number: <span className=" font-semibold">{ele.num}P</span>
                  </p>
                  <p className="text-base text-center">
                    Price:{" "}
                    <span className=" font-semibold">
                      {ele.onSale
                        ? Number(ele.num) * Number(ele.newPrice)
                        : Number(ele.num) * Number(ele.price)}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center py-4 gap-4 justify-between flex-wrap ">
            <p className="text-2xl ">
              Total: <span className="font-bold">{totle} DA</span>
            </p>
            {!item.sened ? (
              <button
                onClick={sendOrder}
                className="w-[180px] h-[50px]  text-lg rounded-xl text-primary flex justify-center items-center border border-primary hover:text-white hover:bg-primary transition-all duration-200 ease-in-out"
              >
                SEND ORDER
              </button>
            ) : (
              <div className="flex flex-wrap gap-3 items-center">
                <button
                  disabled
                  className="w-[180px] h-[50px]  text-lg rounded-xl text-white bg-green-600 flex justify-center items-center border "
                >
                  OREDR SENT
                </button>
                <button
                  onClick={removeOr}
                  className=" bg-red-500 w-[30px] h-[30px] rounded-full flex items-center cursor-pointer justify-center"
                >
                  <MdClose className="text-[25px] text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdesManItems;
