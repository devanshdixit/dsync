import Image from "next/image";
import classNames from "classnames";
import { FC, useContext, useEffect, useState } from "react";
import { TaskCardProps } from "../../utils/types";
import Link from "next/link";
import { UserContext } from "../../context/user.context";

const TaskActivitySection: FC<{ task: TaskCardProps, isManager: boolean }> = ({ task, isManager }) => {
  const [active, setActive] = useState<string>("Submissions");
  console.log(task);
  const { user } = useContext(UserContext);
  // const [isManager, setIsManager] = useState<boolean>(false);
  // useEffect(() => {
  //   if (user?.id.toString() === task?.createdBy) {
  //     setIsManager(true);
  //   }
  // }, []);
  var btnClass = classNames("px-2 py-1 text-[12px] font-[400]");

  return (
    <>
      <div className="bg-[#242426] flex text-white text-[16px] font-[400] mb-8 overflow-scroll w-[100%] scrollCatogries">
        <button
          className={`flex gap-1 items-center md:gap-3 px-2 md:px-6 py-[14px] ${active === "Submissions"
              ? "bg-[#0C0C0E] font-[400]"
              : "bg-[#242426] font-[400]"
            }`}
          onClick={() => setActive("Submissions")}
        >
          <div className="text-[12px] md:text-[16px] ">Submissions</div>
          <div className="bg-[#3D3D3D] px-2 py-[2px] text-[12px] md:text-[16px]">
            {task.submissions && task.submissions.length}
          </div>
        </button>
      </div>
      <div className=" border-t-[1px] border-[#29292F]">
        {active === "Submissions" && (
          <>
            {task?.submissions?.map((item: any, i: number) => (
              <div
                key={i}
                className="flex justify-between items-center border-b-[1px] border-[#29292F]"
              >
                <div className="flex justify-between items-center py-6 px-2 ">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/icons/userimg.png"
                      height={28}
                      width={28}
                      alt="user image"
                    />
                    <div
                      className={classNames(
                        "text-white text-[12px] font-[400]"
                      )}
                    >
                      {item?.submittedBy} submitted the task
                    </div>
                  </div>
                </div>
                <div>
                  {item.status === "rejected" && (
                    <div className={`${btnClass} text-white bg-[#FF1C1C]`}>
                      Rejected
                    </div>
                  )}
                  {item.status === "accepted" && (
                    <div className={` text-[0C0C0E] ${btnClass} bg-[#80ED5D]`}>
                      Accepted
                    </div>
                  )}
                  {isManager ? (
                    <Link
                      href={`/submission/${item?.id}?task=${task.id}&project=${task.projectId}`}
                      passHref
                    >
                      {item.status === "submitted" && (
                        <div
                          className={`bg-[#A9FF1C] px-4 py-[11px] text-black`}
                        >
                          View Submission
                        </div>
                      )}
                    </Link>
                  ) : (
                    <>
                      {item.status === "submitted" && (
                        <div
                          className={`bg-[#A9FF1C] px-4 py-[11px] text-black`}
                        >
                          Submitted
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default TaskActivitySection;
