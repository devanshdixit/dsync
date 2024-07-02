import axios from "axios";
import { notification, Spin } from "antd";
import { ContractInterface, ethers } from "ethers";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BiDetail, BiEdit } from "react-icons/bi";
import { useContractWrite } from "wagmi";
import GoBack from "../../components/Goback";
import Header from "../../components/Header";
import ProjectDescription from "../../components/ProjectDescription";
import TaskActivity from "../../components/TaskActivity";
import TaskActivitySection from "../../components/TaskActivitySection";
import DeleteTask from "../../components/TaskComp/DeleteTask";
import EditDescription from "../../components/TaskComp/ManagerView/EditDescription";
import EditLink from "../../components/TaskComp/ManagerView/EditLink";
import StartSubmitClaim from "../../components/TaskComp/ManagerView/StartSubmitClaim";
import { appConfig } from "../../config/appConfig";
import contractConfig from "../../config/smartContracts/contractConfigs";
import { UserContext } from "../../context/user.context";
import { IsError, Project, TaskCardProps, TaskStatus } from "../../utils/types";
import TaskPageSideBarSection from "../../components/TaskPageSideBarSection";
import { pageBottomToTop } from "../../components/Animations/PageSwitch";
import { motion } from "framer-motion";

import { LoadingOutlined } from "@ant-design/icons";
import Error from "../../components/Error";
import Button from "../../components/Forms/Button";
import classNames from "classnames";
import TaskSubmission from "../../components/TaskSubmission";
import AnimateWrapper from "../../components/Animations/Wrappers/AnimateWrapper";
import { makeHasuraAdminRequest } from "../../config/fetch-requests";
import {
  deleteTask,
  getProjectById,
  getProjectTaskById,
} from "../../utils/queries";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";
import getTokenImage from "../../utils/getTokenImages";
const Task = (props: any) => {
  const [taskDetails, setTaskDetails] = useState<TaskCardProps>({
    id: "",
    createdBy: "",
    eta: "",
    title: "",
    tag: "",
    amount: "",
    description: "",
    attachment: [],
    projectId: "",
    status: "Draft",
    startedBy: [],
    link: "",
  });
  const [projectDetails, setProjectDetails] = useState<Project>({
    name: "",
    logo: "",
    id: "",
    createdBy: "",
    created_at: "",
  });
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: "black" }} spin />
  );
  const [images, setImages] = useState<any[]>([]);
  const [fetch, setFetch] = useState<boolean>(true);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const { user, updateTask } = useContext(UserContext);
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { id, project } = router.query;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isManager, setIsManager] = useState<boolean>(false);
  const [showEditDesc, setShowEditDesc] = useState<boolean>(false);
  const [showEditLink, setShowEditLink] = useState<boolean>(false);
  const [showStartSubmit, setShowStartSubmit] = useState<boolean>(false);
  const [title, setTitle] = useState<TaskStatus>("Staked");
  const [isTaskStarted, setIsTaskStarted] = useState(false);
  const [isTaskStaked, setIsTaskStaked] = useState(true);
  const [showClaim, setShowClaim] = useState(false);
  const [claimLoading, setClaimLoading] = useState<boolean>(false);
  const [starttaskLoading, setStarttaskLoading] = useState<boolean>(false);
  const [link, setLink] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [isError, setIsError] = useState<IsError>({
    isError: false,
    message: "",
  });
  const [isErrorDesc, setIsErrorDesc] = useState<IsError>({
    isError: false,
    message: "",
  });
  const { writeAsync: claimBounty } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: contractConfig.testnet.address,
    contractInterface: contractConfig.testnet.ABI as ContractInterface,
    functionName: "claimBounty",
  });

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      setIsError({
        isError: true,
        message: `Unable to fetch data! please login↗`,
      });
      return;
    }
    if (user) {
      setIsLoading(false);
      setIsError({ isError: false });
      const { project, task } = props;
      console.log("task page props", props);
      if (!project || !task) {
        setIsError({
          isError: true,
          message: "No data, try again!",
        });
        return;
      }
      const projectResp: Project = {
        name: project?.name || "",
        logo: project?.logo || "",
        createdBy: project?.created_by || "",
        id: project?.id.toString() || "",
        created_at: project?.created_at || "",
      };
      const taskResp: TaskCardProps = {
        id: task?.id?.toString() || "",
        createdBy: task?.created_by || "",
        eta: task?.eta || "",
        title: task?.title || "",
        projectId: task?.projectId || "",
        status: task?.status || "All",
        description: task?.description || "",
        amount: task?.amount || "0",
        assignedTo: task?.assignedTo || "",
        tag: task?.tag || "",
        link: task?.link || "",
        taskDoneTime: task?.taskDoneTime || "",
        taskhash: task?.taskhash || "",
        transactionHash: task?.transactionHash || "",
        claimedHash: task?.claimedHash || "",
        attachment: task?.attachment || [],
        startedBy: task?.startedBy || [],
        activity: task?.activity || [],
        submissions: task?.submissions || [],
      };
      setDescription(task?.description || "");
      setLink(task?.link || "");
      setShowEditDesc(task?.description ? false : true);
      setShowEditLink(task?.link ? false : true);
      if (task?.taskhash === "") {
        setIsTaskStaked(false);
      }
      if (taskResp?.status === "Live") {
        setShowStartSubmit(true);
      }
      if (taskResp?.startedBy?.length) {
        for (let index = 0; index < taskResp.startedBy.length; index++) {
          const element = taskResp.startedBy[index];
          if (element.userId === user?.id.toString()) {
            setIsTaskStarted(true);
          }
        }
      }
      if (taskResp?.submissions?.length && taskResp?.status === "Done") {
        for (let index = 0; index < taskResp?.submissions.length; index++) {
          const element = taskResp?.submissions[index];
          if (
            element.status === "accepted" &&
            element.submittedBy === user?.id.toString()
          ) {
            if (taskResp?.claimedHash === "") {
              setShowClaim(true);
            } else {
              setShowClaim(false);
            }
          }
        }
      }
      setProjectDetails(projectResp);
      setTaskDetails(taskResp);
      if (user?.id.toString() === projectResp?.createdBy) {
        setIsManager(true);
      }
    }
  }, [user]);

  const getUpdatedTask = async () => {
    const projecttaskdata = await makeHasuraAdminRequest(getProjectTaskById, {
      variables: {
        taskId: parseInt(taskDetails?.id || "0"),
        projectIdString: taskDetails?.projectId,
        projectId: parseInt(taskDetails.projectId),
      },
    });
    const {
      asyncnewui_task,
      asyncnewui_project,
      asyncnewui_task_startedby,
      asyncnewui_task_submission,
      asyncnewui_task_images,
    } = projecttaskdata?.data;
    const project = asyncnewui_project[0];
    const task = asyncnewui_task[0];
    if (!project || !task) {
      setIsError({
        isError: true,
        message: "No data, try again!",
      });
      return;
    }
    task.startedBy = asyncnewui_task_startedby;
    task.submissions = asyncnewui_task_submission;
    task.attachment = asyncnewui_task_images;
    const projectResp: Project = {
      name: project?.name || "",
      logo: project?.logo || "",
      createdBy: project?.created_by || "",
    };
    const taskResp: TaskCardProps = {
      id: task?.id?.toString() || "",
      createdBy: task?.created_by || "",
      eta: task?.eta || "",
      title: task?.title || "",
      projectId: task?.projectId || "",
      status: task?.status || "All",
      description: task?.description || "",
      amount: task?.amount || "0",
      assignedTo: task?.assignedTo || "",
      tag: task?.tag || "",
      link: task?.link || "",
      taskDoneTime: task?.taskDoneTime || "",
      taskhash: task?.taskhash || "",
      transactionHash: task?.transactionHash || "",
      claimedHash: task?.claimedHash || "",
      attachment: task?.attachment || [],
      startedBy: task?.startedBy || [],
      activity: task?.activity || [],
      submissions: task?.submissions || [],
    };
    setDescription(task?.description || "");
    setLink(task?.link || "");
    setShowEditDesc(task?.description ? false : true);
    setShowEditLink(task?.link ? false : true);
    if (task?.taskhash === "") {
      setIsTaskStaked(false);
    }
    if (taskResp?.status === "Live") {
      setShowStartSubmit(true);
    }
    if (taskResp?.startedBy?.length) {
      for (let index = 0; index < taskResp.startedBy.length; index++) {
        const element = taskResp.startedBy[index];
        if (element.userId === user?.id.toString()) {
          setIsTaskStarted(true);
        }
      }
    }
    if (taskResp?.submissions?.length && taskResp?.status === "Done") {
      for (let index = 0; index < taskResp?.submissions.length; index++) {
        const element = taskResp?.submissions[index];
        if (
          element.status === "accepted" &&
          element.submittedBy === user?.id.toString()
        ) {

          if (taskResp?.claimedHash === "") {
            setShowClaim(true);
          } else {
            setShowClaim(false);
          }
        }
      }
    }
    setProjectDetails(projectResp);
    setTaskDetails(taskResp);
    console.log("updated project", projectResp);
    console.log("task project", taskResp);
    if (user?.id.toString() === projectResp?.createdBy) {
      setIsManager(true);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsErrorDesc({
      isError: false,
    });

    setErrorMsg("");
    const updateVal: any = {};
    if (description !== taskDetails?.description) {
      updateVal.description = description;
      setSaveLoading(false);
    }

    if (images.length > 0) {
      console.log("not same links values can update", { link });
      updateVal.attachments = images;
      setSaveLoading(false);
    }

    if (link !== taskDetails?.link) {
      console.log("not same links values can update", { link });
      setErrorMsg("");
      if (link.match(gitHublinkValidator)) {
        setErrorMsg("");
        updateVal.link = link;
        setSaveLoading(false);
      } else {
        setErrorMsg("Enter valid Github link");
        setShowEditLink(true);
      }
    }

    if (Object.keys(updateVal).length === 0) {
      console.log("empty links values cannot update");
      notification.warning({ message: "No new values" });
      setSaveLoading(false);
      return;
    }

    // checking if values are already there and keeping textarea open
    if (taskDetails.description) {
      setShowEditDesc(true);
    }
    if (taskDetails.link) {
      setShowEditLink(true);
    }

    setImages([]);
    try {
      setSaveLoading(true);
      console.log("Submit Task:", updateVal);
      // const res = await updateTask(
      //   taskDetails.title,
      //   taskDetails?.projectId,
      //   updateVal
      // );
      if (images.length !== 0) {
        const imgUrls: string[] = [];
        for (let index = 0; index < images.length; index++) {
          const element = images[index];
          const metadata: any = {
            contentType: element.type,
          };
          // Upload file and metadata to the object 'images/mountains.jpg'
          const storageRef = ref(
            storage,
            `project/${taskDetails.projectId}/${taskDetails.id}/` + element.name
          );
          const uploadTask = uploadBytesResumable(
            storageRef,
            element,
            metadata
          );
          // Listen for state changes, errors, and completion of the upload.
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
                    setIsLoading(false);
                    return;
                  case "storage/canceled":
                    // User canceled the upload
                    console.log("storage/canceled");
                    setIsError({
                      isError: true,
                      message: "Image upload failed - storage/canceled",
                    });
                    setIsLoading(false);
                    return;
                  case "storage/unknown":
                    // User canceled the upload
                    console.log("storage/unknown");
                    setIsError({
                      isError: true,
                      message: "Image upload failed - storage/unknown",
                    });
                    setIsLoading(false);
                    return;
                }
              },
              async () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(
                  async (downloadURL) => {
                    console.log("File available at", downloadURL);
                    setSaveLoading(false);
                    imgUrls.push(downloadURL);
                    await makeHasuraAdminRequest(
                      `
                    mutation MyMutation($url: String!, $taskId: Int!) {
                      insert_asyncnewui_task_images(objects: {url: $url, taskId: $taskId}) {
                        returning {
                          id
                          url
                        }
                      }
                    }                     
                    `,
                      {
                        variables: {
                          taskId: parseInt(taskDetails.id || ""),
                          url: downloadURL,
                        },
                      }
                    ).then((resp) => {
                      console.log(resp);
                      setSaveLoading(false);
                      resolve();
                    });
                  }
                );
              }
            );
          });
        }
      }
      const res = await makeHasuraAdminRequest(
        `
      mutation MyMutation($id: Int!, $description: String!, $link: String!) {
        update_asyncnewui_task_by_pk(pk_columns: {id: $id}, _set: { description: $description, link: $link}) {
          id
          title
        }
      }
      `,
        {
          variables: {
            id: parseInt(taskDetails?.id || ""),
            description: updateVal?.description || taskDetails.description,
            link: updateVal?.link || taskDetails.link,
          },
        }
      );
      console.log("update res: ", res);
      if (res.errors) {
        setIsErrorDesc({
          isError: true,
          message: res.error.message,
        });
        return;
      } else {
        // setShowEditDesc(false);
        await getUpdatedTask();
      }
    } catch (error) {
      setSaveLoading(false);
      setIsErrorDesc({
        isError: true,
        message: "Something went wrong!",
      });
    }
    setSaveLoading(false);
  };

  const handelClaim = async (e: any) => {
    e.preventDefault();
    setIsError({ isError: false });
    setClaimLoading(true);

    if (!user) {
      setIsErrorDesc({
        isError: true,
        message: "No user ID",
      });
      return;
    }

    const taskhash: string = taskDetails?.taskhash || "";
    if (taskhash === "") {
      setIsErrorDesc({
        isError: true,
        message: "taskHash not present",
      });
      setIsLoading(false);
      return;
    }
    try {
      const savetask: {
        claimedHash: string;
      } = {
        claimedHash: taskhash,
      };
      const taskWriteResponse = await claimBounty({
        recklesslySetUnpreparedOverrides: {
          gasPrice: ethers.utils.parseUnits("100", "gwei"),
          gasLimit: 1000000,
        },
        recklesslySetUnpreparedArgs: [taskhash],
      });
      await taskWriteResponse.wait().then(async (value: any) => {
        if (value["transactionHash"].length > 0) {
          savetask.claimedHash = value["transactionHash"];
          // const res = await updateTask(
          //   taskDetails.title,
          //   taskDetails?.projectId,
          //   savetask
          // );
          const res = await makeHasuraAdminRequest(
            `
          mutation MyMutation($id: Int!, $claimedHash: String!) {
            update_asyncnewui_task_by_pk(pk_columns: {id: $id}, _set: { claimedHash: $claimedHash }) {
              id
              title
            }
          }
          `,
            {
              variables: {
                id: parseInt(taskDetails?.id || ""),
                claimedHash: savetask.claimedHash
              },
            }
          );
          console.log(res);
          setClaimLoading(false);
          if (res.errors) {
            setIsErrorDesc({
              isError: true,
              message: res.error.message,
            });
            return;
          } else {
            notification.success({ message: "Claimed" });
            console.log("claimed done");
            await getUpdatedTask();
          }
        }
      });
      const txHash = taskWriteResponse.hash;
    } catch (error: any) {
      if (error.message.includes("user rejected transaction")) {
        setIsErrorDesc({
          isError: true,
          message: "The transaction is rejected!",
        });
        setClaimLoading(false);
        return;
      }
      if (error.message.includes("insufficient funds")) {
        setIsErrorDesc({
          isError: true,
          message: "Insufficient funds in your wallet!",
        });
        setClaimLoading(false);
        return;
      }
      setIsErrorDesc({
        isError: true,
        message: "Something went wrong!",
      });
      setClaimLoading(false);
    } finally {
      setClaimLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!taskDetails?.projectId || !taskDetails?.title) {
      setIsErrorDesc({
        isError: true,
        message: "No data, cannot delete!",
      });
    }
    try {
      const res = await makeHasuraAdminRequest(deleteTask, {
        variables: {
          id: taskDetails?.id,
        },
      });
      console.log(res.errors);

      // const res = await deleteTask(taskDetails?.title, taskDetails?.projectId);
      if (res.errors) {
        setIsErrorDesc({
          isError: true,
          message: "error in deleting task",
        });
        return;
      }
      notification.success({ message: "Task deleted!" });
      router.replace({
        pathname: `/project/${taskDetails?.projectId}`,
      });
    } catch (error) {
      setIsErrorDesc({
        isError: true,
        message: "DELETE ERROR!",
      });
      return;
    }
  };
  const handleStartTask = async () => {
    setIsErrorDesc({
      isError: false,
    });
    if (!user) {
      setIsError({
        isError: true,
        message: "No user ID",
      });
      return;
    }
    if (starttaskLoading) {
      return;
    }
    setStarttaskLoading(true);
    console.log(taskDetails);
    const task = {
      status: "Live",
      startedBy: taskDetails?.startedBy || [],
    };
    task.status = "Live";
    if (!user?.id.toString()) {
      setIsLoading(false);
      setStarttaskLoading(false);
      setIsError({
        isError: true,
        message: "No user ID",
      });
    }
    task.startedBy = [...task.startedBy, user?.id.toString()];
    if (task.status === "Draft") {
      setIsLoading(false);
      setStarttaskLoading(false);
      setIsErrorDesc({
        isError: true,
        message: "Task is not staked!",
      });
      return;
    }
    console.log(user);
    console.log(parseInt(taskDetails.id || "") + " and ", user?.id);
    try {
      await makeHasuraAdminRequest(
        `
      mutation starttask($taskId: Int!, $status: String!, $userId: uuid!) {
        update_asyncnewui_task_by_pk(pk_columns: {id: $taskId}, _set: {status: $status}) {
          id
          status
        }
        insert_asyncnewui_task_startedby(objects: {taskId: $taskId, userId: $userId}) {
          returning {
            created_at
            id
            taskId
            updated_at
            userId
          }
        }
      }      
      `,
        {
          variables: {
            taskId: parseInt(taskDetails.id || ""),
            status: task.status,
            userId: user?.id,
          },
        }
      )
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          setIsErrorDesc({
            isError: true,
            message: "error in starting task reload the page",
          });
        });
    } catch (error) {
      setIsErrorDesc({
        isError: true,
        message: "Error in start task! try again",
      });
      setIsLoading(false);
      setStarttaskLoading(false);
      return;
    }
    setIsLoading(false);
    setStarttaskLoading(false);
    await getUpdatedTask();
  };

  const handleStaking: any = async () => {
    await getUpdatedTask();
  };
  const gitHublinkValidator =
    /((http|git|ssh|http(s)|file|\/?)|(git@[\w\.]+))(:(\/\/)?)([\w\.@\:/\-~]+)?/;
  return (
    <div>
      <Head>
        <title>{appConfig.appName}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Header />
      {isLoading ? (
        <>
          <Error error={isError.message} type="status" />
        </>
      ) : (
        <>
          {isError.isError ? (
            <>
              <Error error={isError.message} type="error" />
            </>
          ) : (
            <>
              <AnimateWrapper>
                <div className="flex gap-8  justify-center">
                  <div className=" mx-4  mt-[30px]">
                    <GoBack label="back to all tasks" />
                    <ProjectDescription
                      project={projectDetails}
                      task={taskDetails}
                    />
                    <div className="block md:hidden">
                      <TaskActivity
                        task={taskDetails}
                        images={images}
                        setImages={setImages}
                        isManager={isManager}
                        handleStaking={handleStaking}
                      />
                    </div>
                    <div className="flex  bg-[#0C0C0E] justify-between  p-4 mb-7 w-[100%] md:w-[100%] md:min-w-[869px] border-[1px] border-opacity-50 border-[#858585]">
                      <div className="mr-4">
                        <div className="text-white font-satoshi text-[18px] md:text-[24px] font-[700] mb-3">
                          {taskDetails.title}
                        </div>
                        <div className=" mb-4 bg-[#A9FF1C] bg-opacity-20 px-1 text-[16px] font-[400] text-white max-w-fit">
                          {taskDetails.tag}
                        </div>
                        <div className="flex items-center gap-1 mb-4 text-[16px] font-[400] text-white">
                          <BiDetail />
                          Description
                          {isManager && (
                            <BiEdit
                              onClick={(e: any) => {
                                e.preventDefault();
                                setShowEditDesc(!showEditDesc);
                              }}
                              className="ml-4"
                            />
                          )}
                        </div>
                        {description && !showEditDesc && (
                          <div className="text-[14px] max-w-[380px] font-[400] text-white leading-4 mb-4 break-all">
                            {description}
                          </div>
                        )}
                        {isManager && (
                          <>
                            <EditDescription
                              showEditDesc={showEditDesc}
                              setDescription={setDescription}
                              description={description}
                            />
                          </>
                        )}
                        <div className="flex items-center gap-1 mb-4 text-[16px] font-[400] text-white">
                          <BiDetail />
                          Link
                          {isManager && (
                            <BiEdit
                              onClick={(e: any) => {
                                e.preventDefault();
                                setShowEditLink(!showEditLink);
                              }}
                              className="ml-4"
                            />
                          )}
                        </div>

                        {link && !showEditLink && (
                          <div className="text-[14px] font-[400] text-[#3b65fe] leading-4 mb-[40px] break-all">
                            {link}
                          </div>
                        )}
                        {isManager && (
                          <>
                            <EditLink
                              showEditLink={showEditLink}
                              setErrorMsg={setErrorMsg}
                              link={link}
                              setLink={setLink}
                              errorMsg={errorMsg}
                            />
                          </>
                        )}

                        <div className="justify-between items-center">
                          {taskDetails?.amount && (
                            <div className="flex items-center gap-[32px] my-4 bg-[#A9FF1C] bg-opacity-[0.15] px-2 py-1 text-[16px] font-[400] text-white max-w-fit">
                              <div className="flex gap-1 items-center px-1 py-1">
                                <div>{getTokenImage(taskDetails?.amount)}</div>
                                <div>{taskDetails?.amount}</div>
                              </div>
                            </div>
                          )}
                          {isErrorDesc.isError && (
                            <p className="text-md my-2 text-red-400 ">
                              {isErrorDesc.message}
                            </p>
                          )}
                          {!isManager && (
                            <>
                              <StartSubmitClaim
                                isTaskStarted={isTaskStarted}
                                handleStartTask={handleStartTask}
                                taskDetails={taskDetails}
                                showSubmissions={showSubmissions}
                                setShowSubmissions={setShowSubmissions}
                                showClaim={showClaim}
                                claimLoading={claimLoading}
                                handelClaim={handelClaim}
                                starttaskLoading={starttaskLoading}
                                handleStaking={handleStaking}
                              />
                            </>
                          )}
                        </div>

                        {isManager && (
                          <>
                            <DeleteTask
                              handleSubmit={handleSubmit}
                              handleDelete={handleDelete}
                              isLoading={saveLoading}
                            />
                          </>
                        )}
                      </div>
                      <div className="hidden md:block">
                        <TaskActivity
                          task={taskDetails}
                          images={images}
                          setImages={setImages}
                          isManager={isManager}
                          handleStaking={handleStaking}
                        />
                      </div>
                    </div>
                    {/* task activity starts*/}
                    <TaskActivitySection
                      task={taskDetails}
                      isManager={isManager}
                    />
                    {/* task activity ended*/}
                  </div>
                  <TaskPageSideBarSection
                    projectDetails={projectDetails}
                    taskDetails={taskDetails}
                  />
                </div>
              </AnimateWrapper>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Task;

export async function getServerSideProps(context: any) {
  const { id, project } = context.query;
  console.log({ id, project });
  try {
    const projectdata = await makeHasuraAdminRequest(getProjectTaskById, {
      variables: {
        taskId: id,
        projectIdString: project.toString(),
        projectId: parseInt(project),
      },
    });
    const {
      asyncnewui_task,
      asyncnewui_task_images,
      asyncnewui_project,
      asyncnewui_task_startedby,
      asyncnewui_task_submission,
    } = projectdata?.data;
    console.log("Project task data:", {
      asyncnewui_task,
      asyncnewui_project,
      asyncnewui_task_images,
      asyncnewui_task_startedby,
      asyncnewui_task_submission,
    });
    const data = {
      project: asyncnewui_project[0],
      task: asyncnewui_task[0],
    };
    data.task.startedBy = asyncnewui_task_startedby;
    data.task.submissions = asyncnewui_task_submission;
    data.task.attachment = asyncnewui_task_images;
    if (!data.project || !data.task) {
      return {
        props: {},
      };
    }
    return {
      props: JSON.parse(JSON.stringify(data)),
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}
