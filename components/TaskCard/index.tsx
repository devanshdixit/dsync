import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { TaskCardProps } from "../../utils/types";
import { motion } from "framer-motion";
import { card } from "../Animations/View-all";
import getTokenImage from "../../utils/getTokenImages";
import BtnClickWrapper from "../Animations/Wrappers/BtnClickWrapper";

interface Task {
  tasks: any;
}

const TaskCard: FC<Task> = ({ tasks }) => {
  console.log(tasks);

  return (
    <>
      {tasks &&
        tasks.map((items: TaskCardProps, i: number) => (
          <BtnClickWrapper key={i}>
            <div>
              <motion.div
                variants={card}
                className={
                  "w-[290px] md:max-w-[350px] flex flex-grow flex-col  py-4 px-[15px] bg-[#0C0C0E]  hover:bg-[#3D3D3D]"
                }
                key={i}
              >
                <Link href={`/task/${items?.id}?project=${items.projectId}`}>
                  <div className="text-[#858585] flex items-end text-[12px] font-[400]  gap-1">
                    <BiPurchaseTagAlt className="text-[#858585] w-4 h-4" />
                    <div>{items.tag ? items.tag : "No tag selected yet"}</div>
                  </div>
                  <div className="text-white text-[16px] font-[600] mt-1 mb-4 w-[277px]">
                    {items?.title}
                  </div>
                  <div className="flex gap-2 items-center">
                    <Image
                      src={`https://ui-avatars.com/api/?background=242426&color=fff&name=${items?.title?.trim()}`}
                      height={20}
                      width={20}
                      alt={"logo"}
                    />
                    <div className="text-white text-[14px] font-[400]">
                      {items?.title}
                    </div>
                  </div>

                  <div
                    className={
                      "text-[12px] font-[400] leading-3 text-[#858585] mt-2 break-all"
                    }
                  >
                    <div>
                      {items.description
                        ? items.description && items.description.length > 30
                          ? `${items.description.slice(0, 30)}...`
                          : items.description
                        : "No Description..."}
                    </div>
                  </div>

                  <div className="flex gap-1 justify-between items-baseline">
                    <div className="flex items-center gap-1">
                      <Image
                        src={"/icons/contributor.png"}
                        width={21}
                        height={21}
                        alt="contributors"
                      />
                      <div className="flex items-center text-[#CECECE] text-[12px]   font-[400]">
                        25 Contributors
                      </div>
                    </div>
                    <div className="flex items-center gap-1 border-[1px] border-[#29292F] px-[7px] py-[5px] mt-5">
                      <div className=" flex gap-2 items-center text-[11px] text-white font-[400]">
                        <div>{getTokenImage(items?.amount)}</div>
                        <div>{items?.amount}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </BtnClickWrapper>
        ))}
    </>
  );
};

export default TaskCard;
