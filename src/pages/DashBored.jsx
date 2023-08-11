import React from "react";
import {
  Asid,
  AddItem,
  RemoveItems,
  EditItemes,
  NewCollecion,
  OrdersMang,
} from "../components/index";
import { Route, Routes } from "react-router";
function DashBored() {
  return (
    <div className="min-h-screen  w-full relative flex flex-col md:flex-row overflow-x-hidden">
      <Asid />
      <div className="h-full w-full pt-[112px]">
        <Routes>
          <Route path="/addItem" element={<AddItem />} />
          <Route path="/removeItem" element={<RemoveItems />} />
          <Route path="/editItmes" element={<EditItemes />} />
          <Route path="/newCollection" element={<NewCollecion />} />
          <Route path="/OrdersMangment" element={<OrdersMang />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashBored;
