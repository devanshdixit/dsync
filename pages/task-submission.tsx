import React, { useState } from "react";
import Header from "../components/Header";
import GoBack from "../components/Goback";
import Image from "next/image";
import { BiPurchaseTagAlt } from "react-icons/bi";
import Link from "next/link";
import { AiOutlineDownload } from "react-icons/ai";
import ProjectDetails from "../components/ProjectDetails";
import AcceptRejectPopup from "../components/AcceptRejectPopup";
import { pageBottomToTop } from "../components/Animations/PageSwitch";
import { motion } from "framer-motion";
import AnimateWrapper from "../components/Animations/Wrappers/AnimateWrapper";

const TaskSubmission = () => {
  const [acceptPopup, setAcceptPopup] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const projects = [
    {
      tag: "Design",
      title: "Create Brand Guidelines and Design system for Xumns",
      desc: `Massa laoreet vel, cursus viverra interdum nec, eget arcu. Egestas at diam id duis consequat risus. Pretium, imperdiet et leo...`,
      price: "200",
      status: "Ongoing",
      contributors: "25",
    },
  ];
  return (
    <div className="relative text-white">
      <Header />
      <AnimateWrapper>
        <div className="md:w-[847px] h-fit m-auto py-7 font-Inter ">
          <GoBack
            className="text-[12px] font-normal underline"
            label={"Back to Home"}
          />
          <div className="font-bold font-satoshi my-5 px-2 text-[28px] text-white">
            Submission
          </div>
          <div>
            <div className="p-2 flex justify-between bg-[#0C0C0E] h-[56px] items-center mb-3">
              <div className="flex gap-4 items-center">
                <Image
                  src={"/images/projectlogo.png"}
                  height={32}
                  width={32}
                  alt="project"
                />
                <div className="text-white text-[22px] font-[600] font-sans">
                  {ProjectDetails.name}
                </div>
                <div className="hidden md:flex text-[14px] font-[400] font-sans text-white text-opacity-60  items-end">
                  Created on 23 Sept 2022 05:00PM IST
                </div>
              </div>
              <div className="text-white flex gap-2 items-center">
                <ProjectDetails project={projects} />
              </div>
            </div>
          </div>
          {projects &&
            projects.map((item: any, i) => {
              return (
                <div
                  key={i}
                  className="mb-3 p-4 flex flex-col gap-3 bg-[#0C0C0E] hover:bg-[#3D3D3D] hover:bg-opacity-50 duration-500 cursor-pointer"
                >
                  <div className="flex justify-start items-center gap-1  text-[#858585] font-Inter font-normal">
                    <BiPurchaseTagAlt />
                    {item.tag}
                  </div>
                  <div className="text-white font-normal text-[16px]">
                    {item.title}
                  </div>
                  <p className="font-normal text-[12px] text-[#CECECE] opacity-50">
                    {item.desc}
                  </p>
                  <div className="flex flex-col md:flex-row justify-between gap-3 ">
                    <div className="flex justify-start md:justify-center items-center gap-2">
                      <img
                        src="/icons/contributor.png"
                        alt="usdt"
                        height={20}
                        width={20}
                      />
                      <div className="flex justify-center items-center text-[12px] font-normal text-[#CECECE]">
                        {item.contributors} Contributors
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex justify-center items-center h-[30px] gap-3 border border-[#ffffff33] px-1 text-white">
                        <img
                          src="/icons/usdt.png"
                          alt="usdt"
                          height={20}
                          width={20}
                        />
                        <div>{item.price}</div>
                      </div>
                      <div className="bg-[#FFE60480] bg-opacity-50 hover:bg-yellow-400 duration-300 w-fit h-[30px] font-normal text-[12px] text-black flex justify-center items-center px-1">
                        {item.status}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          <div className="p-4 flex bg-[#0C0C0E] h-fit flex-col">
            <p className="text-white text-[16px] font-medium">Submitted by</p>
            <div className="flex items-center gap-2 mt-2">
              <img src="/images/Avatar.png" alt="user" height={24} width={24} />
              <p className="text-[14px] font-normal text-[#CECECE]">Username</p>
            </div>

            <div className="flex flex-col justify-between md:flex-row">
              {/* left */}
              <div className="flex flex-col">
                <p className="mt-5 font-medium text-[12px] font-Inter">
                  Code Link
                </p>
                <Link
                  className="underline font-normal text-[12px]"
                  href="https://github.com/agreatrepo"
                >
                  https://github.com/agreatrepo
                </Link>
                <p className="mt-5 font-medium text-[12px] font-Inter">
                  Live Link
                </p>
                <Link
                  className="underline font-normal text-[12px]"
                  href="https://sat02yam.github.io/agreatproject"
                >
                  https://sat02yam.github.io/agreatproject
                </Link>
                <p className="mt-5 font-medium text-[12px] font-Inter mb-1">
                  Comments
                </p>
                <div className="border border-[#ffffff33] p-2 h-fit w-fit md:w-[332px] text-[#858585] text-[12px] font-normal">
                  Lorem ipsum dolor sit amet consectetur. Ante sit gravida magna
                  purus tortor iaculis est amet ridiculus. Sed at risus
                  consectetur amet dictum.{" "}
                </div>
                <p className="mt-5 font-medium text-[12px] font-Inter mb-1">
                  Send a review
                </p>
                <textarea
                  placeholder="Write your review here"
                  name="review"
                  id="review"
                  className="resize-none bg-transparent border border-[#ffffff33] placeholder:text-[#858585] placeholder:text-[12px] placeholder:font-normal p-3"
                ></textarea>
                <button className="mt-5 w-[126px] h-[32px] border border-[#ffffff33] font-medium text-[12px] font-Inter capitalize bg-[#000000cc] hover:bg-[#242426]">
                  Send for Review
                </button>
              </div>
              {/* right */}
              <div className=" w-full md:w-[350px]">
                <div className=" w-full mt-5 md:mt-0 md:w-[350px] flex justify-between px-2 items-center flex-col  smallMobile:flex-row">
                  <p className="font-medium mb-2 smallMobile:mb-0 text-[12px]">
                    Attachments
                  </p>
                  <button className="px-4 py-[4.5px] h-[24px] border border-[#ffffff33] font-medium text-[12px] font-Inter capitalize bg-[#000000cc] flex justify-center items-center gap-2 hover:bg-[#3D3D3D]">
                    <AiOutlineDownload />
                    Download all files (ZIP)
                  </button>
                </div>
                <div className="h-[230px] overflow-scroll projectScroll  gap-4 my-5  flex flex-wrap justify-center">
                  <>
                    {[...Array(12)].map((i) => (
                      <div key={i} className="relative group hover:opacity-80">
                        <img
                          src="/images/subMetal.png"
                          alt="attachment"
                          height={100}
                          width={100}
                        />
                        <div className="hidden  group-hover:flex duration-500 ease-in text-[9px] font-[600] gap-[6px] absolute top-[40%] left-[7%] border-[1px] border-white border-opacity-20 z-50 bg-black bg-opacity-80 px-3 py-1 hover:scale-[1.1] cursor-pointer">
                          <Image
                            src={"/icons/download.svg"}
                            height={9}
                            width={9}
                            alt="download"
                          />
                          Download
                        </div>
                      </div>
                    ))}
                  </>
                </div>
                <Link
                  href={"/"}
                  className=" underline font-normal text-white text-[12px]"
                >
                  View More
                </Link>
              </div>
            </div>
            <div className="flex  justify-center md:justify-end gap-3">
              <button
                onClick={() => {
                  setStatus("reject");
                  setAcceptPopup(!acceptPopup);
                }}
                className="mt-5 w-[95px] h-[40px] border border-[#ffffff33] font-medium text-[14px] font-Inter capitalize bg-[#000000cc] hover:bg-[#242426]"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  setStatus("accept");
                  setAcceptPopup(!acceptPopup);
                }}
                className="mt-5 w-[101px] h-[40px] border border-[#ffffff33] font-medium text-[14px] text-black font-Inter capitalize bg-[#A9FF1C]  hover:opacity-80"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </AnimateWrapper>
      <AcceptRejectPopup
        status={status}
        acceptPopup={acceptPopup}
        setAcceptPopup={setAcceptPopup}
      />
    </div>
  );
};

export default TaskSubmission;
