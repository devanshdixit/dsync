import React from "react";

const GeneralChatSec = () => {
  return (
    <div className="bg-[#0C0C0E] px-4 flex flex-col py-2 gap-[8px]">
      <div className=" flex items-center gap-1">
        <span className="skeleton-loader rounded-[6px] h-[19px] w-[19px]" />
        <span className="skeleton-loader rounded-[6px] h-[19px] w-[106px]" />
        <span className="skeleton-loader rounded-[6px] h-[18px] w-[43px]" />
        <span className="skeleton-loader rounded-[6px] h-[15px] w-[72px]" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="skeleton-loader rounded-[6px] h-[12px] w-[180px]" />
        <span className="skeleton-loader rounded-[6px] h-[12px] w-[248px]" />
        <span className="skeleton-loader rounded-[6px] h-[12px] w-[261px]" />
        <span className="skeleton-loader rounded-[6px] h-[12px] w-[80px]" />
      </div>
    </div>
  );
};

export default GeneralChatSec;
