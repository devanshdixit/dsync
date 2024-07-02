import Image from "next/image";
import Button from "../Forms/Button";
import { VscRefresh } from "react-icons/vsc";
import { FC } from "react";
import { Error } from "../../utils/types";

const Error: FC<Error> = ({ error, type }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center ${(type = "info"
        ? "mt-0"
        : "mt-[180px]")} ${(type = "error" ? "mt-[180px]" : "mt-0")}`}
    >
      {type === "status" ? (
        <svg className="spinner" viewBox="0 0 50 50">
          <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="5"
          ></circle>
        </svg>
      ) : (
        <Image
          src={"/icons/error.svg"}
          height={30}
          width={30}
          alt="error"
          className="mb-2"
        />
      )}
      <div
        className={`${
          type === "status" ? "text-2xl" : "text-[15px]"
        } mb-4  font-[400] text-[#858585] text-center`}
      >
        {error}
      </div>
      {type === "status" ? (
        ""
      ) : (
        <Button
          title="Refresh"
          icon={<VscRefresh className="h-[20px] w-[20px]" />}
          className="pr-4 pl-2 h-10 bg-[#a9ff1c] text-black text-[15px] font-[600] flex flex-row-reverse gap-2 justify-center items-center"
          onClick={(e: any) => {
            e.preventDefault();
            location.reload();
          }}
        />
      )}
    </div>
  );
};

export default Error;
