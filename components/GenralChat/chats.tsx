import classNames from "classnames";
import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import { useSubscription } from "react-apollo";
import { makeHasuraAdminRequest } from "../../config/fetch-requests";
import { UserContext } from "../../context/user.context";
import { getProjectChatsById } from "../../utils/queries";

const Chats: FC<any> = (props) => {
  const { user } = useContext(UserContext);
  const project = props.project;
  const [chats, setChats] = useState<any[]>([]);
  const [isManager, setIsManager] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (user?.id === props.project?.createdBy) {
      setIsManager(user?.id);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      //assign interval to a variable to clear it.
      await makeHasuraAdminRequest(getProjectChatsById, {
        variables: {
          projectId: parseInt(project.id || ""),
        }
      })
        .then((res) => {
          const { asyncnewui_project_chats } = res?.data;
          console.log(`chats`, asyncnewui_project_chats);
          setChats(asyncnewui_project_chats);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("chat error", err)
        });
      // console.log(`${title} tasks:`,tasks);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col my-4 place-content-start  justify-end ">
      {isLoading ? (
        <div className="flex flex-col justify-center items-center mt-[125px]">
          <Image src="/icons/nomsg.png" width={110} height={87} alt="NO msg" />
          <div className="text-[16px] font-[600] mt-4 mb-2">Loading...</div>
          <div className="text-[12px] font-[400] w-[178px] text-center">
            loading your chats please wait!
          </div>
        </div>
      ) : (chats && chats.length > 0 ? (
        chats.map((item: any, index: number) => {
          return (
            <Chat
              isUser={true}
              key={index}
              message={item.message}
              walletAddress={item.userId}
              isManager={isManager === item.userId}
            />
          );
        })
      ) : (
        <div className="flex flex-col justify-center items-center mt-[125px]">
          <Image src="/icons/nomsg.png" width={110} height={87} alt="NO msg" />
          <div className="text-[16px] font-[600] mt-4 mb-2">Nothing here</div>
          <div className="text-[12px] font-[400] w-[178px] text-center">
            There{`'`}s no chat in your feed,
            <span className="text-[#a9ff1c]"> start chat now!</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Chats;

const Chat = ({
  walletAddress,
  message,
  isUser,
  isManager,
}: {
  walletAddress: string;
  message: string;
  isUser: boolean;
  isManager: boolean;
}) => {
  return (
    <div className={classNames("mt-6")}>
      <div className={classNames("flex items-center")}>
        <Image
          src={`https://ui-avatars.com/api/?name=${walletAddress}`}
          className="rounded-full mr-2 h-5 w-5"
          alt=""
          height={20}
          width={20}
        />
        <div className="pl-1 pr-2 text-[16px] font-[600] mt-1">
          {`${walletAddress.slice(0, 3)}...${walletAddress.slice(-5)}`}
        </div>
        <div>
          {isManager && (
            <div className="text-[8px] font-[700] text-white text-opacity-65 py-1 px-2 bg-[#2B59FF]">
              Admin
            </div>
          )}
        </div>
      </div>
      <p
        className={classNames(
          "text-[#858585] text-[12px] font-[400] leading-3"
        )}
      >
        {message}
      </p>
    </div>
  );
};
