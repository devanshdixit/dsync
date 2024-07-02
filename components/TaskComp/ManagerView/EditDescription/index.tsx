import React, { Dispatch, SetStateAction } from "react";

const EditDescription = ({
  showEditDesc,
  setDescription,
  description,
}: {
  showEditDesc: boolean;
  setDescription: Dispatch<SetStateAction<string>>;
  description: string;
}) => {
  return (
    <>
      {showEditDesc && (
        <textarea
          onChange={(e: any) => {
            setDescription(e.target.value);
          }}
          className=" h-[211px] w-[100%] md:w-[400px] bg-transparent text-[14px] font-[400] text-white leading-4 mb-[20px] resize-none border-[1px] border-[#858585] placeholder:text-[14px] placeholder:font-[400] placeholder:text-white p-4 placeholder:text-opacity-50"
          placeholder="Add detailed task description"
          value={description}
        />
      )}
    </>
  );
};

export default EditDescription;
