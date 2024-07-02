import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { BiNotepad } from "react-icons/bi";
import { BsCheck2 } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { TaskCardProps } from "../../utils/types";

const KanbanTaskCard: FC<TaskCardProps> = ({
  title,
  projectId,
  status,
  id,
  createdBy,
  amount,
  assignedTo,
  tag,
  eta,
  taskDoneTime,
}) => {
  return (
    <div className="mx-2">
      <Link href={`/task/${id}/?project=${projectId}`} passHref>
        <div className="border-[1px] border-[#242426] mb-[16px] hover:bg-[#242426]">
          <div className=" bg-[#A9FF1C] bg-opacity-20 px-1 text-[12px] font-[400] text-white max-w-fit">
            {status && status}
          </div>
          <div className="px-2 text-[16px] font-[400] break-words">
            {title.length > 20 ? `${title.slice(0, 15)}...` : title}
          </div>
          {/* <div className="px-2 py-1">
                <BiNotepad />
              </div> */}
          <div className="flex gap-1 m-2 justify-between">
            <div className="flex gap-1">
              {amount && (
                <div className="flex items-center gap-2 bg-[#29292F] text-white bg-opacity-80 text-[12px] font-[400] px-1 py-[0.25px]  max-w-fit ">
                  <Image
                    src={"/icons/usdt.png"}
                    height={12}
                    width={12}
                    alt="usdt"
                  />
                  {amount}
                </div>
              )}
              {eta && (
                <div className="bg-[#FFE604] bg-opacity-80 text-[12px] font-[400] px-1 py-[0.25px]  max-w-fit text-black">
                  ETA {eta}
                </div>
              )}
              {assignedTo && (
                <div
                  className="bg-white bg-opacity-10 text-[12px] font-[400] 
                px-1 py-[0.25px]  max-w-fit text-white flex items-center gap-[5px]"
                >
                  <FaRegUserCircle />
                  {assignedTo}
                </div>
              )}
            </div>
            {taskDoneTime && (
              <div className="flex gap-2 items-center bg-[#75BD00] bg-opacity-10 text-[12px] font-[400] px-1 py-[0.25px]  max-w-fit text-[#A9FF1C]">
                <BsCheck2 /> {taskDoneTime}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default KanbanTaskCard;
