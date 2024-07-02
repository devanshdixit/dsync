import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

const VerifyAccount = () => {
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const Sent = () => {
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
    }, 2000);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="m-2 smallMobile:m-0 relative smallMobile:w-[360px] border-[0.2px] border-opacity-50 border-gray-700 bg-[#1A1B1F] rounded-[24px]  text-white flex flex-col justify-between  pt-[36px] pb-[24px] px-4 smallMobile:px-[46px] text-[16px] overflow-hidden items-center gap-[13.6px] ">
        <div className="bg-[#2C2D31] rounded-full w-fit h-fit hover:scale-110 absolute right-[18px] top-[18px]">
          <IoIosClose className="h-7 w-7 opacity-80 cursor-pointer " />
        </div>
        <div className="h-10 w-10 flex justify-center items-center">
          <img src="./images/verify.png" alt="verify" />
        </div>
        <div className="font-[800] text-[18px] text-center font-sans mb-[-10px] leading-[24px]">
          Verify your account
        </div>
        <div className="text-center text-[14px] text-[#FFFFFF99] font-normal">
          To finish connecting, you must sign a message in your wallet to verify
          that you are the owner of this account.
        </div>
        {isError && (
          <div className="text-[14px] text-center text-red-500 font-semibold ">
            Error signing message, please retry!
          </div>
        )}
        <button
          onClick={Sent}
          className={`text-white hover:scale-105 font-sans ${
            isSent ? "bg-[#2C2D31] opacity-60" : "bg-[#3898FF]"
          } rounded-full w-fit px-2 font-bold h-8`}
        >
          {isSent ? "Waiting for signature ..." : "Send message"}
        </button>
        <button className="text-[14px] font-bold text-white opacity-50 font-sans hover:scale-105">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default VerifyAccount;
