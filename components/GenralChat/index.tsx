
import axios from "axios";
import { FC, useContext, useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import { UserContext } from "../../context/user.context";
import { IsError, Project } from "../../utils/types";
import Input from "../Forms/Input";
import Chats from "./chats";
import { makeHasuraAdminRequest } from "../../config/fetch-requests";


const GeneralChat: FC<Project> = (project) => {

  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<any>(project.chats);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState<IsError>({
    isError: false,
    message: "",
  });


  // const getUpdatedChats = async () => {
  //   await axios.get(`${window.location.origin}/ai/savechat`, {
  //     headers: {
  //       : project,
  //     }
  //   })
  //     .then((res) => {
  //       console.log("chat resp", res);
  //     })
  //     .catch((err) => {
  //       console.log("chat error", err)
  //     });
  // }

  const handleSubmitChat = async () => {
    const data: any = {
      user: user,
      message: message,
      projectName: project.name,
      projectId: project.id,
    };
    await makeHasuraAdminRequest(`
    mutation MyMutation($message: String!, $projectId: Int!, $userId: uuid!) {
      insert_asyncnewui_project_chats(objects: {message: $message, projectId: $projectId, userId: $userId}) {
        returning {
          id
        }
      }
    }   
    `, {
      variables: {
        message: message,
        projectId: parseInt(project.id || ""),
        userId: user.id,
      }
    })
      .then((res) => {
        console.log("chat resp", res);
      })
      .catch((err) => {
        console.log("chat error", err);
      });
    setMessage("");
  };


  // const {
  //   loading,
  //   error,
  //   data,
  //   startPolling,
  //   stopPolling,
  //   refetch,
  //   networkStatus,
  // } = useQuery(getProjectByName, {
  //   variables: {
  //     name: project?.name,
  //   },
  //   skip: !user,
  //   pollInterval: 1000,
  // });

  // useEffect(() => {
  //   console.log("Project Fetching...", { loading, error, data });
  //   if (loading) {
  //     setIsLoading(true);
  //   } else {
  //     if (!data && !error && !user) {
  //       setIsLoading(false);
  //       setIsError({
  //         isError: true,
  //         message: `Unable to fetch data! please login↗`,
  //       });
  //     }
  //   }
  //   if (error) {
  //     setIsLoading(false);
  //     setIsError({
  //       isError: true,
  //       message: "Fetching failed",
  //     });
  //     console.log("Project Fetched:", error);
  //   }
  //   if (data) {
  //     setIsLoading(false);
  //     if (data?.project) {
  //       setIsError({
  //         isError: false,
  //         message: "",
  //       });
  //       const { project } = data;
  //       const projectData: Project = {
  //         _id: project?._id.toString() || "",
  //         logo: project?.logo || "",
  //         category: project?.category || "",
  //         createdBy: project?.createdBy || "",
  //         name: project?.name || "",
  //         chats: project?.chats || []
  //       };

  //       console.log("Project Fetched:", projectData);
  //       setChats(projectData.chats);
  //     } else {
  //       setIsError({
  //         isError: true,
  //         message: "Data not available!",
  //       });
  //     }
  //   }
  // }, [loading, error, data]);

  // const getMessage = async () => {
  //   const client = await clientPromise;
  //   const db = client.db(process.env.NEXT_PUBLIC_DATABASE);
  //   const collection = db.collection(
  //     `${process.env.NEXT_PUBLIC_COLLECTION_PROJECT}`);
  //   collection.watch<{ _id: number, chats: any }>().on("change", change => {
  //     console.log(change);

  //     change.operationType === 'insert';
  //   })
  // }
  return (
    <div className="hidden lg:flex bg-[#0C0C0E] w-[312px] h-[603px] mt-2 text-white  flex-col px-[23px] justify-between  ">
      <div>
        <div className="flex  mt-4 justify-between mx-[10px] ">
          <div className="flex gap-2 items-center ">
            <BsChevronDown className="w-3 h-3" />
            General Chat
          </div>
          {/* <div className="text-[#80ED5D] font-[700] text-[14px] ">0 Active</div> */}
        </div>
        <div className="flex ">
          <div className="text-[#72767D] text-[12px] font-[400] mt-[18px]">
            <span className="tracking-[-0.145em]">
              -----------------------------------
            </span>
            {/* &nbsp;Oct 20,2021 &nbsp; */}
            <span className="tracking-[-0.145em]">
              --------------------------------
            </span>
          </div>
        </div>
        {/* Comments goes here */}
        <div className="h-[444px] overflow-scroll projectScroll">
          <Chats props={chats} project={project} />
        </div>
      </div>
      <div className="relative">
        <Input
          placeholder="Start Typing"
          onkeyDown={async (e: any) => {
            if (e.key === "Enter") {
              console.log("final chat", message);
              await handleSubmitChat();
            }
          }}
          value={message}
          icon={<RiSendPlaneFill className=" absolute top-3 right-4 z-10" />}
          onChange={(e: any) => {
            setMessage(e.target.value);
          }}
          className=" w-[268px] h-[40px] bg-[#0C0C0E] border-[1px] border-[#3D3D3D] mb-[16px] px-[16px] placeholder:text-[#858585] pr-[50px]"
        />
      </div>
    </div>
  );
};

export default GeneralChat;
