import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Project, TaskCardProps } from "../../utils/types";
import Button from "../Forms/Button";
import Share from "../ShareButton";

const ProjectDescription: FC<{ project: Project; task: TaskCardProps }> = ({
  project,
  task,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mt-[35px] mb-[20px] md:mb-7">
        <div className="flex gap-4 items-center ">
          {project.logo && project.logo === "" ? (
            <Image
              src={`https://ui-avatars.com/api/?background=242426&color=fff&name=${project.name.trim()}`}
              height={32}
              width={32}
              alt={"logo"}
            />
          ) : (
            <Image
              src={
                project?.logo
                  ? project.logo
                  : `https://ui-avatars.com/api/?background=242426&color=fff&name=${project.name.trim()}`
              }
              height={32}
              width={32}
              alt={"logo"}
            />
          )}
          <div className="text-white text-[22px] font-[600] font-sans">
            {project.name}
          </div>
          <div className="text-[14px] font-[400] text-white text-opacity-60">
            Created on{" "}
            {moment(project.created_at).format("MMMM Do YYYY, h:mm:ss a")}
          </div>
        </div>
        <div className="text-white flex gap-2 items-center">
          <Link href={`/project/${project.id}`} passHref>
            <Button
              title={"Project Details"}
              icon={
                <Image
                  src={"/icons/project.png"}
                  height={20}
                  width={20}
                  alt="Project Details Icons"
                />
              }
              className="hidden md:flex justify-center items-center flex-row-reverse gap-[10px] border-[1px] border-white px-[16px] py-[8px] font-[600] text-[14px] hover:bg-[#242426]"
            />
          </Link>
          {task.status === "Draft" ? (
            ""
          ) : (
            <Share home={false} name={project.id} />
          )}
        </div>
      </div>
      <Link href={`/project/${project.id}`} passHref>
        <Button
          title={"Project Details"}
          icon={
            <Image
              src={"/icons/project.png"}
              height={20}
              width={20}
              alt="Project Details Icons"
            />
          }
          className="flex md:hidden justify-center items-center flex-row-reverse gap-[10px] border-[1px] text-white border-white w-[100%] py-[8px] font-[600] text-[14px] hover:bg-[#242426] mb-[24px]"
        />
      </Link>
    </>
  );
};

export default ProjectDescription;
