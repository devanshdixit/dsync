import Image from "next/image";
import { FC } from "react";
import { BiPurchaseTagAlt } from "react-icons/bi";
import getTokenImage from "../../utils/getTokenImages";

interface TaskDetails {
  taskDetails: any;
}

const SubmissionTaskDetails: FC<TaskDetails> = ({ taskDetails }) => {
  return (
    <>
      <div className="mb-3 p-4 flex flex-col gap-3 bg-[#0C0C0E]">
        {taskDetails.tag && (
          <div className="flex justify-start items-center gap-1  text-[#858585] font-Inter font-normal">
            <BiPurchaseTagAlt />
            {taskDetails.tag}
          </div>
        )}
        <div className="flex justify-between">
          <div className="max-w-[330px]">
            <div className="text-white font-normal text-[16px]">
              {taskDetails.title}
            </div>
            <p className="font-normal text-[12px] text-[#CECECE] opacity-50">
              {taskDetails.description}
            </p>
          </div>
          <div className="flex gap-3">
            {taskDetails?.amount !== "0" && (
              <div className="flex justify-center  min-w-[30px] items-center h-[30px] gap-3 border border-[#ffffff33] px-1 text-white">
                <div>{getTokenImage(taskDetails.amount)}</div>
                <div>{taskDetails.amount}</div>
              </div>
            )}
            <div className="bg-[#FFE60480] bg-opacity-50 w-fit h-[25px] font-normal text-[12px] text-black flex justify-center items-center px-2">
              {taskDetails.status}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <div className="flex justify-start md:justify-center items-end gap-2">
            <Image
              src="/icons/contributor.png"
              alt="usdt"
              height={20}
              width={20}
            />
            <div className="flex justify-center items-center text-[12px] font-normal text-[#CECECE]">
              {taskDetails.startedBy.length} Contributors
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmissionTaskDetails;
