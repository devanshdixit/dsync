import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FC, useContext, useEffect, useState, SyntheticEvent } from "react";
import { UserContext } from "../../context/user.context";

import { SubmissionDetailsProps } from "../../utils/types";
import AcceptRejectPopup from "../AcceptRejectPopup";

const SubmissionDetails: FC<SubmissionDetailsProps> = ({
  submission,
  handleReject,
  handleAccept,
  buttonLoadingReject,
  buttonLoading,
  project,
  isManager
}) => {
  const [acceptPopup, setAcceptPopup] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [handle, setHandle] = useState<any>();
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="p-4 flex bg-[#0C0C0E] h-fit flex-col">
        <p className="text-white text-[16px] font-medium">Submitted by</p>
        <div className="flex items-center gap-2 mt-2">
          <Image src="/icons/userimg.png" alt="user" height={24} width={24} />
          <p className="text-[14px] font-normal text-[#CECECE]">
            {submission?.submittedBy && submission.submittedBy}
          </p>
        </div>

        <div className="flex flex-col justify-between md:flex-row">
          {/* left */}
          <div className="flex flex-col">
            {submission?.codelink && (
              <>
                <p className="mt-5 font-medium text-[12px] font-Inter">
                  Code Link
                </p>
                <Link
                  className="underline font-normal text-[12px] break-words "
                  href={submission.codelink}
                >
                  {submission.codelink}
                </Link>
              </>
            )}
            {submission?.outputLink && (
              <>
                <p className="mt-5 font-medium text-[12px] font-Inter">
                  Live Link
                </p>
                <Link
                  className="underline font-normal text-[12px] break-words"
                  href={submission.outputLink}
                >
                  {submission.outputLink}
                </Link>
              </>
            )}
            {submission?.comments && (
              <>
                <p className="mt-5 font-medium text-[12px] font-Inter mb-1">
                  Comments
                </p>
                <div className="  h-fit w-fit text-[#858585] text-[12px] font-normal">
                  {submission?.comments}
                </div>
              </>
            )}
            {/* <p className="mt-5 font-medium text-[12px] font-Inter mb-1">
              Send a review
            </p>
            <textarea
              placeholder="Write your review here"
              name="review"
              id="review"
              className="resize-none bg-transparent border border-[#ffffff33] placeholder:text-[#858585] placeholder:text-[12px] placeholder:font-normal p-3"
            ></textarea>
            <button className="mt-5 w-[126px] h-[32px] border border-[#ffffff33] font-medium text-[12px] font-Inter capitalize bg-[#000000cc] hover:bg-[#242426]">
              Send for Review
            </button> */}
          </div>
          {/* right */}
          <div className=" w-full md:w-[350px]">
            <div className=" w-full mt-5 md:mt-0 md:w-[350px] flex justify-between px-2 items-center">
              <p className="font-medium text-[12px]">Attachments</p>
              {/* <button className="px-4 py-[4.5px] h-[24px] border border-[#ffffff33] font-medium text-[12px] font-Inter capitalize bg-[#000000cc] flex justify-center items-center gap-2 hover:bg-[#3D3D3D]">
                <AiOutlineDownload />
                Download all files (ZIP)
              </button> */}
            </div>
            <div className="gap-4 my-5  flex flex-wrap">
              <>
                {submission?.images &&
                  submission?.images.map((item: any, index: number) => (
                    <div className="relative" key={index}>
                      <Image
                        src={item.url}
                        alt="attachment"
                        height={100}
                        width={100}
                      />
                      <Link href={item.url} download={true} passHref>
                        <div className="text-[9px] font-[600] flex gap-[6px] absolute top-[40%] left-[7%] border-[1px] border-white border-opacity-20 z-50 bg-black bg-opacity-80 px-3 py-1 hover:scale-[1.1] cursor-pointer">
                          <Image
                            src={item.url}
                            height={9}
                            width={9}
                            alt="download"
                          />
                          Download
                        </div>
                      </Link>
                    </div>
                  ))}
              </>
            </div>
            {/* <Link
              href={"/"}
              className=" underline font-normal text-white text-[12px]"
            >
              View More
            </Link> */}
          </div>
        </div>
        {isManager && submission.status === "submitted" && (
          <div className="flex  justify-center md:justify-end gap-3">
            <div
              onClick={(e: SyntheticEvent) => {
                e.preventDefault();
                setStatus("reject");
                setAcceptPopup(!acceptPopup);
              }}
              className="mt-5 w-[95px] h-[40px] border border-[#ffffff33] font-medium text-[14px] font-Inter capitalize bg-[#000000cc] hover:bg-[#242426] cursor-pointer flex justify-center items-center"
            >
              <AcceptRejectPopup
                status="reject"
                acceptPopup={false}
                setAcceptPopup={setAcceptPopup}
              />
              Reject
            </div>
            <div
              onClick={() => {
                setStatus("accept");
                setAcceptPopup(!acceptPopup);
              }}
              className="mt-5 w-[101px] h-[40px] border border-[#ffffff33] font-medium text-[14px] text-black font-Inter capitalize bg-[#A9FF1C]  cursor-pointer flex justify-center items-center "
            >
              <AcceptRejectPopup
                status={status}
                acceptPopup={acceptPopup}
                setAcceptPopup={setAcceptPopup}
                acceptfunction={handleAccept}
                rejectfunction={handleReject}
              />
              Accept
            </div>
          </div>
        )}
        {submission.status !== "submitted" && (
          <>
            {submission.status === "accepted" && (
              <div
                className={classNames(
                  "mt-5 w-[95px] text-black ml-auto h-[40px] border border-[#00ff5e] font-medium text-[14px] font-Inter capitalize bg-[#A9FF1C] cursor-pointer flex justify-center items-center  ",
                  buttonLoading ? "loading" : ""
                )}
              >
                Accepted
              </div>
            )}
            {submission.status === "rejected" && (
              <div
                className={classNames(
                  "mt-5 w-[95px] text-white ml-auto h-[40px] border border-[#ff3e3e] font-medium text-[14px] font-Inter capitalize bg-[#ff3e3e] hover:opacity-80 cursor-pointer flex justify-center items-center ",
                  buttonLoadingReject ? "loading" : ""
                )}
              >
                Rejected
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SubmissionDetails;
