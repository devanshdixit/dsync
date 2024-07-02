import React from "react";
import Categories from "../Skeleton/Categories";
import ProjectBar from "../Skeleton/ProjectBar";
import SearchBar from "../Skeleton/SearchBar";
import Social from "../Skeleton/Social";
import Taskbar from "../Skeleton/TaskBar";
import TopHeader from "../Skeleton/TopHeader";

const SkeletonFull = () => {
  return (
    <>
      {/* header */}
      <TopHeader />
      <div className="flex bg-[#0C0C0C] justify-center items-start py-[50px] gap-[28px] h-fit">
        {/* left */}
        <div className=" flex flex-col gap-[20px] ">
          <span className="skeleton-loader rounded-[6px] h-[16px] w-[117px]" />
          <div className="ml-[20px] flex flex-col  gap-[15px] ">
            <Taskbar />
            <Taskbar />
          </div>
        </div>
        {/* middle */}
        <div className=" flex flex-col gap-[15px] ">
          <SearchBar />
          <Categories />
          <ProjectBar />
          <ProjectBar />
          <ProjectBar />
          <ProjectBar />
        </div>
        {/* right */}
        <div className=" flex flex-col gap-[15px] ">
          <Social />
          <Social />
        </div>
      </div>
    </>
  );
};

export default SkeletonFull;
