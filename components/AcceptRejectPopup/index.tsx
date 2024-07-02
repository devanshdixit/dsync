import React, { SyntheticEvent } from "react";
import { AiOutlineClose } from "react-icons/ai";

const AcceptRejectPopup = ({
  status,
  acceptPopup,
  setAcceptPopup,
  acceptfunction,
  rejectfunction,
  deletefunction,
}: {
  status: string;
  acceptPopup: boolean;
  setAcceptPopup: Function;
  acceptfunction?: any,
  rejectfunction?: any,
  deletefunction?: any,
}) => {
  return (
    <div
      className={`${
        acceptPopup ? "block" : "hidden"
      } fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black z-50 w-fit md:w-[346px] h-fit text-white border-[0.5px] border-[#3D3D3D] flex justify-center items-center flex-col p-[36px]`}
    >
      {(status === "accept" || status === "reject") && (
        <div className="text-center font-semibold font-Inter text-16px]">
          {`Are you sure you want to ${
            status === "accept" ? "accept" : "reject"
          }  this submission?`}
        </div>
      )}
      {status === "delete" && (
        <div className="text-center font-semibold font-Inter text-16px]">
          Are you sure you want to delete this task?
        </div>
      )}
      {status === "accept" && (
        <p className="text-center font-normal text-[12px] text-[#858585]">
          Please note : Accepting this submission will reject all other
          submissions
        </p>
      )}
      <div className="flex  justify-center gap-0 mobile:gap-3 mobile:flex-row flex-col">
        <button
          onClick={() => {
            setAcceptPopup(!acceptPopup);
          }}
          className="mt-5 w-[101px] px-2 h-[40px] border border-[#ffffff33] font-medium text-[12px] font-Inter capitalize bg-[#000000cc] hover:bg-[#242426]"
        >
          Skip for Now
        </button>
        <button
          onClick={(e: SyntheticEvent)=>{
            e.preventDefault();
            if (status === "accept") {
              acceptfunction();
            }
            if (status === "reject") {
              rejectfunction();
            }
            if (status === "delete") {
              deletefunction();
            }
          }}
          className={`mt-5 w-[101px] h-[40px] border border-[#ffffff33] font-medium text-[12px] text-black font-Inter capitalize   hover:opacity-80 
          ${status === "accept" && "bg-[#A9FF1C]"} 
          ${status === "reject" && "bg-[#FF1C1C]"}
          ${status === "delete" && "bg-[#FF1C1C]"}
          `}
        >
          {status === "accept" && "Accept"}
          {status === "reject" && "Reject"}
          {status === "delete" && "Delete"}
        </button>
      </div>
      <AiOutlineClose
        onClick={() => {
          setAcceptPopup(!acceptPopup);
        }}
        className="text-white h-6 w-6 absolute top-2 right-2"
      />
    </div>
  );
};

export default AcceptRejectPopup;
