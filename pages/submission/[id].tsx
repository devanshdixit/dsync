import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import GoBack from "../../components/Goback";
import { UserContext } from "../../context/user.context";
import { useRouter } from "next/router";
import { IsError, Project, TaskCardProps } from "../../utils/types";
import { appConfig } from "../../config/appConfig";
import Head from "next/head";
import clientPromise from "../../config/mongodb";
import axios from "axios";
import { pageBottomToTop } from "../../components/Animations/PageSwitch";
import { motion } from "framer-motion";
import Error from "../../components/Error";
import SubmissionProjectName from "../../components/SubmmissionProjectName";
import SubmissionTaskDetails from "../../components/SubmissionTaskDetails";
import SubmissionDetails from "../../components/SubmissionDetails";
import AnimateWrapper from "../../components/Animations/Wrappers/AnimateWrapper";
import { makeHasuraAdminRequest } from "../../config/fetch-requests";
import { getProjectTaskById, getSubmissionById } from "../../utils/queries";

const TaskSubmission = (props: any) => {
  const router = useRouter();
  const { id, task, project } = router.query;
  const { user, updateTask } = useContext(UserContext);
  const [submission, setSubmission] = useState<any>({});
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
    createdBy: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [buttonLoadingReject, setButtonLoadingReject] =
    useState<boolean>(false);
  const [isManager, setIsManager] = useState<boolean>(true);
  const [isError, setIsError] = useState<IsError>({
    isError: false,
    message: "",
  });
  const [isErrorSub, setIsErrorSub] = useState<IsError>({
    isError: false,
    message: "",
  });
  // const { loading, error, data, refetch } = useQuery(getTaskByName, {
  //   variables: {
  //     projectName: project,
  //     taskName: task,
  //   },
  //   skip: !user,
  // });

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      setIsError({
        isError: true,
        message: "Error in Fetching Tasks",
      });
    }
    if (user) {
      setIsLoading(false);
      setIsError({ isError: false });
      console.log("Final Data:", props);
      const { project, submission, task } = props;
      if (!project || !task || !submission) {
        setIsError({
          isError: true,
          message: "No data, try again!",
        });
      }
      const projectResp: Project = {
        name: project?.name || "",
        logo: project?.logo || "",
        createdBy: project?.created_by || "",
        id: project?.id.toString() || "",
      };
      const taskResp: TaskCardProps = {
        id: task?.id.toString() || "",
        createdBy: task?.created_by || "",
        eta: task?.eta || "",
        title: task?.title || "",
        projectId: task?.projectId || "",
        status: task?.status || "All",
        description: task?.description || "",
        amount: task?.amount || "0",
        startedBy: task?.started_by || [],
        activity: task?.activity || [],
        submissions: task?.submissions || [],
        assignedTo: task?.assignedTo || "",
        attachment: task?.attachment || "",
        tag: task?.tag || "",
      };
      console.log("Project:", projectResp);
      console.log("Task:", taskResp);
      setProjectDetails(projectResp);
      setTaskDetails(taskResp);
      setSubmission(submission);
      if (user.id.toString() === projectResp.createdBy) {
        setIsManager(true);
      } else {
        setIsManager(false);
      }
    }
  }, [user]);
  const handleAccept = async (e: SyntheticEvent) => {
    setButtonLoading(true);
    setIsError({ isError: false });
    let currentSub: any = {
      codelink: submission?.codelink,
      comments: submission?.comments,
      images: submission?.images,
      outputLink: submission?.outputLink,
      status: "accepted",
      submittedBy: submission?.submittedBy,
    };
    await makeHasuraAdminRequest(
      `
    mutation updateSubmission($submissionStatus: String!, $taskId: Int!, $taskStatus: String!, $submissionId: Int!) {
      update_asyncnewui_task_submission(where: {id: {_eq: $submissionId } }, _set: {status: $submissionStatus}) {
        returning {
          id
        }
      }
      update_asyncnewui_task_by_pk(pk_columns: {id: $taskId}, _set: {status: $taskStatus}) {
        id
      }
    }
    `,
      {
        variables: {
          submissionStatus: "accepted",
          taskId: parseInt(taskDetails.id || ""),
          taskStatus: "Done",
          submissionId: submission.id,
        },
      }
    )
      .then(async (resp: any) => {
        console.log("submission", taskDetails.submissions);

        for (let index = 0; index < taskDetails.submissions.length; index++) {
          const element = taskDetails.submissions[index];
          console.log(element, "adfdf");
          if (element.id.toString() !== submission.id.toString()) {
            await makeHasuraAdminRequest(
              `
          mutation updateSubmission($submissionStatus: String!, $submissionId: Int!) {
            update_asyncnewui_task_submission(where: {id: {_eq: $submissionId } }, _set: {status: $submissionStatus}) {
              returning {
                id
              }
            }
          }
          `,
              {
                variables: {
                  submissionStatus: "rejected",
                  submissionId: element.id,
                },
              }
            ).then(async (resp: any) => {
              console.log(`${element.id} rejected`);
            });
          }
        }
        setButtonLoading(false);
        await getUpdatedSubmission();
      })
      .catch((err: any) => {
        setIsError({
          isError: true,
          message: "Error in Updating Task",
        });
        setButtonLoading(false);
        return;
      });
  };
  const handleReject = async (e: SyntheticEvent) => {
    setButtonLoadingReject(true);
    setIsError({ isError: false });
    console.log("reject started");
    let currentSub: any = {
      codelink: submission?.codelink,
      comments: submission?.comments,
      images: submission?.images,
      outputLink: submission?.outputLink,
      status: "rejected",
      submittedBy: submission?.submittedBy,
    };
    console.log("submission", currentSub);
    await makeHasuraAdminRequest(
      `
    mutation updateSubmission($submissionStatus: String!, $submissionId: Int!) {
      update_asyncnewui_task_submission(where: {id: {_eq: $submissionId } }, _set: {status: $submissionStatus}) {
        returning {
          id
        }
      }
    }
    `,
      {
        variables: {
          submissionStatus: "rejected",
          submissionId: submission.id,
        },
      }
    )
      .then(async (resp: any) => {
        setButtonLoadingReject(false);
        await getUpdatedSubmission();
      })
      .catch(async (err: any) => {
        setIsError({
          isError: true,
          message: "Error in Updating Task",
        });
        setButtonLoadingReject(false);
        await getUpdatedSubmission();
        return;
      });
  };
  const getUpdatedSubmission = async () => {
    const projecttaskdata = await makeHasuraAdminRequest(getSubmissionById, {
      variables: {
        taskId: parseInt(taskDetails.id || ""),
        projectIdString: projectDetails.id?.toString(),
        projectId: parseInt(projectDetails.id || ""),
        submissionId: submission.id,
      },
    });
    const {
      asyncnewui_task,
      asyncnewui_project,
      asyncnewui_task_startedby,
      asyncnewui_images,
      asyncnewui_task_submission,
    } = projecttaskdata?.data;
    const project: any = asyncnewui_project[0];
    const task: any = asyncnewui_task[0];
    for (let index = 0; index < asyncnewui_task_submission.length; index++) {
      const element = asyncnewui_task_submission[index];
      if (element.id.toString() === submission.id.toString()) {
        element.images = asyncnewui_images;
        setSubmission(element);
      }
    }
    const projectResp: Project = {
      name: project?.name || "",
      logo: project?.logo || "",
      createdBy: project?.created_by || "",
      category: project?.category || "",
      id: project?.id.toString() || "",
    };
    console.log("Project:", projectResp);
    setProjectDetails(projectResp);
    if (user.id.toString() === projectResp.createdBy) {
      setIsManager(true);
    } else {
      setIsManager(false);
    }
    const taskResp: TaskCardProps = {
      id: task?.id.toString() || "",
      createdBy: task?.created_by || "",
      eta: task?.eta || "",
      title: task?.title || "",
      projectId: task?.projectId || "",
      status: task?.status || "All",
      description: task?.description || "",
      amount: task?.amount || "0",
      startedBy: task?.startedBy || [],
      activity: task?.activity || [],
      submissions: asyncnewui_task_submission || [],
      assignedTo: task?.assignedTo || "",
      attachment: task?.attachment || "",
      tag: task?.tag || "",
    };
    console.log("Task:", taskResp);
    setTaskDetails(taskResp);
  };

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
          <Error error="Loading" type="status" />
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
                <div className="md:w-[760px] mx-4 h-fit md:m-auto py-7 font-Inter text-white">
                  <GoBack
                    className="text-[12px] font-normal underline"
                    label={"Back to Home"}
                  />
                  <SubmissionProjectName projectDetails={projectDetails} />
                  <SubmissionTaskDetails taskDetails={taskDetails} />
                  <SubmissionDetails
                    buttonLoading={buttonLoading}
                    buttonLoadingReject={buttonLoadingReject}
                    handleAccept={handleAccept}
                    handleReject={handleReject}
                    project={projectDetails}
                    submission={submission}
                    isManager={isManager}
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

export default TaskSubmission;

export async function getServerSideProps(context: any) {
  const { id, task, project } = context.query;
  console.log("suvmission propr", { id, task, project });

  try {
    const projecttaskdata = await makeHasuraAdminRequest(getSubmissionById, {
      variables: {
        taskId: task,
        projectIdString: project.toString(),
        projectId: parseInt(project),
        submissionId: id,
      },
    });
    const {
      asyncnewui_task,
      asyncnewui_project,
      asyncnewui_task_startedby,
      asyncnewui_images,
      asyncnewui_task_submission,
    } = projecttaskdata?.data;
    let sub: any = {};
    for (let index = 0; index < asyncnewui_task_submission.length; index++) {
      const element = asyncnewui_task_submission[index];
      if (element.id.toString() === id.toString()) {
        sub = element;
      }
    }
    const data = {
      project: asyncnewui_project[0],
      task: asyncnewui_task[0],
      submission: sub,
    };
    data.submission.images = asyncnewui_images;
    data.task.submissions = asyncnewui_task_submission;
    if (!data.project || !data.task || !data.submission) {
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
