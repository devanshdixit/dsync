import React from "react";
import { BiPurchaseTagAlt } from "react-icons/bi";

const HistoryCard = ({
  tag,
  title,
  desc,
  price,
  status,
  contributors,
}: any) => {
  return (
    <div className="p-4 border border-[#3D3D3D] flex flex-col gap-3">
      <div className="flex justify-start items-center gap-1  text-[#858585] font-Inter font-normal">
        <BiPurchaseTagAlt />
        {tag}
      </div>
      <div className="text-white font-normal text-[16px]">{title}</div>
      <p className="font-normal text-[12px] text-[#CECECE]">{desc}</p>
      <div className="flex flex-row justify-end gap-3 ">
        <div className="flex gap-3">
          <div className="flex justify-center items-center h-[30px] gap-3 border border-[#ffffff33] px-1 text-white">
            <img src="/icons/usdt.png" alt="usdt" height={20} width={20} />
            <div>{price}</div>
          </div>
          <div className="bg-[#80ED5D] bg-opacity-30 w-[48px] h-[30px] font-normal text-[12px] text-[#80ED5D] flex justify-center items-center">
            {status ? status : "Done"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
