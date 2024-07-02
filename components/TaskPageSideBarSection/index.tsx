import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { makeHasuraAdminRequest } from "../../config/fetch-requests";
import { getTaskByStatus } from "../../utils/queries";
import { Project, TaskCardProps, TaskStatus } from "../../utils/types";
import ProgressBar from "../Animations/progressBar";
import Error from "../Error";
import KanbanTaskCard from "../KanbanTaskCard";
import Submission from "../Skeleton/KanbanSectionTask";

const TaskPageSideBarSection = ({
  projectDetails,
  taskDetails,
}: {
  projectDetails: Project;
  taskDetails: TaskCardProps;
}) => {
  const [title, setTitle] = useState<TaskStatus>("Staked");
  const [tasks, setTasks] = useState<TaskCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string>("");

  const getTask = async () => {
    //assign interval to a variable to clear it.
    await makeHasuraAdminRequest(getTaskByStatus, {
      variables: {
        status: title,
        projectId: projectDetails?.id?.toString(),
      },
    })
      .then((res) => {
        const tasks = res?.data?.asyncnewui_task;
        setTasks(tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTask();
  }, [title]);
  return (
    <>
      <div className="hidden md:block mt-[43px]">
        <div className="text-[#858585] text-[12px] ">More tasks from</div>
        <div className="text-[24px] font-[700] font-satoshi text-white mb-[10px]">
          {projectDetails.name}
        </div>
        <ProgressBar percentage={40} width={351} />
        {/* <div className="w-[351px] h-[6px] bg-[#FFFFFF] bg-opacity-20  mb-1 " /> */}
        <div className="flex flex-col items-end">
          <div className="text-[12px] font-[400] text-white text-opacity-50 ">
            Fullfiled <span className="text-[16px] font-[600]"> $3,363</span>
          </div>
          <div className="text-[12px] font-[400]  text-white text-opacity-50 flex gap-[2px] items-center">
            <div className="mx-1">Project Value</div>
            <Image src="/icons/btc.png" width={15} height={15} alt="coin" />
            <div className="mx-1"> 0.05 BTC</div>
            <div> / $6,356</div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex flex-col mt-1  text-white text-[16px] font-[400] mb-8 items-center w-fit justify-center grid-cols-3 ">
          <div className="flex flex-row">
            <button
              className={`flex gap-3 mb-5 pr-4 py-[7px] ${
                title === "Staked"
                  ? "bg-[#0C0C0E] font-[700]"
                  : "bg-[#242426] font-[400]"
              }`}
              onClick={() => setTitle("Staked")}
            >
              <div className="flex items-center mr-6 ">
                <BsDot className="text-[#FFE81C] w-[46px] h-[38px]" />
                Staked
              </div>
            </button>
            <button
              className={`flex gap-3 mb-5 pr-4 py-[7px] ${
                title === "Live"
                  ? "bg-[#0C0C0E] font-[700]"
                  : "bg-[#242426] font-[400]"
              }`}
              onClick={() => setTitle("Live")}
            >
              <div className="flex items-center mr-6">
                <BsDot className="text-[#2B59FF] w-[38px] h-[38px]" />
                Live
              </div>
            </button>
            <button
              className={`flex mb-5 gap-3 pr-4 py-[7px] ${
                title === "Done"
                  ? "bg-[#0C0C0E] font-[700]"
                  : "bg-[#242426] font-[400]"
              }`}
              onClick={() => setTitle("Done")}
            >
              <div className="flex items-center mr-2">
                <BsDot className="text-[#80ED5D] w-[38px] h-[38px]" />
                Done
              </div>
            </button>
          </div>
          <div className="scale-[1.05] w-[351px] text-white mt-2">
            {tasks && tasks.length > 0 ? (
              isLoading ? (
                tasks?.map((item: TaskCardProps, index: number) => {
                  return (
                    <div key={index}>
                      {isError ? (
                        <Error error={isError} type="error" />
                      ) : (
                        <KanbanTaskCard {...item} key={index} />
                      )}
                    </div>
                  );
                })
              ) : (
                <Submission />
              )
            ) : (
              <div className="flex flex-col justify-center items-center mt-20">
                {tasks && (
                  <>
                    {title === "Staked" && (
                      <div className="flexflex-col justify-center items-center">
                        <Image
                          src={"/icons/todo.png"}
                          height={80}
                          width={73}
                          alt="no todo"
                        />
                        <div className="text-white text-[16px] font-[600] mt-4 mb-2">
                          No tasks yet
                        </div>
                        <div className="text-white text-[14px] font-[400] ">
                          Be sure to{" "}
                          <span className="text-[#a9ff1c]">
                            add your first task!
                          </span>
                        </div>
                      </div>
                    )}
                    {title === "Live" && (
                      <div className="flex flex-col justify-center items-center ">
                        <Image
                          src={"/icons/started.png"}
                          height={80}
                          width={73}
                          alt="no todo"
                        />
                        <div className="text-white text-[16px] font-[600] mt-4 mb-2">
                          Get started!
                        </div>
                        <div className="text-white text-[14px] font-[400] ">
                          {"when you have, you'll see them here"}
                        </div>
                      </div>
                    )}
                    {title === "Done" && (
                      <div className="flex flex-col justify-center items-center">
                        <Image
                          src={"/icons/done.png"}
                          height={80}
                          width={73}
                          alt="no todo"
                        />
                        <div className="text-white text-[16px] font-[600]  mt-4 mb-2">
                          oops! its empty.
                        </div>
                        <div className="text-white text-[14px] font-[400]">
                          your completed tasks will appear here
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default TaskPageSideBarSection;
