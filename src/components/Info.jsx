import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setCart, setCartItem } from "../redux/CartSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function Info() {
  const { id } = useParams();
  const allItems = useSelector((state) => state.items.jewelryItems);
  const [pro, setPro] = useState(null);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartShow);

  useEffect(() => {
    if (allItems) {
      setPro(allItems.find((ele) => ele.id === id));
    }
  }, [id, []]);
  const navigate = useNavigate();
  const order = () => {
    const there = cartItems.find((ele) => ele.id === pro.id);
    if (!there) {
      dispatch(setCartItem([...cartItems, pro]));
      localStorage.setItem("cart", JSON.stringify([...cartItems, pro]));
      dispatch(setCart(!cart));
    } else {
      toast.warning(`This Item is already in your cart`, {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    }
  };
  return (
    <>
      {pro ? (
        <div>
          <motion.div
            transition={{ ease: "easeOut", duration: 0.7 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20 w-full h-auto"
          >
            <div className="px-5 md:px-12 w-full min-h-[80vh] pt-1">
              <div className="flex flex-col md:flex-row h-full justify-between gap-3 md:gap-0">
                <div className=" w-full md:w-[48%] h-[570px] order-2 md:order-1 ">
                  <img
                    src={pro.imgUrl}
                    alt=""
                    className="w-full h-full object-cover bg-slate-100"
                  />
                </div>
                <div className=" w-full md:w-[49%] h-auto md:h-[570px] order-1 md:order-2 py-3 flex flex-col md:items-start items-center  justify-between">
                  <div className="text-center md:text-start">
                    <span className="text-xl text-gray-500">
                      {pro.category}
                    </span>
                    <h1 className="text-5xl tracking-wider mt-4">
                      {pro.title}
                    </h1>
                    {pro.onSale ? (
                      <div className="flex flex-col  gap-2 mt-5">
                        <div className="flex gap-3 items-center">
                          <span className="no-underline text-xl font-semibold color-black">
                            Old Price:
                          </span>{" "}
                          <p className="text-xl text-gray-400 line-through font-semibold">
                            {pro.price}.00DZD
                          </p>
                        </div>
                        <div className="flex gap-3 items-center">
                          <span className="no-underline text-2xl font-bold color-black">
                            New Price:
                          </span>
                          <p className="text-2xl text-primary font-bold ">
                            {pro.newPrice}
                            .00DZD
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3 items-center mt-5">
                        <span className="no-underline text-2xl font-bold color-black">
                          Price:
                        </span>
                        <p className="text-2xl text-primary font-bold  ">
                          {pro.price}.00DZD
                        </p>
                      </div>
                    )}
                    {pro.stock > 0 ? (
                      <p className=" text-green-600 text-2xl mt-6 font-semibold">
                        {pro.stock} Pice in stock
                      </p>
                    ) : (
                      <p className="text-red-600 text-2xl mt-6 font-semibold">
                        Out of stock
                      </p>
                    )}
                  </div>
                  <p className=" text-base min-h-[150px] text-gray-500 text-center md:text-start leading-8">
                    {pro.discription}
                  </p>
                  <div className=" w-full flex justify-evenly items-center mt-3 md:mt-0 flex-wrap gap-2  ">
                    <button
                      onClick={order}
                      className=" py-2 px-5 border border-primary rounded-2xl font-semibold text-base transition-all hover:bg-primary hover:text-white ease-in-out duration-200"
                      type="button"
                    >
                      Add to cart
                    </button>
                    <button
                      className="py-2 px-5 border border-primary bg-primary text-white rounded-2xl font-semibold text-base transition-all hover:bg-transparent hover:text-black ease-in-out duration-200"
                      type="button"
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      Go back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="h-[81vh]"></div>
      )}
    </>
  );
}

export default Info;
