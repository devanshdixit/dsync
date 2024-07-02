import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import { RxCopy } from "react-icons/rx";

const Disconnect = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState(false);

  const Copy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative sm:w-[360px] bg-[#24262A] rounded-[24px]   text-white flex flex-col justify-between  p-4 text-[16px] overflow-hidden items-center gap-[4.6752px] ">
        <div className="bg-[#2C2D31] rounded-full w-fit h-fit hover:scale-110 absolute right-[18px] top-[18px]">
          <IoIosClose className="h-7 w-7 opacity-80 cursor-pointer " />
        </div>
        <div className="h-[74px] w-[74px] my-2 flex justify-center items-center">
          <img src="./icons/user.png" alt="Profile" />
        </div>
        <div className="font-[900] text-[18px] text-center font-sans mb-[-0.625rem]">
          OxC3...Ad9
        </div>
        <div className="text-center text-[14px] text-[#FFFFFF99] font-semibold">
          0 MATIC
        </div>
        {isError && (
          <div className="text-[0.75rem] text-center text-red-500 font-semibold mb-2">
            *Error while disconnecting, please retry!
          </div>
        )}
        <div className="flex justify-between items-center gap-3 flex-col smallMobile:flex-row mt-3">
          <button
            onClick={Copy}
            className="btn text-[13px] font-bold text-white  gap-1 rounded-xl border-none bg-[#373A40] hover:bg-[#4c4e54] capitalize font-sans hover:scale-105 p-2 flex flex-col w-[158px] h-[57px]"
          >
            {isCopied ? (
              <>
                <MdOutlineDone className="h-[1.375rem] w-[1.375rem] font-bold" />{" "}
                Copied!
              </>
            ) : (
              <>
                {" "}
                <RxCopy className="h-[1.125rem] w-[1.125rem]" />
                Copy Address{" "}
              </>
            )}
          </button>
          <button className="btn text-[13px] font-bold text-white gap-1 rounded-xl border-none bg-[#373A40] hover:bg-[#4c4e54] capitalize font-sans hover:scale-105 flex flex-col p-2 w-[158px] h-[57px]">
            <img
              className="h-6 w-6"
              src="./icons/disconnectWhite.svg"
              alt="disconnect"
            />
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Disconnect;
