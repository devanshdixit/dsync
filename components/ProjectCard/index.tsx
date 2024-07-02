import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { TwitterShareButton } from "react-share";
import { Project } from "../../utils/types";
import { card } from "../Animations/View-all";
import Share from "../ShareButton";
import moment from "moment";
import BtnClickWrapper from "../Animations/Wrappers/BtnClickWrapper";
import ProgressBar from "../Animations/progressBar";

interface ProjectData {
  project: any;
}
const ProjectCard: FC<ProjectData> = ({ project }) => {
  return (
    <>
      {project &&
        project?.map((item: Project, i: number) => (
          <BtnClickWrapper key={i}>
            <motion.div
              variants={card}
              className="bg-[#0C0C0E]  px-4 py-5 mb-2 hover:bg-[#242426]"
            >
              <Link href={`/project/${item?.id}`}>
                <div className="flex justify-between flex-col md:flex-row">
                  <div className="flex flex-col items-baseline ">
                    <div className="flex">
                      <div className="flex items-center">
                        {item?.logo && project?.logo !== "" ? (
                          <Image
                            src={item?.logo}
                            height={32}
                            width={32}
                            alt={"logo"}
                          />
                        ) : (
                          <Image
                            src={`https://ui-avatars.com/api/?background=242426&color=fff&name=${item?.name?.trim()}`}
                            height={32}
                            width={32}
                            alt={"logo"}
                          />
                        )}
                        <div className="text-[24px] font-[700] text-white gap-2 font-satoshi ml-2 ">
                          {item.name.trim()}
                        </div>
                      </div>
                      <div
                        className="text-[#858585] flex items-center
               text-[12px] font-[400] ml-[26px] gap-1"
                      >
                        <BiPurchaseTagAlt className="text-[#858585] w-4 h-4 " />
                        <div className="capitalize">{item.category}</div>
                      </div>
                    </div>
                    <div className="text-[12px] font-[400] text-[#858585] ">
                      Last Updated: {moment(item?.updated_at).fromNow()}
                    </div>
                  </div>
                  <div className="flex flex-col mt-2 md:mt-0 items-end gap-1">
                    {/* progress bar */}
                    <ProgressBar percentage={70} width={210} />
                    <div className="text-white text-[12px] font-[400]">
                      Fullfiled{" "}
                      <span className="font-[700] text-[16px]"> $3,363</span>
                    </div>
                    <div className="text-white  text-[12px] font-[400] hidden md:flex gap-2 items-center">
                      <div className="">Project Value</div>
                      <div>
                        <Image
                          src={"/icons/usdt.png"}
                          height={13}
                          width={13}
                          alt="coin"
                        />
                      </div>
                      <div className="text-[11px] md:text-[12px]">
                        {" "}
                        0.05 BTC
                      </div>
                      <div className="text-[11px] md:text-[12px]">
                        {" "}
                        0.05 BTC
                      </div>
                      <div className="text-[11px] md:text-[12px]">
                        {" "}
                        / $6,356
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-[#CECECE] mt-2 mb-2 md:text-[16px] text-[12px]">
                  {`${`Sapien morbi est ut quisque nibh morbi arcu turpis viverra. Leo,
           vehicula orci nulla rhoncus tempus, scelerisque ut nunc. Aliquam nisl,velit
            eu tincidunt proin cras vel.
             Ut eu orci sagittis iaculis at`.slice(0, 250)}...`}
                </div>
              </Link>
              <div className=" text-[#858585] flex flex-row mt-[11px] md:mt-0 justify-between md:gap-0 md:items-center ">
                <div className="flex  items-center gap-2">
                  <div className="text-[12px] font-[400] hidden md:block">
                    25 Contributors
                  </div>
                  <Image
                    src={"/icons/contributors.png"}
                    width={67}
                    alt="contributors"
                    height={30}
                  />
                </div>
                <div className="flex items-center gap-4 text-[16px] z-10 ">
                  <TwitterShareButton
                    url={`${window.location.href}project/${item?.id}`}
                  >
                    <div className="underline underline-offset-2 text-[#CECECE] flex items-center gap-2">
                      <BsTwitter />
                      <div> Share on twitter</div>
                    </div>
                  </TwitterShareButton>
                  <Share
                    project={project}
                    isSmall={true}
                    category="project"
                    name={item?.id}
                    home={true}
                  />
                </div>
              </div>
            </motion.div>
          </BtnClickWrapper>
        ))}
    </>
  );
};

export default ProjectCard;
