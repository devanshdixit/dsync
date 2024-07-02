import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";

const KanbanSmallCard = ({ value, text }: any) => {
  return (
    <div className="border-[0.5px] border-[#3D3D3D] bg-[#0C0C0E]  h-[92px] w-[189.55px] flex justify-center  items-center  flex-col hover:bg-[#242426] cursor-pointer group relative ">
      <div className="text-[36px] text-white font-bold font-satoshi group-hover:scale-125 duration-300">
        {value}
      </div>
      <div className="group-hover:scale-110 group-hover:text-white duration-300 text-[14px] text-[#858585] font-semibold flex justify-center items-center">
        {text} &nbsp;{" "}
        <BsArrowRight className="group-hover:scale-125 duration-300 hidden group-hover:block ease-in" />
      </div>
      <AiOutlineQuestionCircle className="group-hover:scale-125 duration-300 hidden group-hover:block ease-in absolute top-2 right-2" />
    </div>
  );
};

export default KanbanSmallCard;
