import React, { useEffect, useState } from "react";
import { getUids, subcol } from "../utils/firebaseFunctions";
import OrdesManItems from "./OrdesManItems";

function OrdersMang() {
  const [allIds, setAllIds] = useState(null);
  const [data, setData] = useState([]);
  const [finel, setFinel] = useState(null);

  const tt = async () => {
    const dd = getUids();
    dd.then((res) =>
      setAllIds(
        res.map((ele) => {
          return ele.id;
        })
      )
    );
  };
  useEffect(() => {
    tt();
  }, []);

  useEffect(() => {
    if (allIds) {
      setData([]);
      allIds.map(async (ele) => {
        const res = await subcol(ele);

        return setData((prev) => [...prev, res]);
      });
    }
  }, [allIds]);
  useEffect(() => {
    setFinel(data.flat());
  }, [data]);

  return (
    <div className="md:w-[100% - 300px] w-full h-auto relative">
      <div className="flex flex-col gap-7 w-full px-2">
        {finel && finel.length > 0 ? (
          finel.map((ele) => {
            return <OrdesManItems key={ele.id} item={ele} />;
          })
        ) : (
          <div className="w-full h-[70vh] flex justify-center items-center">
            <h1 className="text-center font-semibold text-4xl text-gray-400">
              You don't have orders...
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersMang;
