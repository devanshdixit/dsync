import React, { Dispatch, SetStateAction } from "react";
import classNames from "classnames";

const EditLink = ({
  showEditLink,
  setErrorMsg,
  link,
  setLink,
  errorMsg,
}: {
  showEditLink: boolean;
  setErrorMsg: Dispatch<SetStateAction<string>>;
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
  errorMsg: string;
}) => {
  const gitHublinkValidator =
    /((http|git|ssh|http(s)|file|\/?)|(git@[\w\.]+))(:(\/\/)?)([\w\.@\:/\-~]+)?/;
  return (
    <>
      {showEditLink && (
        <div>
          <input
            onBlur={(e) => {
              setErrorMsg("");
              if (link.match(gitHublinkValidator)) {
                setErrorMsg("");
              } else {
                setErrorMsg("Enter valid Github link");
              }
            }}
            onChange={(e: any) => {
              setErrorMsg("");
              setLink(e.target.value);
            }}
            className={classNames(
              "w-[100%] md:w-[400px] bg-transparent text-[14px] font-[400] text-white leading-4 mb-[20px] resize-none border-[1px] border-[#858585] placeholder:text-[14px] placeholder:font-[400] placeholder:text-white p-4 placeholder:text-opacity-50"
            )}
            placeholder="Add a link "
            value={link}
          />
          <div className="text-red-500 animate-[pulse_1s_ease-in-out] text-[14px]">
            {errorMsg}
          </div>
        </div>
      )}
    </>
  );
};

export default EditLink;
