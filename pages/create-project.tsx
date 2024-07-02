import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BsPencilFill, BsPlus } from "react-icons/bs";
import Button from "../components/Forms/Button";
import Input from "../components/Forms/Input";
import Header from "../components/Header";
import { appConfig } from "../config/appConfig";
import { UserContext } from "../context/user.context";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import dynamic from 'next/dynamic';
import congo from "../public/images/congo2.json";
import AnimateWrapper from "../components/Animations/Wrappers/AnimateWrapper";
import { createProjectQuery, getProjectByName } from "../utils/queries";
import InfoWarning from "../components/InfoWarning";
import { useSelector } from "react-redux";
import { makeHasuraAdminRequest } from "../config/fetch-requests";
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

export default function Createproject() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: congo,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [image, setSelectedImage] = useState<any>(null);
  const [projectId, setProjecId] = useState("");
  const [component, setComponent] = useState("create");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const user = useSelector((state:any) => state?.user?.id);
  const router = useRouter();
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: "black" }} spin />
  );
  const onImageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setForm((prev) => {
        prev.logo = e.target.files[0];
        return prev;
      });
    }
  };
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [form, setForm] = useState<{
    logo: any;
    name: string;
    category: string;
  }>({
    logo: "",
    name: "",
    category: "",
  });

  const onCreateProject = async (e: any) => {
    e.preventDefault();
    let quit = false;
    if (!user) {
      setError({
        isError: true,
        message: "Please login/signup!",
      });
      return;
    }
    form.name = form.name.trim();
    console.log(form);
    try {
      setLoading(true);
      await makeHasuraAdminRequest(getProjectByName, {
        variables: {
          name: form.name,
        },
      })
        .then((resp) => {
          if (resp?.data?.asyncnewui_project?.length !== 0) {
            setError({
              isError: true,
              message: "The project name already exist",
            });
            setLoading(false);
            quit = true;
            return;
          }
        })
        .catch((err) => {
          setError({
            isError: true,
            message: "verification failed, reload!",
          });
          setLoading(false);
          quit = true;
          return;
        });
      if (quit) {
        return;
      }

      if (form.logo !== "") {
        const metadata: any = {
          contentType: form.logo.type,
        };
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, "projects-logo/" + form.logo.name);
        const uploadTask = uploadBytesResumable(
          storageRef,
          form.logo,
          metadata
        );
        // Listen for state changes, errors, and completion of the upload.
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
                setError({
                  isError: true,
                  message: "Image upload failed - storage/unauthorized",
                });
                setLoading(false);
                return;
              case "storage/canceled":
                // User canceled the upload
                console.log("storage/canceled");
                setError({
                  isError: true,
                  message: "Image upload failed - storage/canceled",
                });
                setLoading(false);
                return;
              case "storage/unknown":
                // User canceled the upload
                console.log("storage/unknown");
                setError({
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
                setForm((prev) => {
                  prev.logo = downloadURL;
                  return prev;
                });
                delete form.logo;
                let formValues = {
                  ...form,
                  logo: downloadURL,
                  status: "published",
                  chats: [],
                  createdBy: user,
                };
                console.log(formValues);
                const response = await makeHasuraAdminRequest(
                  createProjectQuery,
                  {
                    variables: {
                      category: formValues.category,
                      created_by:`${formValues.createdBy}`,
                      logo: formValues.logo,
                      name: formValues.name,
                    },
                  }
                );
                console.log("create project repsonse", response);
                if (response?.error) {
                  setLoading(false);
                  setError({
                    isError: true,
                    message: "Error in creating Project",
                  });
                  return;
                }
                if (response?.data) {
                  setComponent("completed");
                  setProjecId(
                    response?.data?.insert_asyncnewui_project_one?.id
                  );
                  setLoading(false);
                  return;
                }
              }
            );
          }
        );
      } else {
        let formValues = {
          ...form,
          status: "published",
          chats: [],
          createdBy: user,
        };
        console.log(formValues);

        const response = await makeHasuraAdminRequest(createProjectQuery, {
          variables: {
            category: formValues.category,
            created_by: formValues.createdBy,
            logo: "",
            name: formValues.name,
          },
        });
        console.log("create project repsonse", response);
        if (response?.error) {
          setLoading(false);
          setError({
            isError: true,
            message: "Error in creating Project",
          });
          return;
        }
        if (response?.data) {
          setComponent("completed");

          setProjecId(response?.data?.insert_asyncnewui_project_one?.id);
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <>
      <Head>
        <title>Create Project</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={appConfig.logo} />
      </Head>
      <Header />
      <AnimateWrapper>
        <main className="flex justify-center items-center h-[90vh] text-white">
          {component == "create" && (
            <div className="bg-[#0C0C0E] flex flex-col justify-center items-center py-7 md:px-[115px] px-[15  px] ">
              {error.isError && <InfoWarning error={error.message} />}
              <div>Create Project</div>
              <form className="flex flex-col justify-center items-center relative px-7 md:p-0">
                <input
                  type="file"
                  id="files"
                  name="profile pic"
                  onChange={onImageChange}
                  accept="image/png, image/gif, image/jpeg"
                  className="hidden"
                />
                <BsPencilFill className="absolute top-[57px] z-10" />
                <label
                  htmlFor="files"
                  className="h-[100px] w-[100px] flex items-center justify-center bg-[#3D3D3D] m-4 hover:z-0 z-20  "
                >
                  {image ? (
                    <Image
                      height={100}
                      width={100}
                      alt="image"
                      src={URL.createObjectURL(image)}
                      className="hover:opacity-50 aspect-square"
                    />
                  ) : (
                    <BsPlus />
                  )}
                </label>
                <div>Logo</div>
                <div className="flex flex-col items-start justify-start">
                  <Input
                    labelClass="text-base font-[400] pb-1"
                    title="Project Name *"
                    type="text"
                    required={true}
                    className="hover:bg-[#242426] outline-0 w-[268px] h-[40px] bg-transparent border-[1px] border-[#3D3D3D] mb-[16px]  placeholder:text-[14px] py-[10.5px] px-[16px]"
                    placeholder="Enter project name"
                    onChange={(e: any) => {
                      setName(e.target.value);
                      setForm((prev) => {
                        prev.name = e.target.value;
                        return prev;
                      });
                    }}
                    onBlur={(e: any) => {
                      if (e.target.value.length < 4) {
                        setError({
                          isError: true,
                          message:
                            "Project name should be more then 4 characters",
                        });
                      } else {
                        setError({
                          isError: false,
                          message: "",
                        });
                      }
                    }}
                  />{" "}
                  <label
                    htmlFor="category"
                    className="text-base font-[400] pb-1"
                  >
                    Select Category *
                  </label>
                  <select
                    id="category"
                    onChange={(e: any) => {
                      console.log(e.target.value);
                      setCategory(e.target.value);
                      setForm((prev) => {
                        prev.category = e.target.value;
                        return prev;
                      });
                    }}
                    className="hover:bg-[#242426] outline-0 w-[268px] text-[14px] h-[45px] bg-transparent border-[1px] border-[#3D3D3D] mb-[16px]  placeholder:text-[14px] py-[10.5px] px-[16px]"
                  >
                    <option defaultChecked value="">
                      Choose the category
                    </option>
                    <option value="Web Development">Web Developement</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Social media">Social Media</option>
                    <option value="Design">Design</option>
                  </select>
                  {name.length > 3 && category !== "" ? (
                    <Button
                      title={
                        loading ? (
                          <span className="">
                            <Spin indicator={antIcon} className="mr-2 -mt-1" />
                            Creating
                          </span>
                        ) : (
                          "Create Project"
                        )
                      }
                      onClick={onCreateProject}
                      className="hover:opacity-80 self-end px-[14px] py-[10.5px] bg-[#A9FF1C] text-black text-[16px] font-[600]"
                    />
                  ) : (
                    <div className="self-end px-[14px] py-[10.5px] bg-[#101A00] text-[#858585] text-[16px] font-[600]">
                      Create
                    </div>
                  )}
                </div>
              </form>
            </div>
          )}

          {component == "completed" && (
            <AnimateWrapper>
              <div className="bg-[#0C0C0E] flex flex-col justify-center items-center py-7 md:px-[115px] px-[50px] relative">
                <Image
                  src={"/images/creatsuccess.png"}
                  height={129}
                  width={129}
                  alt=""
                />
                <div className="absolute z-10">
                  {/* <Lottie isClickToPauseDisabled options={defaultOptions} height={500} width={500} /> */}
                </div>
                <div className="text-[16px] font-[600] text-white]">
                  Wohoo! Your project have been created!!
                </div>
                {!user ? (
                  <>
                    <div className="text-[#CECECE] font-[400] text-[14px] w-[245px] text-center mt-[16px]">
                      You need to login and come back here to publish this
                      project to Async
                    </div>
                    <div
                      onClick={(e: any) => {
                        e.preventDefault();
                        router.push("/login");
                      }}
                      className="text-[12px] font-[600] underline mt-[16px]"
                    >
                      click here to login/signup
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center items-center">
                    <Button
                      title="Create a Task"
                      onClick={(e: any) => {
                        e.preventDefault();
                        router.push(`/project/${projectId}`);
                      }}
                      className="text-[#A9FF1C] text-[12px] font-[600] underline underline-offset-2 mt-7 mb-10 z-20"
                    />
                  </div>
                )}
              </div>
            </AnimateWrapper>
          )}
        </main>
      </AnimateWrapper>
    </>
  );
}
