import React from "react";

const Submission = () => {
  return (
    <div className="bg-[#0C0C0E] px-4 flex flex-col py-2 gap-[8px]">
      <div className=" flex items-center -ml-3 -mt-1 gap-1">
        <span className="skeleton-loader rounded-[6px] h-[15px] w-[40px]" />
      </div>
      <span className="skeleton-loader rounded-[6px] h-[20px] w-[150px]" />
      <div className="flex justify-start gap-2 smallMobile:items-center smallMobile:flex-row flex-col mt-[2px]">
        <div className=" flex items-center  text-[12px] font-[400] ] gap-1">
          <span className="skeleton-loader rounded-[6px] h-[15px] w-[15px]" />
          <span className="skeleton-loader rounded-[6px] h-[15px] w-[91px]" />
        </div>
        <div className=" flex items-center mt-1 smallMobile:mt-0  text-[12px] font-[400] ] gap-1">
          <span className="skeleton-loader rounded-[6px] h-[15px] w-[91px]" />
        </div>
      </div>
    </div>
  );
};

export default Submission;
