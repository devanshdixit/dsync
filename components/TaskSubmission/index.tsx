import { notification, Spin } from "antd";
import Image from "next/image";
import { FC, useContext, useState } from "react";
import { UserContext } from "../../context/user.context";
import { IsError, SubmissionsStatus, TaskCardProps } from "../../utils/types";
import Input from "../Forms/Input";
import { LoadingOutlined } from "@ant-design/icons";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import InfoWarning from "../InfoWarning";
import { makeHasuraAdminRequest } from "../../config/fetch-requests";

function formatBytes(a: any, b = 2) {
  if (!+a) return "0 Bytes";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
    }`;
}

const TaskSubmission: FC<{
  task: TaskCardProps;
  setShowSubmissions: any;
  showSubmissions: any;
  handleStaking: any;
}> = ({ task, setShowSubmissions, showSubmissions, handleStaking }) => {
  const [files, setFiles] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { user, updateTask } = useContext(UserContext);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: "black" }} spin />
  );
  const [form, setForm] = useState<{
    codelink: string;
    outputLink: string;
    comments: string;
    images: Array<string>;
    submittedBy: string;
    status: SubmissionsStatus;
  }>({
    codelink: "",
    comments: "",
    images: [],
    outputLink: "",
    submittedBy: "",
    status: "submitted",
  });
  const dropHandler = (e: any) => {
    if (files.length > 2) {
      return;
    }
    setLoading(true);
    if (e.target.files && e.target.files.length > 0) {
      setFiles((prev: any) => {
        prev = [...prev, e.target.files[0]];
        return prev;
      });
    }
    setLoading(false);
  };
  function dragOverHandler(ev: any) {
    ev.preventDefault();
  }
  const [isError, setIsError] = useState<IsError>({
    isError: false,
    message: "",
  });
  const handleSubmit = async () => {
    setIsError({
      isError: false,
    });
    if (
      form.codelink === "" ||
      form.comments === "" ||
      form.outputLink === "" ||
      files.length === 0
    ) {
      setIsError({
        isError: true,
        message: "Empty Values!",
      });
      return;
    }
    setLoading(true);

    try {
      const imgUrls: string[] = [];
      if (files.length !== 0) {
        for (let index = 0; index < files.length; index++) {
          const element = files[index];
          const metadata: any = {
            contentType: element.type,
          };
          // Upload file and metadata to the object 'images/mountains.jpg'
          const storageRef = ref(
            storage,
            `project/${task.projectId}/${task.title}/` + element.name
          );
          const uploadTask = uploadBytesResumable(
            storageRef,
            element,
            metadata
          );

          // Listen for state changes, errors, and completion of the uplo
          console.log("uplaoding image ", index);
          await new Promise<void>((resolve) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                  case "paused":
                    console.log("Upload is paused");
                    break;
                  case "running":
                    console.log("Upload is running");
                    break;
                }
              },
              (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                  case "storage/unauthorized":
                    // User doesn't have permission to access the object
                    console.log("storage/unauthorized");
                    setIsError({
                      isError: true,
                      message: "Image upload failed - storage/unauthorized",
                    });
                    setLoading(false);
                    return;
                  case "storage/canceled":
                    // User canceled the upload
                    console.log("storage/canceled");
                    setIsError({
                      isError: true,
                      message: "Image upload failed - storage/canceled",
                    });
                    setLoading(false);
                    return;
                  case "storage/unknown":
                    // User canceled the upload
                    console.log("storage/unknown");
                    setIsError({
                      isError: true,
                      message: "Image upload failed - storage/unknown",
                    });
                    setLoading(false);
                    return;
                }
              },
              async () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(
                  async (downloadURL) => {
                    console.log("File available at", downloadURL);
                    imgUrls.push(downloadURL);
                    resolve();
                  }
                );
              }
            );
          });
        }
      }

      form.images = imgUrls;
      form.status = "submitted";
      form.submittedBy = user?.id.toString();
      const data: any = {
        submissions: task.submissions,
        activity: task.activity,
      };
      data.submissions = [...data.submissions, form];
      data.activity = [...data.activity, user?.id.toString()];

      console.log("form data:", { data });
      await makeHasuraAdminRequest(`
      mutation MyMutation($codelink: String!, $comments: String!, $outputlink: String!, $status: String!, $submittedBy: uuid!, $taskId: Int!) {
        insert_asyncnewui_task_submission_one(object: {codelink: $codelink, comments: $comments, outputlink: $outputlink, status: $status, submittedBy: $submittedBy, taskId: $taskId}) {
          id
          taskId
          status
          submittedBy
        }
      }      
      `, {
        variables: {
          codelink: form.codelink,
          comments: form.comments,
          outputlink: form.outputLink,
          status: form.status,
          submittedBy: user.id,
          taskId: parseInt(task.id || ""),
        }
      })
        .then(async (resp: any) => {
          console.log(resp?.data);
          const { id } = resp?.data?.insert_asyncnewui_task_submission_one;
          if (form.images.length !== 0) {
            for (let index = 0; index < form.images.length; index++) {
              const element = form.images[index];
              await makeHasuraAdminRequest(`
              mutation uploadImages($url: String!, $taskId: Int!, $submissionId: Int!) {
                insert_asyncnewui_images(objects: {url: $url, taskId: $taskId, submissionId: $submissionId}) {
                  returning {
                    id
                    taskId
                    submissionId
                    url
                  }
                }
              }            
        `, {
                variables: {
                  url: element,
                  taskId: parseInt(task.id || ""),
                  submissionId: id
                }
              })
                .then((response: any) => {
                  console.log(`image upload ${index}`, response);

                });
            }
            setShowSubmissions(!showSubmissions);
            notification.success({ message: "Task Submitted!" });
            handleStaking();
          }
        })
        .catch((err: any) => {
          setIsError({
            isError: true,
            message: "Task submission error!",
          });
        })
    } catch (error) {
      setLoading(false);
      setIsError({
        isError: true,
        message: "submit error!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {task?.link && (<a
        href={`https://gitpod.io/#${task?.link}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          onClick={(e: any) => { }}
          className="hover:cursor-pointer text-black flex flex-row-reverse px-[14px] py-[10px] gap-5 bg-[#A9FF1C] items-center hover:bg-opacity-80 "
        >
          Start Working
        </button>
      </a>)}
      <label
        onClick={(e: any) => {
          e.preventDefault();
          setShowSubmissions(true);
          setForm({
            codelink: "",
            comments: "",
            images: [],
            submittedBy: "",
            outputLink: "",
            status: "submitted",
          });
        }}
        className="hover:cursor-pointer text-black flex flex-row-reverse px-[14px] py-[10px] gap-5 bg-[#A9FF1C] items-center hover:bg-opacity-80 "
      >
        Submit Task
      </label>

      <input
        checked={showSubmissions}
        type="checkbox"
        readOnly={true}
        id="task-submission"
        className="modal-toggle"
      />
      <div className="modal bg-black bg-opacity-70 text-white">
        <div className="modal-box relative bg-[#0C0C0E] md:max-w-[847px] rounded-none">
          <label
            onClick={(e: any) => {
              e.preventDefault();
              setShowSubmissions(false);
              handleStaking();
            }}
            className="absolute right-5 top-5"
          >
            ✕
          </label>
          <div className="flex flex-col items-center justify-center">
            <div className="text-[16px] font-[600]">Submit Task</div>
            <div className="flex gap-2 mt-6 flex-col md:flex-row">
              <div className="min-w-[270px] md:w-[311px] w-[95%]">
                <Input
                  className="flex flex-col bg-transparent px-4 py-[10px] text-[14px] text-[#858585] border-[1px] border-[#3D3D3D] w-[100%]"
                  labelClass="text-[14px] font-[400]"
                  title="Code link *"
                  placeholder="Enter repository link"
                  onChange={(e: any) => {
                    setForm((prev) => {
                      prev.codelink = e.target.value;
                      return prev;
                    });
                  }}
                />
                <Input
                  className="flex flex-col bg-transparent px-4 py-[10px] text-[14px] text-[#858585] border-[1px] border-[#3D3D3D] w-[100%] mt-4"
                  labelClass="text-[14px] font-[400]"
                  title="Output Link"
                  placeholder="Enter output link"
                  onChange={(e: any) => {
                    setForm((prev) => {
                      prev.outputLink = e.target.value;
                      return prev;
                    });
                  }}
                />
              </div>
              <div>
                <div className="text-[14px] font-[400]">Comments</div>
                <textarea
                  className="min-w-[270px] md:w-[311px] h-[124px] bg-transparent text-[14px] font-[400] text-[#858585] leading-4  resize-none border-[1px] border-[#3D3D3D] placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#858585] px-4 py-1 mt-1 "
                  placeholder="Special comments if any"
                  onChange={(e: any) => {
                    setForm((prev) => {
                      prev.comments = e.target.value;
                      return prev;
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex gap-2 flex-col md:flex-row">
              <div>
                <div className="text-[14px] font-[400] mt-4 mb-3">
                  Upload your files
                </div>
                <input
                  type="file"
                  id="attachment"
                  name="images"
                  onChange={dropHandler}
                  accept="image/png, image/gif, image/jpeg"
                  className="hidden absolute top-0 left-0 right-0 bottom-0 text-transparent opacity-0"
                />
                <label htmlFor="attachment" className="cursor-pointer">
                  <div
                    id="drop_zone"
                    onDragOver={(e) => dragOverHandler(e)}
                    onChange={dropHandler}
                    className="border-[1px] border-dashed border-[#858585] flex flex-col justify-center items-center py-6 px-6  md:py-[44.5px] md:px-[62.5px]  "
                  >
                    <div>
                      <Image
                        className="md:h-[33.33px] md:w-[33.33px] h-6 w-6"
                        src="/icons/addfile.svg"
                        height={33.33}
                        width={33.33}
                        alt="addfile"
                      />
                    </div>
                    <div className="md:text-[16px] text-[12px] font-[600] mx-auto">
                      Drag and Drop or
                      <span className="text-[#a9ff1c]"> Browse</span>
                    </div>
                    <div className="md:text-[14px] text-[12px] text-[#858585]">
                      Supports JPEG, PNG, JPG
                    </div>
                  </div>
                </label>
              </div>
              <div>
                <div className="mt-4 text-[12px] font-[600]">
                  Uploaded files
                </div>
                <ul className="justify-center min-h-[175px] mt-3 overflow-x-hidden overflow-y-scroll items-center min-w-[270px] md:min-w-[311px] h-[102px] text-[12px] font-[400] text-[#858585]">
                  {files.map((item: any, i: number) => {
                    return (
                      <li
                        className="text-white w-full bg-[#242426] my-2 mr-4 px-4 py-1 flex"
                        key={i}
                      >
                        <div>
                          <div className="text-[14px] text-[#CECECE] font-[400]">
                            {item.name.length > 50
                              ? `${item.name.slice(0, 15)}...${item.name.slice(
                                -5
                              )}`
                              : item.name}
                          </div>
                          <div className="text-[12px] text-[#CECECE] font-[400]">
                            {formatBytes(item.size)}
                          </div>
                        </div>
                        <div
                          onClick={(e: any) => {
                            e.preventDefault();
                            const arr = files;
                            console.log("files", { arr });

                            arr.splice(i, 1);
                            console.log("files", { arr });
                            setLoading(true);
                            setFiles((prev: any) => {
                              prev.splice(i, 1);
                              return prev;
                            });
                            setLoading(false);
                          }}
                          className="bg-white h-5 my-auto  ml-auto w-5 rounded-full text-black flex text-center justify-center items-center"
                        >
                          X
                        </div>
                      </li>
                    );
                  })}
                  {/* {files && "- No files uploaded -"} */}
                </ul>
              </div>
            </div>
            {isError.isError && <InfoWarning error={isError.message} />}

            {loading ? (
              <div
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="cursor-pointer bg-[#a9ff1c] text-black px-[16px] py-[10px] text-[14px] font-[600]  mt-2 float-right"
              >
                <Spin indicator={antIcon} className="mr-3" />
                Submitting
              </div>
            ) : (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="cursor-pointer bg-[#a9ff1c] text-black px-[26px] py-[10px] text-[14px] font-[600]  mt-2 float-right"
              >
                Submit
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskSubmission;
