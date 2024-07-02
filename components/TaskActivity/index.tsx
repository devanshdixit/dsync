import Image from "next/image";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { BsClock } from "react-icons/bs";
import { TaskCardProps } from "../../utils/types";
import StakedAmount from "../StakedAmount";
import { Upload } from "antd";
import Link from "next/link";
import { motion } from "framer-motion";

interface TaskActivityProps {
  task: TaskCardProps;
  isManager: boolean;
  handleStaking: Function;
  setImages: Dispatch<SetStateAction<any[]>>;
  images: any[];
}

const TaskActivity: FC<TaskActivityProps> = ({
  task,
  isManager,
  handleStaking,
  images,
  setImages,
}) => {
  const [loading, setLoading] = useState(false);

  const removeImage = (index: number) => {
    setImages([
      ...images.slice(0, index),
      ...images.slice(index + 1, images.length),
    ]);
  };

  function formatBytes(a: any, b = 2) {
    if (!+a) return "0 Bytes";
    const c = 0 > b ? 0 : b,
      d = Math.floor(Math.log(a) / Math.log(1024));
    return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
      ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
    }`;
  }

  return (
    <>
      <div className="flex flex-col gap-1 mb-6 min-w-[220px]">
        <div className="bg-[#242426] bg-opacity-30 flex gap-4 items-center py-[6px] pl-5 pr-[29px]">
          <div>
            <BsClock className="text-white" />
          </div>
          <div className="text-[14px] font-[400] text-white  px-2 py-1 min-w-fit">
            {task.eta}
          </div>
        </div>

        <div className="mt-2 relative">
          {isManager && (
            <input
              type="file"
              id="attachment"
              name="date"
              multiple
              accept="image/*"
              className="absolute top-0 left-0 right-0  text-transparent opacity-0 cursor-pointer"
              onChange={(e: any) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImages([...images, ...e.target.files]);
                }
                setLoading(!loading);
              }}
            />
          )}
          <label className="bg-[#242426] bg-opacity-30 flex justify-between  items-center py-[6px] pl-5 pr-[29px] cursor-pointer">
            <div className="flex gap-3 items-center">
              <Image
                src={"/icons/attachment.png"}
                height={15}
                width={15}
                alt="attachment"
              />
              <div className="text-[14px] font-[400] text-white  min-w-fit">
                Attachment
              </div>
            </div>
            {isManager && (
              <div className="text-[12px] text-[#A9FF1C] min-w-fit">+ Add</div>
            )}
          </label>
          {images &&
            images.map((item: any, index: number) => {
              return (
                <div
                  className="flex gap-3 border-[0.5px] border-[#282828] px-2 py-1 my-1  justify-between"
                  key={index}
                >
                  <div className="flex flex-2 items-center">
                    <Image
                      src={"/icons/file.svg"}
                      height={32}
                      width={32}
                      alt="file"
                    />
                    <div className="flex flex-col gap-[2px] break-all">
                      <div className="text-[#2B59FF] text-[12px] font-[400]  truncate">
                        {item?.name?.length > 10
                          ? `${item.name.slice(0, 10)}...${item.name.slice(-5)}`
                          : item.name}
                      </div>
                      <div className="text-[12px] text-[#4C4C50] font-[400]">
                        {formatBytes(item.size)}
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-[20px] text-[#c76d6d] font-[500] cursor-pointer"
                    onClick={() => removeImage(index)}
                  >
                    x
                  </div>
                </div>
              );
            })}
          {task?.attachment?.length > 0 && (
            <div className="grid grid-cols-2 justify-center items-center gap-2 my-2 mx-auto justify-items-center">
              {task?.attachment &&
                task?.attachment.map((item: any, i: number) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    initial={{
                      opacity: 0,
                      x: 200,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.5,
                      },
                    }}
                  >
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-end gap-2 text-white"
                    >
                      <div>{i + 1}.</div>
                      <Image
                        className="aspect-square object-contain"
                        key={i}
                        src={item?.url}
                        height={80}
                        width={80}
                        alt="attachments"
                      />
                    </Link>
                  </motion.div>
                ))}
            </div>
          )}
        </div>
        {isManager && task.status === "Draft" && (
          <>
            <div className={`bg-[#80ED5D15] p-2 `}>
              <StakedAmount handleStaking={handleStaking} task={task} />
              <div className="mt-2 text-[10px] font-[400] text-white text-opacity-80">
                Make this task accessible to global talent
              </div>
            </div>
            <div className="flex gap-2 p-2 bg-[#2B59FF10] ">
              <Image
                src={"/icons/info.svg"}
                height={17}
                width={17}
                alt="info"
              />
              <div className="text-[10px] font-[400] text-white text-opacity-80 leading-3 ">
                After staking existing members will be
                <br /> removed from the task
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TaskActivity;
