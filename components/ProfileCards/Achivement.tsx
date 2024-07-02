import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";

const Achivement = ({ value, text }: any) => {
  return (
    <div className="relative border-[0.5px] border-[#3D3D3D] bg-black  h-[125px] w-[185.5px] flex justify-center  items-center flex-col hover:bg-[#242426] cursor-pointer group">
      <div className="group-hover:scale-125 duration-300 text-[28px] text-[#A9FF1C] font-bold font-satoshi">
        {value}
      </div>
      <div className="group-hover:scale-125 group-hover:text-white duration-300 text-[12px] text-[#858585] font-semibold flex justify-center items-center">
        {text} &nbsp;{" "}
        <BsArrowRight className="group-hover:scale-125 duration-300 hidden group-hover:block ease-in" />
      </div>
      <AiOutlineQuestionCircle className="group-hover:scale-125 duration-300 hidden group-hover:block ease-in absolute top-2 right-2" />
    </div>
  );
};

export default Achivement;
