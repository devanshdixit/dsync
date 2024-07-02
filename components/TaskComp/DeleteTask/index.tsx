import React, { useState } from "react";
import AcceptRejectPopup from "../../AcceptRejectPopup";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const DeleteTask = ({ handleSubmit, handleDelete, isLoading }: any) => {
  const [acceptPopup, setAcceptPopup] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: "black" }} spin />
  );
  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="text-[12px] text-black px-4 py-[7px]  font-[600] bg-[#A9FF1C] flex gap-2 items-center justify-center"
        >
          {isLoading && <Spin indicator={antIcon} />}
          Save
        </button>
        <div
          onClick={() => {
            setStatus("delete");
            setAcceptPopup(!acceptPopup);
          }}
          className="flex justify-center items-center cursor-pointertext-[12px] text-white px-4 py-[7px] font-[600]  bg-black border-[1px] border-white border-opacity-20  "
        >
          <AcceptRejectPopup
            acceptPopup={acceptPopup}
            setAcceptPopup={setAcceptPopup}
            status={status}
            deletefunction={handleDelete}
          />
          Delete task
        </div>
      </div>
    </>
  );
};

export default DeleteTask;
