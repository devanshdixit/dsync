const ProjectBar = () => {
  return (
    <div className="bg-[#0C0C0E]  px-4 py-5 mb-2">
      <div className="flex justify-between flex-col md:flex-row">
        <div className="flex flex-col items-baseline ">
          <div className="flex">
            <div className="flex items-center justify-center mb-1">
              <span className="skeleton-loader rounded-[6px] h-[32px] w-[32px]" />
              <span className="skeleton-loader rounded-[6px] h-[32px] w-[100px] ml-2" />
            </div>
            <div
              className="text-[#858585] flex items-center
               text-[12px] font-[400] ml-[26px] gap-1"
            >
              <span className="skeleton-loader rounded-[6px] h-[10px] w-[10px]" />
              <span className="skeleton-loader rounded-[6px] h-[15px] w-[51px]" />
            </div>
          </div>
          <div className="text-[12px] font-[400] text-[#858585] ">
            <span className="skeleton-loader rounded-[6px] h-[15px] w-[166px]" />
          </div>
        </div>
        <div className="flex flex-col mt-2 md:mt-0 items-end gap-1">
          {/* progress bar */}
          <span className="skeleton-loader rounded-[6px] h-[6px] w-[100%] md:w-[210px]" />
          <div className="text-white text-[12px] font-[400]">
            <span className="skeleton-loader rounded-[6px] h-[20px] w-[100px]" />
          </div>
          <div className="text-white  text-[12px] font-[400] hidden md:flex gap-2 items-center">
            <span className="skeleton-loader rounded-[6px] h-[15px] w-[81px]" />
            <div>
              <span className="skeleton-loader h-[13px] w-[13px] rounded-full" />
            </div>
            <span className="skeleton-loader rounded-[6px] h-[13px] w-[60px]" />
            <span className="skeleton-loader rounded-[6px] h-[13px] w-[60px]" />
          </div>
        </div>
      </div>
      <span className="skeleton-loader rounded-[6px] h-[50px] w-[100%] mt-[26px] " />
      <div className=" text-[#858585] flex flex-row mt-[11px] md:mt-0 justify-between md:gap-0 md:items-center ">
        <div className="flex  items-center gap-2">
          <span className="skeleton-loader rounded-[6px] h-[15px] w-[112px] hidden md:block" />
          <span className="skeleton-loader rounded-full h-[30px] w-[67px]" />
        </div>
        <div className="flex items-center gap-4 text-[16px] z-10 ">
          <div className="underline underline-offset-2 text-[#CECECE] flex items-center gap-2">
            <span className="skeleton-loader rounded-full h-[13px] w-[16px]" />
            <span className="skeleton-loader rounded-[6px] h-[15px] w-[100px]" />
            <span className="skeleton-loader rounded-[6px] h-[15px] w-[31px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBar;
