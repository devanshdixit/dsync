import { notification } from "antd";
import { FC, useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { makeHasuraAdminRequest } from "../../config/fetch-requests";
import { UserContext } from "../../context/user.context";
import { createTask } from "../../utils/queries";
import { TaskCardProps, TaskCreateProps } from "../../utils/types";
import SelectDate from "../DatePicker";
import InfoWarning from "../InfoWarning";

const CreateTask: FC<{
  onClose: Function;
  projectId: string;
}> = ({ onClose, projectId }) => {
  const { user } = useContext(UserContext);
  const [tasktitle, setTaskTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState<{
    isError: boolean;
    message: string;
  }>({
    isError: false,
    message: "",
  });
  const handelClose = () => {
    setTaskTitle("");
    onClose();
  };
  const handleSubmit = async () => {
    try {
      setError({
        isError: false,
        message: "",
      });
      if (tasktitle === "") {
        setError({
          isError: true,
          message: "please add a title",
        });
        return;
      }
      if (!user) {
        setError({
          isError: true,
          message: "please login/signup",
        });
        return;
      }
      setLoading(true);
      const formValues: TaskCreateProps = {
        title: tasktitle.trim(),
        status: "Draft",
        projectId: `${projectId}`,
        eta: selectedDate,
      };
      const response = await makeHasuraAdminRequest(createTask, {
        variables: {
          eta: formValues.eta,
          projectId: `${formValues.projectId}`,
          status: formValues.status,
          title: formValues.title,
          createdBy: `${user.id}`,
        },
      });
      if (response?.errors) {
        setError({
          isError: true,
          message: "error! try again",
        });
        setLoading(false);
        return;
      }
      if (response?.data) {
        handelClose();
        notification.success({ message: "Task created!" });
      }
    } catch (err) {
      setError({
        isError: true,
        message: "error! try again",
      });
      notification.error({ message: "error! try again" });
    }
  };
  return (
    <>
      {error.isError && <InfoWarning error={error.message} />}
      <textarea
        value={tasktitle}
        className="border-[1px] border-[#A9FF1C] bg-[#D8FF99] bg-opacity-5 mx-2 w-[94%] resize-none p-2"
        name="task Title"
        rows={3}
        placeholder={"Enter task title"}
        onChange={(e: any) => setTaskTitle(e.target.value)}
      />
      <div className="flex justify-between mx-2 items-center text-white my-4 ">
        <div className="flex items-center gap-3">
          {tasktitle.length <= 3 && (
            <button
              className="px-4 py-2 bg-[#101A00] text-white"
              disabled={true}
            >
              Add Task
            </button>
          )}
          {tasktitle.length > 3 && (
            <>
              {loading ? (
                <button
                  className="px-4 py-2 bg-[#101A00] text-white"
                  disabled={true}
                >
                  Add Task
                </button>
              ) : (
                <button
                  onClick={(e: any) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="px-4 py-2 bg-[#A9FF1C] text-black"
                >
                  Add Task
                </button>
              )}
            </>
          )}
          <AiOutlineClose className="w-6 h-6" onClick={handelClose} />
        </div>
        <div className="flex items-center gap-4">
          <SelectDate setSelectedDate={setSelectedDate} />
        </div>
      </div>
    </>
  );
};
export default CreateTask;
