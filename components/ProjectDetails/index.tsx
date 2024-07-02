import { notification } from "antd";
import moment from "moment";
import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import { BiDetail, BiEdit } from "react-icons/bi";
import { BsCheck2, BsChevronDown, BsSearch } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { UserContext } from "../../context/user.context";
import SharePopUP from "../SharePopUp";

interface projects {
  project: any;
  activity?: any;
}

const ProjectDetails: FC<projects> = ({ project, activity }) => {
  const [active, setActive] = useState("about");
  const [hide, setHide] = useState(false);
  const { user } = useContext(UserContext);
  const [showEditDesc, setShowEditDesc] = useState<boolean>(true);
  const [isManager, setIsManager] = useState<boolean>(false);
  const [description, setDescription] = useState("");
  const [activeNotification, setActiveNotification] = useState("alltask");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    notification.info({ message: "Copied to clipboard" });
  };
  useEffect(() => {
    if (user?.id?.toString() === project?.createdBy) {
      setIsManager(true);
    }
  }, []);
  console.log("project", project);

  return (
    <>
      <label
        htmlFor="project-details"
        className="flex justify-center items-center gap-[10px] md:border-[1px] p-0 m-0 border-white md:px-[16px] md:py-[8px] font-[600] text-[14px] hover:bg-[#3D3D3D] hover:bg-opacity-50 hover:duration-300 "
      >
        <Image
          className="md:h-5 md:w-5 h-7 w-7 mb-1"
          src={"/icons/project.svg"}
          height={20}
          width={20}
          alt="project"
        />
        <div className="hidden md:block">Project Details</div>
      </label>
      <input type="checkbox" id="project-details" className="modal-toggle" />
      <div className="modal bg-opacity-50 bg-black modal-bottom md:modal-middle md:customMargintop">
        <div className="modal-box md:customHeight bg-[#0C0C0E] text-white px-5 py-[22px] max-w-[575px]  rounded-t-3xl md:rounded-none  border-[1px] border-[#3D3D3D] border-opacity-50 overflow-scroll projectScroll">
          <div className="flex gap-2 ">
            {project?.logo && project?.logo !== "" ? (
              <Image src={project?.logo} height={75} width={75} alt={"logo"} />
            ) : (
              <Image
                src={`https://ui-avatars.com/api/?background=242426&color=fff&name=${project?.name?.trim()}`}
                height={75}
                width={75}
                alt={"logo"}
              />
            )}
            <div className="flex-grow">
              <div className="flex justify-between items-center ">
                <div className=" flex justify-between items-center text-[14px] md:text-[24px] font-[700] font-satoshi flex-grow ">
                  {project?.name}
                  <label
                    htmlFor="project-details"
                    className="text-white  cursor-pointer"
                  >
                    ✕
                  </label>
                </div>
              </div>
              <div className="text-[14px] text-[400] text-[#CECECE] capitalize">
                {project?.category}
              </div>
            </div>
          </div>

          <div className=" flex gap-2 items-center  mt-6 ">
            {!isManager && (
              <div className="dropdown">
                <label
                  tabIndex={0}
                  className="flex gap-2 items-center justify-center w-[230px] border-[1px] border-white border-opacity-20 text-[12px] font-[600] p-2 cursor-pointer bg-black"
                >
                  <Image
                    className="h-[18px] w-[18px]"
                    src={"/icons/bell.svg"}
                    width={18}
                    height={18}
                    alt="bell"
                  />
                  Notifications for all tasks <BsChevronDown />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 bg-[#242426] flex- flex-col gap-4 mt-2"
                >
                  <li
                    className="w-[309px] flex flex-col gap-0 hover:text-[#2B59FF]"
                    onClick={() => setActiveNotification("alltask")}
                  >
                    <div
                      className={`py-0 ${
                        activeNotification === "alltask"
                          ? "text-[#2B59FF]"
                          : "text-white"
                      }`}
                    >
                      {activeNotification === "alltask" && (
                        <BsCheck2 className="text-[#2B59FF]" />
                      )}
                      All tasks
                    </div>
                    <div className="text-[12px] py-0 font-[400] leading-3 text-[#858585]">
                      Get notifications for all tasks
                    </div>
                  </li>
                  <li
                    className="w-[309px] flex flex-col gap-0 hover:text-[#2B59FF]"
                    onClick={() => setActiveNotification("mentions")}
                  >
                    <div
                      className={`py-0 ${
                        activeNotification === "mentions"
                          ? "text-[#2B59FF]"
                          : "text-white"
                      }`}
                    >
                      {activeNotification === "mentions" && (
                        <BsCheck2 className="text-[#2B59FF]" />
                      )}
                      @Mentions
                    </div>
                    <div className="text-[12px] py-0 font-[400] leading-3 text-[#858585]">
                      Get notifications for @mentions, @here only
                    </div>
                  </li>
                  <li
                    className="w-[309px] flex flex-col gap-0 hover:text-[#2B59FF]"
                    onClick={() => setActiveNotification("off")}
                  >
                    <div
                      className={`py-0 ${
                        activeNotification === "off"
                          ? "text-[#2B59FF]"
                          : "text-white"
                      }`}
                    >
                      {activeNotification === "off" && (
                        <BsCheck2 className="text-[#2B59FF]" />
                      )}
                      Off
                    </div>
                    <div className="text-[12px] py-0 font-[400] leading-3 text-[#858585]">
                      You wont get notifications
                    </div>
                  </li>
                  <li
                    className="w-[309px] flex flex-col gap-0 hover:text-[#2B59FF]"
                    onClick={() => setActiveNotification("mute")}
                  >
                    <div
                      className={`py-0 ${
                        activeNotification === "mute"
                          ? "text-[#2B59FF]"
                          : "text-white"
                      }`}
                    >
                      {activeNotification === "mute" && (
                        <BsCheck2 className="text-[#2B59FF]" />
                      )}
                      Mute Project
                    </div>
                    <div className="text-[12px] py-0 font-[400] leading-3 text-[#858585] mb-2">
                      Move this project to the bottom and only see a badge if
                      you
                      {`'`}re mentioned
                    </div>
                  </li>
                  {/* <li className="w-[309px] flex flex-col gap-0">
                  <div className="">More notification options</div>
                </li> */}
                </ul>
              </div>
            )}
            <div className="tooltip tooltip-top" data-tip="Copy Project Link">
              <div
                className="rounded-full w-[30px] h-[30px] gray-bg flex items-center justify-center cursor-pointer "
                onClick={copyToClipboard}
              >
                <Image
                  src={"/icons/link.svg"}
                  width={19}
                  height={19}
                  alt="link"
                />
              </div>
            </div>

            <SharePopUP />
          </div>
          <div className="flex mt-4">
            <div
              className={`hover:bg-[#242426] cursor-pointer text-[16px] border-b-[1px]  px-4 py-3 ${
                active === "about" ? "border-[#A9FF1C]" : "border-[#858585]"
              }`}
              onClick={() => setActive("about")}
            >
              About
            </div>
            <div
              className={`hover:bg-[#242426] cursor-pointer text-[16px] border-b-[1px]  px-4 py-3 ${
                active === "members" ? "border-[#A9FF1C]" : "border-[#858585]"
              }`}
              onClick={() => setActive("members")}
            >
              {active === "members" ? `Members (${4})` : "Members"}
            </div>
          </div>
          {active === "about" ? (
            <>
              <div className="text-[#3D3D3D] text-[14px] font-[600] mt-4">
                Tags
              </div>
              <div className=" bg-[#A9FF1C] bg-opacity-20 p-1 text-[16px] font-[400] text-[#CECECE] max-w-fit">
                Python
              </div>
              <div className="flex items-center gap-1 mb-4 text-[16px] font-[400] text-white mt-4">
                <BiDetail />
                Description
                {isManager && (
                  <BiEdit
                    onClick={(e: any) => {
                      e.preventDefault();
                      setShowEditDesc(!showEditDesc);
                    }}
                    className="ml-4"
                  />
                )}
              </div>
              {description && !showEditDesc && (
                <div className="text-[14px] font-[400] text-white leading-4 mb-4 ">
                  {description}
                </div>
              )}
              {isManager && (
                <>
                  {showEditDesc && (
                    <textarea
                      onChange={(e: any) => {
                        setDescription(e.target.value);
                      }}
                      className=" h-[211px] w-[100%] md:w-[400px] bg-transparent text-[14px] font-[400] text-white leading-4 mb-[20px] resize-none border-[1px] border-[#858585] placeholder:text-[14px] placeholder:font-[400] placeholder:text-white p-4 placeholder:text-opacity-50"
                      placeholder="Add detailed task description"
                      value={description}
                    />
                  )}
                </>
              )}
              <div className="flex flex-col gap-[19px]  mb-[20px] ">
                <div className="text-[16px] flex gap-2">
                  <Image
                    src={"/icons/user.svg"}
                    height={16}
                    width={16}
                    alt="users"
                  />
                  Managed by
                </div>
                <div className="text-[14px] flex items-center gap-[10px]">
                  <Image
                    src={"/icons/user.png"}
                    height={32}
                    width={32}
                    alt="user"
                  />
                  {project?.createdBy}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 mb-4 text-[16px] font-[400] text-white mt-3">
                  <BiDetail />
                  Activity
                </div>
                <div
                  onClick={() => setHide(!hide)}
                  className="px-4 py-2 bg-black text-white text-[12px] text-[600] border-[1px] border-white border-opacity-20"
                >
                  {hide ? "Hide Details" : "Show Details"}
                </div>
              </div>
              <div className=" flex gap-4 items-center">
                <div>
                  <Image
                    src={"/icons/user.png"}
                    height={32}
                    width={32}
                    alt="user"
                  />
                </div>
                <input
                  placeholder="Write a comment..."
                  className="bg-black text-[#858585] px-6 py-[10px] w-[497px]"
                />
              </div>
              {hide && (
                <div className="h-[144px] overflow-scroll projectScroll">
                  {activity &&
                    activity.map((item: any, index: number) => (
                      <div className="flex gap-4 items-center mt-2" key={index}>
                        <div>
                          <Image
                            src={"/icons/user.png"}
                            height={32}
                            width={32}
                            alt="user"
                          />
                        </div>
                        <div className="flex flex-col gap-1 ">
                          <div className="text-[14px] text-[#858585]">
                            {`${item?.created_by.slice(
                              0,
                              5
                            )}...${item.created_by.slice(-5)}`}{" "}
                            Created a Task: {item?.title}
                          </div>
                          <div className="text-[12px] text-[#858585]">
                            {moment(item?.created_at).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  <div className="flex gap-4 items-center mt-2">
                    <div>
                      <Image
                        src={"/icons/user.png"}
                        height={32}
                        width={32}
                        alt="user"
                      />
                    </div>
                    <div className="flex flex-col gap-1 ">
                      <div className="text-[14px] text-[#858585]">
                        {`${project?.createdBy.slice(
                          0,
                          5
                        )}...${project.createdBy.slice(-5)}`}{" "}
                        Created Project: {project?.name}
                      </div>
                      <div className="text-[12px] text-[#858585]">
                        {moment(project?.created_at).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="text-[16px] text-[#FF1C1C] flex gap-[10px] items-center mt-4 mb-14 md:mb-0">
                <RiErrorWarningLine />
                Report a Issue
              </div>
            </>
          ) : (
            <div>
              <div className="relative">
                <input
                  placeholder="Find members"
                  className="text-[#858585] text-[16px] py-[6px] px-[42px] bg-black border-[1px] border-[#858585] w-[543px] my-4"
                />
                <BsSearch className="h-[15px] w-[15px] absolute top-[27px] left-[12px] text-white hidden md:block" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-[10px] mb-4">
                    <Image
                      src={"/icons/user.png"}
                      height={32}
                      width={32}
                      alt="user"
                    />
                    <div className="text-[14px]">{project?.createdBy}</div>
                  </div>
                  <div className="text-[#80ED5D] text-[12px]">
                    Project Manager
                  </div>
                </div>

                {[...Array(4)].map((i, index) => (
                  <div className="flex gap-[10px] mb-4 " key={index}>
                    <Image
                      src={"/icons/user.png"}
                      height={32}
                      width={32}
                      alt="user"
                    />
                    <div className="text-[14px]">{`username_0${index}`}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
