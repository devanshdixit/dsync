import Image from "next/image";
import { BsSliders } from "react-icons/bs";
import Button from "../Forms/Button";

const Filter = () => {
  return (
    <div className="2xl:mx-auto 2xl:w-[70%]">
      <div className="dropdown  text-white  dropdown-end">
        <label tabIndex={0}>
          <BsSliders className="md:hidden" />
          <Button
            title={"Filters"}
            icon={<BsSliders />}
            className="hidden md:flex justify-center items-center flex-row-reverse gap-[10px] border-[1px] border-white px-[16px] py-[8px]  font-[600] text-[14px]"
          />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu shadow bg-[#0C0C0E]  p-2"
        >
          <li className="border-b-[1px] border-[#3D3D3D]  ">
            <div className="text-[12px] text-[#858585] font-[400] leading-6 font-Inter pr-[173px] py-2">
              Share
            </div>
          </li>
          <li className="flex gap-[16px]">
            <div className="text-[12px] font-[400] leading-6 font-Inter pr-[105px] py-2 hover:bg-[#242426] ">
              <Image
                src={"/icons/recadded.svg"}
                height={20}
                width={20}
                alt=""
                className="w-5 h-5 object-contain"
              />{" "}
              Recently added
            </div>
          </li>
          <li className="flex gap-[17px]">
            <div className="text-[12px] font-[400] leading-6 font-Inter pr-[127px] py-2 hover:bg-[#242426] ">
              <Image
                src={"/icons/date.svg"}
                height={20}
                width={20}
                alt=""
                className="w-5 h-5 object-contain"
              />
              Due date
            </div>
          </li>
          <li className="flex gap-[17px]">
            <div className="text-[12px] font-[400] leading-6 font-Inter pr-[190px] py-2 hover:bg-[#242426] ">
              <Image
                src={"/icons/tag.svg"}
                height={20}
                width={20}
                alt=""
                className="w-5 h-5 object-contain"
              />
              Tags
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
