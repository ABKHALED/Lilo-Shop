import React, { useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { getDate, remo } from "../utils/firebaseFunctions";
import { setItems } from "../redux/products";
import { toast } from "react-toastify";
import EditItem from "./EditItem";
function DashbordItems({ func, items, setLoading }) {
  const [edit, setedit] = useState(false);
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const deleteItem = async (id) => {
    setLoading(true);
    try {
      remo(id);
      await getDate().then((res) => {
        dispatch(setItems(res));
        setLoading(false);
      });
      toast.success("Item deleted successfully😊", {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Something went worng: try again😔", {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="w-full h-auto flex flex-col xl:flex-row gap-5 xl:gap-10 xl:items-center p-3 shadow-lg">
      {edit && <EditItem id={id} items={items} setEdit={setedit} />}
      <div className=" w-36 h-36  xl:w-28 xl:h-28 block xl:mx-0 mx-auto">
        <img
          src={items.imgUrl}
          className="w-full h-full object-cover rounded-md object-top"
          alt={items.title}
        />
      </div>
      <div className="flex justify-between items-center  xl:flex-col xl:justify-around xl:w-[200px] xl:items-start">
        <h1 className=" text-3xl mb-3 text-primary">{items.title}</h1>
        <p className="text-base text-gray-500">{items.category}</p>
      </div>
      {items.onSale ? (
        <div className="felx justify-between xl:clex-col xl:justify-around w-[200px] ">
          <p className="text-xl mb-3">
            New Price: <span className="text-bold">{items.newPrice} DZD</span>
          </p>
          <p className=" text-gray-400">
            Old Price : <span className=" line-through">{items.price} DZD</span>
          </p>
        </div>
      ) : (
        <div className="flex items-center w-[200px]">
          <p className="text-xl ">Price: {items.price} DZD</p>
        </div>
      )}
      <div className="flex items-center w-[200px]">
        {parseInt(items.stock) > 0 ? (
          <p className="text-xl text-green-500">In stock: {items.stock} P</p>
        ) : (
          <p className="text-xl text-red-500">Out of Stock</p>
        )}
      </div>
      {func === "delet" ? (
        <div
          className=" cursor-pointer  w-fit mx-auto"
          onClick={() => deleteItem(items.id)}
        >
          <BsFillTrash3Fill
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Delete Item"
            data-tooltip-place="left"
            size={30}
            className="  text-gray-500 hover:text-red-500 duration-200 ease-in-out transition-all"
          />
        </div>
      ) : (
        <div className=" cursor-pointer w-fit mx-auto">
          <MdModeEditOutline
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Edit Item"
            data-tooltip-place="left"
            size={30}
            className=" text-gray-500 hover:text-green-500 duration-200 ease-in-out transition-all"
            onClick={() => {
              setedit(true);
              setId(items.id);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default DashbordItems;
