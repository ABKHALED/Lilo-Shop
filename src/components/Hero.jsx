import React, { useEffect, useState } from "react";
import bg from "../assets/pexels-git-stephen-gitau-1670723 (1).jpg";
import { Link, json } from "react-router-dom";
import { herodata } from "../utils/firebaseFunctions";
import { HashLoader } from "react-spinners";
function Hero() {
  const [heroData, setHeroData] = useState(null);
  const [loding, setLoading] = useState(true);
  useEffect(() => {
    herodata()
      .then((res) => {
        return res;
      })
      .then((res) => {
        setHeroData(res[0]);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loding ? (
        <div className=" h-screen pt-20 w-full relative flex justify-center items-center">
          <HashLoader color="#a86e3b" />
        </div>
      ) : heroData ? (
        <div className=" h-screen pt-20 w-full relative">
          <img
            src={heroData.imgUrl}
            alt="bg"
            className="w-full h-full object-cover absolute top-0 left-0 "
          />
          <div className=" absolute w-full h-full left-0 top-0 bg-bgColor "></div>
          <div className=" px-5 md:px-12 flex md:justify-start justify-center items-center md:items-center relative h-full">
            <div className="flex flex-col items-center sm:items-start sm:justify-start  gap-3">
              <p className=" text-white text-base">{heroData.subject}</p>
              <h1 className="text-white  text-[40px] font-bold  sm:text-[70px] sm:text-start text-center  max-w-[500px] leading-tight sm:tracking-wide">
                {heroData.title}
              </h1>
              <p className=" text-yellow-50 text-sm sm:text-start text-center w-full sm:max-w-[430px] leading-9">
                {heroData.discription}
              </p>
              <Link
                to={`shop/${heroData.cat}`}
                className="flex items-center justify-center border border-white w-28 h-11 text-lg text-white rounded-sm hover:bg-white transition-all duration-500 font-bold hover:drop-shadow-lg ease-in-out hover:text-black  "
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className=" h-screen pt-20 w-full relative">
          <img
            src={bg}
            alt="bg"
            className="w-full h-full object-cover absolute top-0 left-0 "
          />
          <div className=" absolute w-full h-full left-0 top-0 bg-bgColor "></div>
          <div className=" px-5 md:px-12 flex md:justify-start justify-center items-center md:items-center relative h-full">
            <div className="flex flex-col items-center sm:items-start sm:justify-start  gap-3">
              <p className=" text-white text-base">Welcome 👋</p>
              <h1 className="text-white  text-[40px] font-bold  sm:text-[70px] sm:text-start text-center  max-w-[500px] leading-tight sm:tracking-wide">
                LILO Jewelry Store
              </h1>
              <p className=" text-yellow-50 text-sm sm:text-start text-center w-full sm:max-w-[430px] leading-9">
                In our store you can find Jewelry of all kind from rings to
                neklaces and the most important thing is reasonable price
              </p>
              <Link className="flex items-center justify-center border border-white w-28 h-11 text-lg text-white rounded-sm hover:bg-white transition-all duration-500 font-bold hover:drop-shadow-lg ease-in-out hover:text-black  ">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;
