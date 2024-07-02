import { notification, Spin } from "antd";
import React from "react";
import Button from "../../Forms/Button";
import { LoadingOutlined } from "@ant-design/icons";
const ClaimButton = ({
  showClaim,
  claimLoading,
  handelClaim,
}: {
  showClaim: boolean;
  claimLoading: boolean;
  handelClaim: Function;
}) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: "black" }} spin />
  );
  return (
    <>
      {showClaim ? (
        <>
          {claimLoading ? (
            <Button
              title={
                <div>
                  Claiming{" "}
                  <Spin indicator={antIcon} />
                </div>
              }
              onClick={(e: any) => {
                e.preventDefault();
                notification.info({
                  message:
                    "pls wait transaction in progress!",
                });
              }}
              className=" text-black flex flex-row-reverse px-[26px] py-[10px] gap-5 bg-[#80ED5D] items-center hover:bg-opacity-80"
            />
          ) : (
            <Button
              title="Claim Reward"
              onClick={handelClaim}
              className=" text-black flex flex-row-reverse px-[26px] py-[10px] gap-5 bg-[#80ED5D] items-center hover:bg-opacity-80"
            />
          )}
        </>
      ) : (
        <Button
          title="Reward Claimed"
          onClick={(e: any) => {
            e.preventDefault();
            notification.info({
              message: "Already Claimed!",
            });
          }}
          className=" text-black flex flex-row-reverse px-[26px] py-[10px] gap-5 bg-[#80ED5D] items-center hover:bg-opacity-80"
        />
      )}
    </>
  );
};

export default ClaimButton;
