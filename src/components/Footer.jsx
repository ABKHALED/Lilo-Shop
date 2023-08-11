import React from "react";

function Footer() {
  return (
    <div className=" mt-12 w-full h-auto">
      <div className="px-5 md:px-12 w-full bg-gray-800 py-6">
        <p className=" text-xl text-center text-white">
          Copyright ©{new Date().getFullYear()} All rights reserved | This
          template is made with ❤️ by Khaled
        </p>
      </div>
    </div>
  );
}

export default Footer;
