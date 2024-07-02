import React from "react";
import Button from "../Forms/Button";

const Message = ({ message }: any) => {
  return (
    <>
      <div className="border-[0.2px] border-opacity-50 border-gray-700 bg-[#1A1C20] rounded-[30px] text-white flex flex-col justify-between  py-[30px] px-[60px] gap-[20px]">
        <div className="font-[600] text-[16px] mb-1 text-center font-Balsamiq ">
          Are you sure <br /> want to {message}?
        </div>
        <Button
          title={message === "Connect" ?  message  : "Disconnect"}
          // onClick={() => setComponent("signin")}
          className=" w-fit rounded-md border-[0.1px] border-[#2f2f2f] font-[600] h-[44px] text-center px-[18px] py-[10px] opacity-80 m-auto flex justify-center items-center gap-[13px] font-Balsamiq bg-blue-600 text-[18px] btn capitalize hover:bg-blue-600"
        />
      </div>
    </>
  );
};

export default Message;
