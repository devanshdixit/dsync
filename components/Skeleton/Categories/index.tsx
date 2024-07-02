import React from "react";

const Categories = () => {
  return (
    <div className="bg-[#0C0C0E] px-1 flex flex-col w-[778px] py-4 gap-[22px]">
      <span className="skeleton-loader rounded-[6px] h-[20px] w-[79px]" />
      <div className=" flex items-center px-3 gap-[43.75px]">
        <span className="skeleton-loader rounded-[6px] h-[20px] w-[79px]" />
        <span className="skeleton-loader rounded-[6px] h-[20px] w-[51px]" />
        <span className="skeleton-loader rounded-[6px] h-[20px] w-[65px]" />
        <span className="skeleton-loader rounded-[6px] h-[20px] w-[41px]" />
        <span className="skeleton-loader rounded-[6px] h-[20px] w-[54px]" />
      </div>
      <span className="skeleton-loader rounded-[6px] mt-[7px] h-[20px] w-[126px]" />
    </div>
  );
};

export default Categories;
