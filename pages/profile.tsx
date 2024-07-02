import Link from "next/link";
import React, { useContext, useState } from "react";
import { AiFillGithub, AiOutlineLink, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord, FaWallet } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { RiLinkedinBoxFill } from "react-icons/ri";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Achivement from "../components/ProfileCards/Achivement";
import HistoryCard from "../components/ProfileCards/HistoryCard";
import KanbanSmallCard from "../components/ProfileCards/KanbanSmallCard";
import { UserContext } from "../context/user.context";
import { pageBottomToTop } from "../components/Animations/PageSwitch";
import { motion } from "framer-motion";
import AnimateWrapper from "../components/Animations/Wrappers/AnimateWrapper";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState<
    "all" | "projects" | "completed" | "ongoing"
  >("all");

  const allProjects = [
    {
      src: "/icons/xumns.png",
      title: "Xumns",
      tasks: 13,
    },
    {
      src: "/icons/xumns.png",
      title: "Xumns",
      tasks: 13,
    },
    {
      src: "/icons/xumns.png",
      title: "Xumns",
      tasks: 13,
    },
  ];
  const achivement = [
    {
      value: "$5000",
      text: "Total Earned",
    },
    {
      value: "12",
      text: "Projects",
    },
    {
      value: "03/15/12",
      text: "RSA",
    },
    {
      value: "30",
      text: "Async Score",
    },
  ];
  const kanban = [
    {
      value: "17",
      text: "Completed Tasks",
    },
    {
      value: "3",
      text: "Tasks in Progress",
    },
    {
      value: "1",
      text: "Task in review",
    },
    {
      value: "2",
      text: "invites",
    },
  ];
  const all = [
    {
      tag: "Design",
      title: "Create Brand Guidelines and Design system for Xumns",
      desc: `Lorem ipsum dolor sit amet consectetur. Vel pulvinar vivamus tempor amet
        suspendisse pellentesque risus. Mauris commodo lectus platea a. Vitae eu
        integer est tristique turpis ullamcorper ac lorem.`,
      price: "200",
      status: "Done",
    },
    {
      tag: "Design",
      title: "Create Brand Guidelines and Design system for Xumns",
      desc: `Lorem ipsum dolor sit amet consectetur. Vel pulvinar vivamus tempor amet
        suspendisse pellentesque risus. Mauris commodo lectus platea a. Vitae eu
        integer est tristique turpis ullamcorper ac lorem.`,
      price: "200",
      status: "Done",
    },
    {
      tag: "Design",
      title: "Create Brand Guidelines and Design system for Xumns",
      desc: `Lorem ipsum dolor sit amet consectetur. Vel pulvinar vivamus tempor amet
        suspendisse pellentesque risus. Mauris commodo lectus platea a. Vitae eu
        integer est tristique turpis ullamcorper ac lorem.`,
      price: "200",
      status: "Done",
    },
    {
      tag: "Design",
      title: "Create Brand Guidelines and Design system for Xumns",
      desc: `Lorem ipsum dolor sit amet consectetur. Vel pulvinar vivamus tempor amet
        suspendisse pellentesque risus. Mauris commodo lectus platea a. Vitae eu
        integer est tristique turpis ullamcorper ac lorem.`,
      price: "200",
      status: "Done",
    },
    {
      tag: "Design",
      title: "Create Brand Guidelines and Design system for Xumns",
      desc: `Lorem ipsum dolor sit amet consectetur. Vel pulvinar vivamus tempor amet
        suspendisse pellentesque risus. Mauris commodo lectus platea a. Vitae eu
        integer est tristique turpis ullamcorper ac lorem.`,
      price: "200",
      status: "Done",
    },
  ];
  const projects = [
    {
      tag: "Design",
      title: "Create Brand Guidelines and Design system for Xumns",
      desc: `Lorem ipsum dolor sit amet consectetur. Vel pulvinar vivamus tempor amet
        suspendisse pellentesque risus. Mauris commodo lectus platea a. Vitae eu
        integer est tristique turpis ullamcorper ac lorem.`,
      price: "200",
      status: "Done",
    },
  ];
  const completed = [
    {
      tag: "Design",
      title: "Create Brand Guidelines and Design system for Xumns",
      desc: `Lorem ipsum dolor sit amet consectetur. Vel pulvinar vivamus tempor amet
        suspendisse pellentesque risus. Mauris commodo lectus platea a. Vitae eu
        integer est tristique turpis ullamcorper ac lorem.`,
      price: "200",
      status: "Done",
    },
    {
      tag: "Design",
      title: "Create Brand Guidelines and Design system for Xumns",
      desc: `Lorem ipsum dolor sit amet consectetur. Vel pulvinar vivamus tempor amet
        suspendisse pellentesque risus. Mauris commodo lectus platea a. Vitae eu
        integer est tristique turpis ullamcorper ac lorem.`,
      price: "200",
      status: "Done",
    },
  ];
  const ongoing = [
    {
      tag: "Design",
      title: "Create Brand Guidelines and Design system for Xumns",
      desc: `Lorem ipsum dolor sit amet consectetur. Vel pulvinar vivamus tempor amet
        suspendisse pellentesque risus. Mauris commodo lectus platea a. Vitae eu
        integer est tristique turpis ullamcorper ac lorem.`,
      price: "200",
      status: "Done",
    },
    {
      tag: "Design",
      title: "Create Brand Guidelines and Design system for Xumns",
      desc: `Lorem ipsum dolor sit amet consectetur. Vel pulvinar vivamus tempor amet
        suspendisse pellentesque risus. Mauris commodo lectus platea a. Vitae eu
        integer est tristique turpis ullamcorper ac lorem.`,
      price: "200",
      status: "Done",
    },
    {
      tag: "Design",
      title: "Create Brand Guidelines and Design system for Xumns",
      desc: `Lorem ipsum dolor sit amet consectetur. Vel pulvinar vivamus tempor amet
        suspendisse pellentesque risus. Mauris commodo lectus platea a. Vitae eu
        integer est tristique turpis ullamcorper ac lorem.`,
      price: "200",
      status: "Done",
    },
  ];
  return (
    <div className="w-full bg-[#0C0C0E]">
      <Header />
      {/* main */}
      <AnimateWrapper>
        <div className="bg-[#0C0C0E] h-fit w-full lg:w-fit py-[5px] px-[10px] md:py-[60px] md:px-[120px] flex text-white font-Inter flex-col md:flex-row gap-3 largeLaptop:m-auto">
          {/* left */}
          <div className=" md:w-[419px] bg-black">
            <div className=" p-[20px]">
              <div className="flex justify-between items-start mb-[8px]">
                <img
                  src="/images/profilePhoto.png"
                  alt="profile"
                  height={80}
                  width={80}
                />
                <img src="/images/info.png" alt="info" height={20} width={20} />
              </div>
              <p className="font-normal text-[14px] text-[#CECECE]">
                {user?.email}
              </p>
              <p className="font-semibold text-[20px] text-white">
                {user?.name}
              </p>
              <p className="font-normal text-[14px] text-[#858585]">
                Lorem ipsum dolor sit amet consectetur. Morbi in morbi est eu
                diam imperdiet.
              </p>
              <div className="flex gap-2 my-2">
                <div className="h-[24px] w-[24px] bg-[#121212] flex justify-center items-center rounded-full">
                  <AiFillGithub />
                </div>
                <div className="h-[24px] w-[24px] bg-[#121212] flex justify-center items-center rounded-full">
                  <RiLinkedinBoxFill />
                </div>
                <div className="h-[24px] w-[24px] bg-[#121212] flex justify-center items-center rounded-full">
                  <AiOutlineTwitter />
                </div>
                <div className="h-[24px] w-[24px] bg-[#121212] flex justify-center items-center rounded-full">
                  <FaDiscord />
                </div>
                <div className="h-[24px] w-[24px] bg-[#121212] flex justify-center items-center rounded-full">
                  <AiOutlineLink />
                </div>
                <div className="h-[24px] w-[24px] bg-[#121212] flex justify-center items-center rounded-full">
                  <FaWallet />
                </div>
              </div>
              <div className="flex gap-2 justify-start items-center border h-[32px] w-[67px] px-1 bg-[#000000cc] border-[#ffffff33] hover:bg-[#242426] cursor-pointer">
                <MdModeEditOutline />
                Edit
              </div>
              <div className="font-semibold text-[20px] mt-4">Projects</div>
            </div>
            <div>
              <div className="bg-[#242426] py-[15px] px-10 ">
                All Projects{" "}
                <span className="text-[16px] text-[#858585]">
                  (
                  {allProjects &&
                    allProjects.reduce((total, item) => {
                      return (total += item.tasks);
                    }, 0)}{" "}
                  Tasks)
                </span>
              </div>
              {allProjects &&
                allProjects.map((item: any, i) => {
                  return (
                    <div
                      key={i}
                      className="flex gap-2 justify-start items-center font-normal text-[16px] mb-4 px-10"
                    >
                      <img src={item.src} alt="img" height={32} width={32} />
                      <div>{item.title}</div>
                      <div className="text-[#858585]">{`(${item.tasks} Tasks)`}</div>
                    </div>
                  );
                })}
            </div>
            <div className="flex justify-center items-center flex-wrap   gap-2 flex-row ">
              {achivement &&
                achivement.map((item: any, i) => {
                  return <Achivement key={i} {...item} />;
                })}
            </div>
            <div className="flex justify-between items-center px-[20px] mb-3 my-7">
              <div className="text-[20px] font-bold ">Skills</div>
              <div className="flex gap-2 justify-start items-center border h-[32px] w-[67px] px-1 bg-[#000000cc] border-[#ffffff33] hover:bg-[#242426] cursor-pointer">
                <MdModeEditOutline />
                Edit
              </div>
            </div>
            <div className="flex gap-5 text-[12px] font-normal pl-6 mb-[50px] ">
              <p className="border border-black hover:border-white rounded-sm hover:bg-[#242426] cursor-pointer px-1">
                Solidity
              </p>
              <p className="border border-black hover:border-white rounded-sm hover:bg-[#242426] cursor-pointer px-1">
                Python
              </p>
              <p className="border border-black hover:border-white rounded-sm hover:bg-[#242426] cursor-pointer px-1">
                Backend
              </p>
            </div>
            <button className="capitalize  h-[44px] w-[95%] border border-[#ffffff33]  text-[16px] font-semibold m-auto hover:bg-[#242426] cursor-pointer mx-2">
              Logout
            </button>
            <div className="text-center mt-3 mb-10">
              <Link
                href={"/"}
                className="font-normal text-[12px] underline text-[#FF1C1C]"
              >
                Disable your Account
              </Link>
            </div>
          </div>
          {/* right */}
          <div className="p-3  lg:w-full bg-black ">
            <div className="flex justify-between">
              <div className="flex justify-center items-center gap-3 text-[24px] font-satoshi font-bold">
                <img
                  src="/icons/xumns.png"
                  alt="xumns"
                  height={32}
                  width={32}
                />
                <div>Xumns</div>
              </div>
              <div className="flex justify-center items-center gap-3 border border-[#ffffff33] px-1">
                <img
                  src="/icons/greenUsdt.png"
                  alt="usdt"
                  height={20}
                  width={20}
                />
                <div>200 usdt</div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 flex-wrap flex-row mt-3">
              {kanban &&
                kanban.map((item, i) => {
                  return <KanbanSmallCard key={i} {...item} />;
                })}
            </div>
            <div className="font-semibold text-[14px] text-white ml-2 mt-2">
              Work History
            </div>
            <div className="flex mt-5 flex-wrap text-[14px] md:text-[16px] font-semibold mb-1 ">
              <button
                className={`p-3  ${
                  activeTab === "all"
                    ? " border-b-2 border-[#a9ff1c]"
                    : "border-b-2 border-[#3D3D3D]"
                } hover:bg-[#242426] duration-300`}
                onClick={() => {
                  setActiveTab("all");
                }}
              >
                All
              </button>
              <button
                className={` p-3 ${
                  activeTab === "projects"
                    ? " border-b-2 border-[#a9ff1c]"
                    : "border-b-2 border-[#3D3D3D]"
                } hover:bg-[#242426] duration-300`}
                onClick={() => {
                  setActiveTab("projects");
                }}
              >
                Projects
              </button>
              <button
                className={`p-3  ${
                  activeTab === "completed"
                    ? " border-b-2 border-[#a9ff1c]"
                    : "border-b-2 border-[#3D3D3D]"
                } hover:bg-[#242426] duration-300`}
                onClick={() => {
                  setActiveTab("completed");
                }}
              >
                Completed Tasks
              </button>
              <button
                className={` p-3 ${
                  activeTab === "ongoing"
                    ? " border-b-2 border-[#a9ff1c]"
                    : "border-b-2 border-[#3D3D3D]"
                } hover:bg-[#242426] duration-300`}
                onClick={() => {
                  setActiveTab("ongoing");
                }}
              >
                Ongoing Tasks
              </button>
            </div>
            <div className="mt-[40px] h-fit w-full flex flex-col gap-3 mb-14 md:mb-0 ">
              {activeTab === "all" &&
                all?.map((item: any, i: any) => {
                  return <HistoryCard key={i} {...item} />;
                })}
              {activeTab === "projects" &&
                projects?.map((item: any, i: any) => {
                  return <HistoryCard key={i} {...item} />;
                })}
              {activeTab === "completed" &&
                completed?.map((item: any, i: any) => {
                  return <HistoryCard key={i} {...item} />;
                })}
              {activeTab === "ongoing" &&
                ongoing?.map((item: any, i: any) => {
                  return <HistoryCard key={i} {...item} />;
                })}
            </div>
          </div>
        </div>
      </AnimateWrapper>
      <Footer />
    </div>
  );
};

export default Profile;
