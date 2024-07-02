import React, { Dispatch, SetStateAction } from "react";
import ClaimButton from "../../ClaimButton";
import TaskStartBtn from "../../TaskStartBtn";
import TaskSubmitBtn from "../../TaskSubmitBtn";
import classNames from "classnames";
import { TaskCardProps } from "../../../../utils/types";

const StartSubmitClaim = ({
  isTaskStarted,
  handleStartTask,
  taskDetails,
  showSubmissions,
  setShowSubmissions,
  showClaim,
  claimLoading,
  handelClaim,
  starttaskLoading,
  handleStaking,
}: {
  isTaskStarted: boolean;
  handleStartTask: Function;
  taskDetails: TaskCardProps;
  showSubmissions: boolean;
  setShowSubmissions: Dispatch<SetStateAction<boolean>>;
  showClaim: boolean;
  claimLoading: boolean;
  handelClaim: Function;
  starttaskLoading: boolean;
  handleStaking: Function;
}) => {
  return (
    <>
      <div className="flex gap-4">
        {taskDetails.status !== "Done" && (<>  {/* below buttons are only shown to contributors */}
          {isTaskStarted === false && (
            <TaskStartBtn
              handleStartTask={handleStartTask}
              starttaskLoading={starttaskLoading}
            />
          )}
          {/* This button changes to Task submitted after submittibng task */}
          {isTaskStarted && (
            <TaskSubmitBtn
              taskDetails={taskDetails}
              showSubmissions={showSubmissions}
              setShowSubmissions={setShowSubmissions}
              classNames={classNames}
              handleStaking={handleStaking}
            />
          )}</>)}
        {/* claim reward button */}
        {taskDetails.status === "Done" && (
          <>
            <ClaimButton
              showClaim={showClaim}
              claimLoading={claimLoading}
              handelClaim={handelClaim}
            />
          </>
        )}
      </div>
    </>
  );
};

export default StartSubmitClaim;
