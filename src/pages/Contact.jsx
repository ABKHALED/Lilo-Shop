import React from "react";
import { MdLocationOn, MdMail, MdPhone } from "react-icons/md";

function Contact() {
  return (
    <div className=" pt-20 w-full min-h-[81.2vh]">
      <div className=" px-5 md:px-12 w-full">
        <h1 className=" text-2xl mt-7 md:text-5xl w-fit mx-auto relative before:content-['']  pb-4 font-bold mb-20 before:absolute before:w-full before:h-[3px] before:bottom-0 before:left-0 before:bg-primary">
          CONTACT US
        </h1>
        <div className="flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0 ">
          <div className="w-full   md:w-[49%]">
            <h1 className=" font-semibold text-3xl ">MESSAGE US</h1>
            <p className="text-base tracking-wider leading-7 mt-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id leo
              tempor, congue justo at, lobortis orci.
            </p>
            <div className="flex items-center gap-3  mt-6">
              <MdLocationOn className=" text-[25px]" />
              <p className=" text-gray-600 text-base">
                123 Fifth Avenue, New York, NY 10160
              </p>
            </div>
            <div className="flex items-center gap-3  mt-6">
              <MdMail className=" text-[25px]" />
              <p className=" text-gray-600 text-base">contact@info.com</p>
            </div>
            <div className="flex items-center gap-3  mt-6">
              <MdPhone className=" text-[25px]" />
              <p className=" text-gray-600 text-base">9-334-7565-9787</p>
            </div>
          </div>
          <div className="w-full   md:w-[49%]">
            <form
              onSubmit={(e) => e.preventDefault()}
              action=""
              className="flex 2-full flex-col gap-4 p-4 bg-[#faf5f0]"
            >
              <input
                type="text"
                placeholder="First Name"
                className="pl-1 w-full placeholder:italic placeholder:text-slate-400 focus:outline-none text-lg py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="pl-1 w-full placeholder:italic placeholder:text-slate-400 focus:outline-none text-lg py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Email Address"
                className="pl-1 w-full placeholder:italic placeholder:text-slate-400 focus:outline-none text-lg py-2 border rounded-md"
              />
              <textarea
                name=""
                id=""
                placeholder="Description..."
                className="w-full h-[95px] resize-none rounded-lg  border border-slate-400 p-1 focus:outline-none"
              ></textarea>
              <button
                type="submit"
                className="py-2 block mx-auto border border-primary px-4 bg-white font-semibold rounded-lg shadow-md hover:bg-primary hover:text-white duration-200 ease-in-out transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
