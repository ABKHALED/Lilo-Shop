import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { SingelProduct } from "../components/index";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function Shop() {
  const [filter, setFilter] = useState("All");
  const { id } = useParams();
  const allItems = useSelector((state) => state.items.jewelryItems);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (allItems) {
      setData(
        allItems.filter(
          (ele) => ele.category.toLowerCase() === id.toLowerCase()
        )
      );
    }
  }, [allItems]);
  useEffect(() => {
    if (allItems && filter === "All") {
      setData(
        allItems.filter(
          (ele) => ele.category.toLowerCase() === id.toLowerCase()
        )
      );
    } else if (allItems && filter === "Sbo") {
      setData(
        allItems
          .filter((ele) => ele.category.toLowerCase() === id.toLowerCase())
          .reverse()
      );
    } else if (allItems && filter === "Sbplth") {
      setData(
        allItems
          .filter((ele) => ele.category.toLowerCase() === id.toLowerCase())
          .sort((a, b) => Number(a.price) - Number(b.price))
      );
    } else if (allItems && filter === "Sbplht") {
      setData(
        allItems
          .filter((ele) => ele.category.toLowerCase() === id.toLowerCase())
          .sort((a, b) => Number(b.price) - Number(a.price))
      );
    } else if (allItems && filter === "Sbstock") {
      setData(
        allItems
          .filter((ele) => ele.category.toLowerCase() === id.toLowerCase())
          .sort((a, b) => Number(b.stock) - Number(a.stock))
      );
    }
  }, [filter, id]);
  return (
    <div className="pt-20 w-full min-h-[100vh]">
      <div className=" px-5 md:px-12 w-full pt-16">
        <div className="flex flex-col gap-4 mb-10 ">
          <p className=" capitalize text-lg text-gray-500">
            Home / <span>{id}</span>
          </p>
          <h1 className=" uppercase text-6xl font-normal tracking-widest pl-2">
            {id}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-3  md:gap-0 justify-between h-full items-center mb-10">
          <p className="text-lg -mb-1 text-gray-500">
            Showing
            <span className="text-black font-bold">
              {" "}
              {data && data.length}{" "}
            </span>
            results
          </p>
          <div>
            <select
              onChange={(e) => setFilter(e.target.value)}
              className=" text-lg cursor-pointer w-[240px]  text-gray-900 rounded-lg focus:outline-dashed block border px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#a86e3b] dark:focus:border-[#a86e3b]"
            >
              <option value="All">All</option>
              <option value="Sbo">Sort by oldest</option>
              <option value="Sbplth">Sort by price: low to high</option>
              <option value="Sbplht">Sort by price: high to low</option>
              <option value="Sbstock">
                Sort by stock quantity : high to low
              </option>
            </select>
          </div>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {data &&
            data.map((ele) => {
              return (
                <Fragment key={ele.id}>
                  <SingelProduct items={ele} />
                  <Tooltip
                    id="my-tooltip"
                    style={{
                      backgroundColor: "#a86e3b",
                      color: "#fff",
                    }}
                  />
                </Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Shop;
