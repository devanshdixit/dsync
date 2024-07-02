import { List } from "antd";
import classNames from "classnames";
import Image from "next/image";
import { FC, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Input from "../Forms/Input";

interface search {
  className: string;
  projects?: any;
  tasks?: any;
}

const Search: FC<search> = ({ className, projects, tasks }) => {
  const [projectdata, setProjectData] = useState<any>();
  const [taskdata, setTaskData] = useState<any>();
  const [value, setValue] = useState<string>("");

  const handleSearch = (value: string) => {
    let projectList: any = [];
    let taskList: any = [];

    projects?.map((item: any) => {
      if (value === "") {
        setProjectData("");
      } else if (
        item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      ) {
        projectList.push(item);
      }

      setProjectData(projectList);
    });
    tasks?.map((item: any) => {
      if (value === "") {
        setTaskData("");
      } else if (
        item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      ) {
        taskList.push(item);
      }
      setTaskData(taskList);
    });
  };
  console.log(value?.length > 0);

  return (
    <>
      <div className="search container ">
        <div className="inputContainer">
          <Input
            placeholder="Search Task"
            type="text"
            className={className}
            value={value}
            icon={
              <BsSearch className="h-[15px] w-[15px] absolute top-[12px] left-[20px] text-white " />
            }
            onChange={(e: any) => {
              handleSearch(e.target.value);
              setValue(e.target.value);
            }}
          />
          <div className="close">
            {value && (
              <Image
                src="/icons/x.png"
                alt="Search"
                height={20}
                width={20}
                onClick={() => {
                  setProjectData("");
                  setTaskData("");
                  setValue("");
                }}
              />
            )}
          </div>
        </div>
        <>
          {value?.length > 0 && (
            <div>
              <div>
                <div className="flex flex-col border border-t-0 border-b-[#3D3D3D] border-l-[#3D3D3D] border-r-[#3D3D3D] absolute bg-[#0C0C0E] top-[38px] left-0 right-0  overflow-scroll projectScroll">
                  <div className=" pl-7 py-[9px] text-[16px] font-[600]">
                    Project
                  </div>
                  <>
                    {projectdata?.length > 0 ? (
                      projectdata?.map(
                        (item: any, i: number) =>
                          item.type === "Project" && (

                            <a href={item.url} key={i}>
                              <div className="flex justify-between items-center w-full pl-7 py-[13.5px]">
                                <div className="flex gap-2 items-center ">
                                  {item?.logo && item?.logo !== "" ? (
                                    <Image
                                      className="aspect-square"
                                      src={item?.logo}
                                      height={32}
                                      width={32}
                                      alt={"logo"}
                                    />
                                  ) : (
                                    <Image
                                      src={`https://ui-avatars.com/api/?background=242426&color=fff&name=${item?.name.trim()}`}
                                      height={32}
                                      width={32}
                                      alt={"logo"}
                                    />
                                  )}
                                  <div className="capitalize">{item?.name}</div>
                                </div>

                              </div>
                            </a>
                          )
                      )
                    ) : (
                      <div className="text-[12px] w-full pl-7 py-[13.5px]">
                        No matches for{" "}
                        <span className="underline">{value}</span> in Projects
                      </div>
                    )}
                    <div className=" pl-7 py-[9px] text-[16px] font-[600]">
                      Task
                    </div>
                    {taskdata?.length > 0 ? (
                      taskdata?.map(
                        (item: any, i: number) =>
                          item.type === "Task" && (

                            <a href={item.url} key={i}>
                              <div className="flex justify-between items-center w-full pl-7  py-[13.5px]">
                                <div className="flex gap-2 ">
                                  {item?.logo && item?.logo !== "" ? (
                                    <Image
                                      className="aspect-square"
                                      src={item?.logo}
                                      height={32}
                                      width={32}
                                      alt={"logo"}
                                    />
                                  ) : (
                                    <Image
                                      src={`https://ui-avatars.com/api/?background=242426&color=fff&name=${item?.name.trim()}`}
                                      height={32}
                                      width={32}
                                      alt={"logo"}
                                    />
                                  )}
                                  <span className="text-white text-[14px] font-[400] capitalize">
                                    {item?.name}{" "}
                                    <span className="text-[#858585] text-[14px] font-[400] underline underline-offset-4">
                                      in {item?.projectname}
                                    </span>

                                  </span>
                                </div>
                              </div>
                            </a>
                          )
                      )
                    ) : (
                      <div className="text-[12px] w-full pl-7 py-[13.5px]">
                        No matches for{" "}
                        <span className="underline">{value}</span> in Tasks
                      </div>
                    )}
                  </>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default Search;
