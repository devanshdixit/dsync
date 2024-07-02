import Image from "next/image";
import React from "react";
import Button from "../../Forms/Button";
import classNames from "classnames";

const TaskStartBtn = ({
  handleStartTask,
  starttaskLoading,
}: {
  handleStartTask: Function;
  starttaskLoading: boolean;
}) => {
  return (
    <>
      {starttaskLoading ? (<Button
        title="Start Task"
        className={classNames(
          " text-[#A9FF1C] flex flex-row-reverse px-[26px] py-[10px] gap-5 border-[1px] border-[#A9FF1C] items-center hover:bg-[#242426]",
          "loading"
        )}
        icon={
          <Image src={"/icons/fork.png"} height={12} width={12} alt="fork" />
        }
        onClick={(e: any) => {
          e.preventDefault();

        }}
      />) : (<Button
        title="Start Task"
        className={classNames(
          " text-[#A9FF1C] flex flex-row-reverse px-[26px] py-[10px] gap-5 border-[1px] border-[#A9FF1C] items-center hover:bg-[#242426]",
          starttaskLoading ? "loading" : ""
        )}
        icon={
          <Image src={"/icons/fork.png"} height={12} width={12} alt="fork" />
        }
        onClick={(e: any) => {
          e.preventDefault();
          console.log("start task started");
          
          handleStartTask();
        }}
      />)}
    </>
  );
};

export default TaskStartBtn;
