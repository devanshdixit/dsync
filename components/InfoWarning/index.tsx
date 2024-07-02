import { FC } from "react";
import { InfoWarning } from "../../utils/types";
import { AiFillInfoCircle } from "react-icons/ai";

const InfoWarning: FC<InfoWarning> = ({ error }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <AiFillInfoCircle className="h-5 w-5 text-yellow-500" />
      <div className="text-[15px] mt-4  font-[400] text-yellow-500 text-center">
        {error}
      </div>
    </div>
  );
};

export default InfoWarning;
