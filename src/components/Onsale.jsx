import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import SingelProduct from "./SingelProduct";
import { Tooltip } from "react-tooltip";

function Onsale() {
  const allItems = useSelector((state) => state.items.jewelryItems);
  let onSale;
  if (allItems) {
    onSale = allItems
      .filter((ele) => {
        return ele.onSale === true;
      })
      .slice(0, 5);
  }
  return (
    <div className="pt-20 w-full h-auto">
      <div className="px-5 md:px-12 w-full">
        <h1 className=" text-2xl  md:text-5xl w-fit mx-auto relative before:content-['']  pb-4 font-bold mb-20 before:absolute before:w-full before:h-[3px] before:bottom-0 before:left-0 before:bg-primary">
          PRODUCTS ON SALE
        </h1>
        <div className="grid grid-cols-1 w-full  sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {onSale && (
            <>
              {onSale.map((ele, i) => {
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Onsale;
