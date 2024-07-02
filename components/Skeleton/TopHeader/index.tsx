import React from "react";

const TopHeader = () => {
  return (
    <div className="bg-[#0C0C0E] px-4 flex flex-row py-8 gap-[8px] h-[44px]  w-full mx-2 md:mx-0  ">
      <div className=" flex justify-between items-center w-full gap-2">
        <span className="skeleton-loader rounded-[6px] h-[35px] w-[80px]" />
        <div className="hidden sm:flex flex-row justify-center items-center gap-5">
          <span className="skeleton-loader rounded-[6px] h-[35px] w-[200px] smallMobile:w-[100px]" />
          <span className="skeleton-loader rounded-[6px] h-[35px] w-[200px] smallMobile:w-[130px]" />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
