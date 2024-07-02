
import axios, { all } from "axios";
import { Spin } from "antd";
import classNames from "classnames";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import { BsDot, BsPlus } from "react-icons/bs";
import clientPromise from "../../config/mongodb";
import { UserContext } from "../../context/user.context";
import { LoadingOutlined } from "@ant-design/icons";
import {
  IsError,
  KanbanCardSectionProps,
  TaskCardProps,
} from "../../utils/types";
import CreateTask from "../CreateTask";
import KanbanTaskCard from "../KanbanTaskCard";
import Submission from "../Skeleton/KanbanSectionTask";
import Image from "next/image";
import Error from "../Error";
import InfoWarning from "../InfoWarning";
import { makeHasuraAdminRequest } from "../../config/fetch-requests";
import { getTaskByStatus } from "../../utils/queries";

const KanbanCardSection: FC<KanbanCardSectionProps> = ({
  title,
  statusColor,
  projectDetails,
  query,
  isManager,
}) => {
  const { user } = useContext(UserContext);
  const [createNewTask, setCreateNewTask] = useState(false);
  const [tasks, setTasks] = useState<TaskCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: "black" }} spin />
  );
  const [isError, setIsError] = useState<IsError>({
    isError: false,
    message: "",
  });
  const router = useRouter();
  // const {
  //   loading,
  //   error,
  //   data,
  //   startPolling,
  //   stopPolling,
  //   refetch,
  //   networkStatus,
  // } = useQuery(query, {
  //   variables: {
  //     projectId: projectDetails?.name,
  //     status: title,
  //   },
  //   skip: !projectDetails?._id,
  //   pollInterval: 2000,
  // });

  useEffect(() => {
    const intervalId = setInterval(async () => {
      //assign interval to a variable to clear it.
      console.log("project data intevaal", { projectDetails });
      let status = title;
      if (status === "All") {
        status = "Draft";
        const draft = await makeHasuraAdminRequest(getTaskByStatus, {
          variables: {
            projectId: projectDetails?.id,
            status: "Draft",
          },
        });
        const staked = await makeHasuraAdminRequest(getTaskByStatus, {
          variables: {
            projectId: projectDetails?.id,
            status: "Staked",
          },
        });
        if (draft?.errors || staked?.errors) {
          return;
        }
        const alllist: any[] = [
          ...draft?.data?.asyncnewui_task,
          ...staked?.data?.asyncnewui_task,
        ];
        setIsLoading(false);
        setTasks(alllist);
      } else {
        await makeHasuraAdminRequest(getTaskByStatus, {
          variables: {
            projectId: projectDetails?.id,
            status: status,
          },
        })
          .then((res) => {
            console.log(`task ${title}:`, res?.data);
            setIsLoading(false);
            const tasks = res?.data?.asyncnewui_task;
            setTasks(tasks);
          })
          .catch((err) => {
            setIsLoading(false);
            setIsError({
              isError: true,
              message: "Error in fetching",
            });
          });
      }
    }, 20000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-[312px] bg-[#0C0C0E] h-[603px] mt-2 text-white overflow-scroll relative projectScroll ">
      <div className="flex items-center text-xs font-[400] pt-4 ml-2 sticky top-0 bg-[#0C0C0E] ">
        <BsDot
          className={classNames("w-[38px] h-[38px]", `text-[${statusColor}]`)}
        />
        {title}
        {tasks && (
          <div className="w-4 h-4 ml-2 bg-white rounded-full text-black flex items-center justify-center">
            {tasks.length}
          </div>
        )}
      </div>
      {/* Displaying the create button <-- start --> */}
      {(title === "Staked" || title === "Draft" || title === "All") &&
        projectDetails?.createdBy === user?.id.toString() && (
          <>
            <div
              className="px-[54px] py-2 flex gap-4 items-center text-[#A9FF1C] border-[1px] border-[#A9FF1C] mx-2 mb-4"
              onClick={() => setCreateNewTask(!createNewTask)}
            >
              <BsPlus /> Create new task
            </div>
            {createNewTask && projectDetails && (
              <CreateTask
                projectId={projectDetails?.id || ""}
                onClose={() => {
                  // refetch({
                  //   projectId: projectDetails?.name,
                  // });
                  setCreateNewTask(false);
                }}
              />
            )}
          </>
        )}
      {/* Displaying the create button <-- end --> */}
      {isLoading ? (
        <div className="text-white text-xl text-center border border-[#242426] mx-2">
          <Submission />
        </div>
      ) : (
        <>
          {isError.isError ? (
            <InfoWarning error={isError?.message} />
          ) : (
            <div>
              {tasks && tasks.length <= 0 ? (
                <>
                  {(title === "All" || title === "Staked") && (
                    <div
                      className={`flex flex-col justify-center items-center ${
                        projectDetails?.createdBy === user?.id.toString()
                          ? "mt-[140px]"
                          : "mt-[180px]"
                      }`}
                    >
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
                    <div className="flex flex-col justify-center items-center mt-[180px]">
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
                    <div className="flex flex-col justify-center items-center mt-[180px]">
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
              ) : (
                <>
                  {tasks &&
                    tasks.map((item: TaskCardProps, index: number) => {
                      return <KanbanTaskCard key={index} {...item} />;
                    })}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default KanbanCardSection;
