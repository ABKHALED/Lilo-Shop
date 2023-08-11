import React from "react";
import im from "../assets/13-141c94fedab74c5b84dbbf7210e9f6a1.jpg";
import { motion } from "framer-motion";

function About() {
  return (
    <div className=" pt-20 w-full min-h-[81.2vh]">
      <div className=" px-5 md:px-12 w-full">
        <h1 className=" text-2xl mt-7  md:text-5xl w-fit mx-auto relative before:content-['']  pb-4 font-bold mb-20 before:absolute before:w-full before:h-[3px] before:bottom-0 before:left-0 before:bg-primary">
          ABOUT US
        </h1>
        <div className="flex  justify-between flex-col md:flex-row gap-4 md:gap-0">
          <motion.div
            transition={{ duration: 0.7, ease: "easeInOut" }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full   md:w-[49%]"
          >
            <img
              src={im}
              alt="img"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          <motion.div
            transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-ful flex flex-col justify-evenly md:w-[49%] gap-4 md:gap-0"
          >
            <p className=" text-base tracking-wider leading-7 text-center md:text-left">
              Sed ut fringilla dolor. Morbi suscipit a nunc eu finibus. Nam
              rutrum mattis velit eget volutpat. Fusce egestas mi urna, id
              pulvinar ipsum dictum eget. Mauris in dolor velit. Vestibulum
              finibus felis non massa commodo molestie at id justo. Quisque
              sollicitudin elit sit amet facilisis euismod. Fusce at arcu sed.
            </p>
            <p className=" text-base tracking-wider leading-7 text-center md:text-left">
              Curabitur ac tortor ut est porta efficitur non sed ante. Donec vel
              gravida dolor. Donec dictum non elit vel congue. Proin at nunc ut
              velit rutrum ornare. Vivamus elementum congue porta.
            </p>
            <p className=" text-base tracking-wider leading-7 text-center md:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              rhoncus eget enim eget tincidunt. In finibus nisi ex, eu interdum
              urna euismod sit amet. Morbi sollicitudin in magna sed tristique.
              Nulla pharetra sapien eros, sit amet bibendum nibh consectetur
              quis.
            </p>
            <p className=" text-base tracking-wider leading-7 text-center md:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              rhoncus eget enim eget tincidunt. In finibus nisi ex, eu interdum
              urna euismod sit amet. Morbi sollicitudin in magna sed tristique.
              Nulla pharetra sapien eros, sit amet bibendum nibh consectetur
              quis.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
