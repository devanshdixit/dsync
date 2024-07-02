import React, { Dispatch, SetStateAction } from "react";
import { TaskCardProps } from "../../../utils/types";
import TaskSubmission from "../../TaskSubmission";

const TaskSubmitBtn = ({
  taskDetails,
  showSubmissions,
  setShowSubmissions,
  classNames,
  handleStaking,
}: {
  taskDetails: TaskCardProps;
  showSubmissions: boolean;
  setShowSubmissions: Dispatch<SetStateAction<boolean>>;
  classNames: any;
  handleStaking: Function;
}) => {
  return (
    <>
      <TaskSubmission
        task={taskDetails}
        showSubmissions={showSubmissions}
        setShowSubmissions={setShowSubmissions}
        handleStaking={handleStaking}
      />
    </>
  );
};

export default TaskSubmitBtn;
