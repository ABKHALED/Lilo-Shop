import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { TbDiscount2 } from "react-icons/tb";
import { GiWallet } from "react-icons/gi";
import { MdGppGood } from "react-icons/md";
function WhyChoose() {
  return (
    <div className="pt-20 w-full h-auto">
      <div className="px-5 md:px-12 w-full">
        <h1 className=" text-2xl  md:text-5xl w-fit mx-auto relative before:content-['']  pb-4 font-bold mb-20 before:absolute before:w-full before:h-[3px] before:bottom-0 before:left-0 before:bg-primary">
          WHY CHOOSE US
        </h1>
        <div className="grid grid-cols-1 w-full  sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="w-full h-auto border p-3 rounded-xl">
            <div className="mx-auto w-fit text-gray-600 mb-5">
              <TbDiscount2 size={100} />
            </div>
            <div>
              <span className=" text-center text-gray-500 font-bold text-xl block mb-3">
                BIG DISCOUNTS
              </span>
              <p className=" text-center text-gray-500 leading-7">
                We do big discounts goes from 20% up to 70% we know that our
                customers need to save some money so we casually
              </p>
            </div>
          </div>
          <div className="w-full h-auto border p-3 rounded-xl">
            <div className="mx-auto w-fit text-gray-600 mb-5">
              <FaShippingFast size={100} />
            </div>
            <div>
              <span className=" text-center text-gray-500 font-bold text-xl block mb-3">
                FAST SHIPPING
              </span>
              <p className=" text-center text-gray-500 leading-7">
                You will not wait long , with us you will receive you product as
                soon as possible and the more important thing the shipping will
                be free
              </p>
            </div>
          </div>
          <div className="w-full h-auto border p-3 rounded-xl">
            <div className="mx-auto w-fit text-gray-600 mb-5">
              <GiWallet size={100} />
            </div>
            <div>
              <span className=" text-center text-gray-500 font-bold text-xl block mb-3">
                PAYMENT UPON DELIVERY
              </span>
              <p className=" text-center text-gray-500 leading-7">
                Dont't worry about payment you will pay when you receive your
                product and if you dont like it you can return it immedately
              </p>
            </div>
          </div>
          <div className="w-full h-auto border p-3 rounded-xl">
            <div className="mx-auto w-fit text-gray-600 mb-5">
              <MdGppGood size={100} />
            </div>
            <div>
              <span className=" text-center text-gray-500 font-bold text-xl block mb-3">
                Good quality products
              </span>
              <p className=" text-center text-gray-500 leading-7">
                We are known by our good quality products so don't worry, and if
                the product broke and still in warranty you can get a refund
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChoose;
