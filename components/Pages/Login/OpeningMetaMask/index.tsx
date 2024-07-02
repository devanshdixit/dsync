import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdExpandLess } from "react-icons/md";

const OpeningMetaMask = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" relative smallMobile:w-[368px] border-[0.2px] border-opacity-50 border-gray-700 bg-[#1A1B1F] rounded-[30px]  text-white flex flex-col justify-center gap-4 h-[468px]  py-[20px] px-4 smallMobile:px-[40px] text-[16px] overflow-hidden items-center ">
        <div className="bg-[#2C2D31] rounded-full w-fit h-fit hover:scale-110 absolute right-[18px] top-[18px]">
          <IoIosClose className="h-7 w-7 opacity-80 cursor-pointer " />
        </div>
        <MdExpandLess className="hover:scale-110 absolute left-[12px] top-[12px] h-11 w-10 -rotate-90 opacity-80 cursor-pointer text-blue-600 " />
        <div className="h-[44px] w-[44px] border rounded-lg p-[2px] bg-white flex justify-center items-center">
          <img src="./icons/metamask.png" alt="verify" />
        </div>
        <div className="font-[700] text-[18px] text-center font- mb-[-10px]">
          Opening MetaMask...
        </div>
        <div className="text-center text-[14px] text-[#FFFFFF99] font-medium">
          Confirm connection in the extension
        </div>
        <button
          className={`text-white hover:scale-105 font-sans ${
            isLoading ? "bg-transparent opacity-40" : "bg-[#3898FF]"
          } rounded-full w-fit px-4 font-bold h-8`}
        >
          {isLoading ? (
            <img className="h-7 w-7 transform -scale-x-100" src="./images/loading.gif" alt="" />
          ) : (
            "RETRY"
          )}
        </button>
      </div>
    </div>
  );
};

export default OpeningMetaMask;
