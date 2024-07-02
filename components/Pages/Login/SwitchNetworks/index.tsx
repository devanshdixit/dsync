import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";

const SwitchNetworks = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [isConnected, setisConnected] = useState<boolean>(false);
  const SwitchNetwork = () => {
    setIsConfirm(true);
    setTimeout(() => {
      setisConnected(true);
    }, 2000);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="m-2 smallMobile:m-0 relative smallMobile:w-[360px] border-[0.2px] border-opacity-50 border-gray-700 bg-[#1A1B1F] rounded-[24px]  text-white flex flex-col p-4 text-[16px] overflow-hidden gap-[15.6px] ">
        <div className="bg-[#2C2D31] rounded-full w-fit h-fit hover:scale-110 absolute right-[12px] top-[12px]">
          <IoIosClose className="h-7 w-7 opacity-80 cursor-pointer " />
        </div>
        <div className="font-[900] text-[18px] text-start pl-1  font-sans mb-[-10px]">
          Switch Networks
        </div>
        {!isConnected && (
          <>
            <div className="text-start text-[14px] text-white opacity-60 pl-1 font-semibold">
              Wrong network detected,switch or disconnect to continue
            </div>
            {isError && (
              <div className="text-[14px] pl-1 text-start text-red-500 font-semibold ">
                *Error message....
              </div>
            )}
          </>
        )}
        <div
          onClick={SwitchNetwork}
          className={` border-none capitalize cursor-pointer duration-150 ease-in font-[700] text-[16px] text-start font-sans h-[40px] px-[6px] hover:bg-[#2C2D31] rounded-xl flex justify-between items-center ${
            isConnected && "bg-[#3898FF]"
          }`}
        >
          <p>Polygon</p>
          {isConfirm && (
            <>
              {isConnected ? (
                <div className="flex text-[14px]  flex-row justify-center items-center">
                  Connected
                  <RxDotFilled className="h-[30px] text-green-400 w-[30px]" />
                </div>
              ) : (
                <div className="flex text-[14px]  flex-row justify-center items-center">
                  Confirm in wallet
                  <RxDotFilled className="h-[30px] text-yellow-400 w-[30px]" />
                </div>
              )}
            </>
          )}
        </div>
        {!isConnected && (
          <>
            <div className="border-b-[1px] px-2 -my-[9.5px] border-[#FFFFFF0A]"></div>
            <div
              className={` border-none capitalize cursor-pointer duration-150 ease-in text-start font-sans hover:bg-[#2C2D31] rounded-xl w-full px-[6px] font-bold h-[40px] flex justify-start items-center text-[red] text-[16px] gap-3`}
            >
              <img
                className="h-7 w-7"
                src="./icons/disconnectRed.svg"
                alt="disconnect"
              />
              Disconnect
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SwitchNetworks;
