import Image from "next/image";
import { FC } from "react";
import ProjectDetails from "../ProjectDetails";

interface ProjectDetails {
  projectDetails: any;
}

const SubmissionProjectName: FC<ProjectDetails> = ({ projectDetails }) => {
  return (
    <>
      <div className="font-bold font-satoshi my-5 px-2 text-[28px] text-white">
        Submission
      </div>
      <div className="py-2 px-4 flex justify-between bg-[#0C0C0E] h-[56px] items-center mb-3">
        <div className="flex gap-4 items-center">
          {projectDetails?.logo && projectDetails.logo === "" ? (
            <Image
              src={"/images/projectlogo.png"}
              height={32}
              width={32}
              alt={"logo"}
            />
          ) : (
            <Image
              src={`https://ui-avatars.com/api/?background=242426&color=fff&name=${projectDetails?.name.trim()}`}
              height={32}
              width={32}
              alt={"logo"}
            />
          )}
          <div className="text-white text-[22px] font-[600] font-sans">
            {projectDetails.name}
          </div>
          {/* <div className="hidden md:flex text-[14px] font-[400] font-sans text-white text-opacity-60  items-end">
                      Created on 23 Sept 2022 05:00PM IST
                    </div> */}
        </div>
        <div className="text-white flex gap-2 items-center">
          <ProjectDetails project={projectDetails} />
        </div>
      </div>
    </>
  );
};

export default SubmissionProjectName;
