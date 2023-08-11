import React from "react";
import { FaEye } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCart, setCartItem } from "../redux/CartSlice";
function SingelProduct({ items }) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartShow);

  function addtoCart() {
    const there = cartItems.find((ele) => ele.id === items.id);
    if (!there) {
      dispatch(setCartItem([...cartItems, items]));
      localStorage.setItem("cart", JSON.stringify([...cartItems, items]));
      dispatch(setCart(!cart));
    } else {
      toast.warning(`This Item is already in your cart`, {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    }
  }

  return (
    <div className=" group border  w-full mb-4 sm:mb-0 h-[400px] md:h-[500px] relative flex flex-col cursor-pointer   hover:border-gray-200 rounded-lg overflow-hidden hover:shadow-xl   transition-all duration-200 ease-in-out">
      <div className="w-full h-[70%] overflow-hidden">
        <img
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-200 ease-in-out"
          src={items.imgUrl}
          alt="product"
        />
      </div>
      <div className=" h-[30%] flex flex-col items-center justify-evenly  px-5 py-2 text-center">
        <p className=" text-primary  text-xl sm:text-3xl">{items.title}</p>
        {items.onSale ? (
          <div className="flex justify-evenly flex-wrap items-center w-full">
            <span className=" text-sm sm:text-xl text-gray-400 line-through">
              {items.price} DZD
            </span>
            <span className="text-base sm:text-xl text-gray-500">
              {items.newPrice} DZD
            </span>
          </div>
        ) : (
          <span className=" text-base sm:text-xl text-gray-500">
            {items.price} DZD
          </span>
        )}
      </div>
      <div className=" absolute top-3 right-3 flex flex-col gap-4 md:-z-10 md:opacity-0  group-hover:z-10 group-hover:opacity-100 transition-all ease-in-out">
        {+items.stock > 0 && (
          <div
            onClick={addtoCart}
            className=" w-9 h-9 rounded-full drop-shadow-2xl  flex justify-center items-center bg-white"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Add to cart"
            data-tooltip-place="left"
          >
            <MdAddShoppingCart size={22} />
          </div>
        )}
        <Link
          to={`/productInfo/${items.id}`}
          className="w-9 h-9 rounded-full drop-shadow-2xl  flex justify-center items-center bg-white"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="View details"
          data-tooltip-place="left"
        >
          <FaEye size={22} />
        </Link>
      </div>
      {+items.stock <= 0 ? (
        <div className=" absolute top-3 left-3 text-base bg-red-600 text-white font-bold drop-shadow-xl px-4 py-1 rounded-full">
          OUT OF STOCK
        </div>
      ) : (
        items.onSale && (
          <div className=" absolute top-3 left-3 text-base bg-green-600 text-white font-bold drop-shadow-xl px-4 py-1 rounded-full">
            ON SALE
          </div>
        )
      )}
    </div>
  );
}

export default SingelProduct;
