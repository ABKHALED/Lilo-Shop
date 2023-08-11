import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import DashbordItems from "./DashbordItems";
import "react-tooltip/dist/react-tooltip.css";
import { HashLoader } from "react-spinners";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";
function RemoveItems() {
  const [loding, setLoading] = useState(false);
  const allItems = useSelector((state) => state.items.jewelryItems);
  return (
    <motion.div
      transition={{ ease: "easeOut", duration: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="md:w-[100% - 300px] w-full h-full relative"
    >
      {loding ? (
        <div className=" absolute w-full h-[545px] left-0 top-0 flex justify-center items-center">
          <HashLoader color="#a86e3b" />
        </div>
      ) : (
        <div className="h-full px-14 w-full gap-5 grid grid-cols-1  sm:grid-cols-2 xl:flex xl:flex-col xl:items-center ">
          {allItems &&
            allItems.map((ele) => {
              return (
                <Fragment key={ele.id}>
                  <DashbordItems
                    key={ele.id}
                    func={"delet"}
                    items={ele}
                    setLoading={setLoading}
                  />
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
      )}
    </motion.div>
  );
}

export default RemoveItems;
