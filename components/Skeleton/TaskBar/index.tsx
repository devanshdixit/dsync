import React from "react";

const Taskbar = () => {
  return (
    <div className="bg-[#0C0C0E] p-4 ">
      <div className=" flex items-center gap-1 mb-2">
        <span className="skeleton-loader rounded-[6px] h-[10px] w-[10px]" />
        <span className="skeleton-loader rounded-[6px] h-[15px] w-[51px]" />
      </div>
      <span className="skeleton-loader rounded-[6px] h-[38px] mx-2 smallMobile:mx-0 w-full smallMobile:w-[277px]" />
      <div className=" flex items-center mt-4  font-[400] ] gap-1">
        <span className="skeleton-loader rounded-[6px] h-[18px] w-[18px]" />
        <span className="skeleton-loader rounded-[6px] h-[17px] w-[46px]" />
      </div>
      <div className="flex justify-between smallMobile:items-center mt-[21.75px] smallMobile:flex-row flex-col">
        <div className=" flex items-center   font-[400] ] gap-1">
          <span className="skeleton-loader rounded-[6px] h-[18px] w-[18px]" />
          <span className="skeleton-loader rounded-[6px] h-[15px] w-[96px]" />
        </div>
        <div className=" flex items-center mt-1 smallMobile:mt-0   font-[400] ] gap-1">
          <span className="skeleton-loader rounded-[6px] h-[19.78px] w-[19.78px]" />
          <span className="skeleton-loader rounded-[6px] h-[15px] w-[55px]" />
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
