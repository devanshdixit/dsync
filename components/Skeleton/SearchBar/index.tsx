import React from "react";

const SearchBar = () => {
  return (
    <div className="bg-[#0C0C0E] px-4 flex flex-col py-3 gap-[8px] h-[44px]  w-full mx-2 md:mx-0 md:w-[626px]">
      <div className=" flex items-center gap-2">
        <div>
          <span className="skeleton-loader rounded-[6px] h-[14px] w-[14px]" />
          <span className=" relative left-[-4px] top-[2px] skeleton-loader rounded-[6px] h-[5px] w-[5px]" />
        </div>
        <span className="skeleton-loader rounded-[6px] h-[20px] w-[200px] smallMobile:w-[219px]" />
      </div>
    </div>
  );
};

export default SearchBar;
