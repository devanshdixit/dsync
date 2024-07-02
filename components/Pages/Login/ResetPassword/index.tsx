import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import Input from "../../../Forms/Input";
import Button from "../../../Forms/Button";
import { UserContext } from "../../../../context/user.context";
import GoBack from "../../../Goback";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ResetPassword = ({
  showpas,
  setShowpas,
  setShowre,
  showre,
  setResetForm,
  resetForm,
  setComponent,
}: {
  showpas: boolean;
  setShowpas: Function;
  setShowre: Function;
  showre: boolean;
  setComponent: Dispatch<
    SetStateAction<
      | "main"
      | "signup"
      | "signin"
      | "forgotpass"
      | "resetPass"
      | "otp"
      | "login"
    >
  >;
  setResetForm: Function;
  resetForm: {
    email: string;
    password: string;
    confirmPassword: string;
  };
}) => {
  const { resetPassword } = useContext(UserContext);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: "black" }} spin />
  );
  const [loading, setLoading] = useState(false);
  const onsubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError({
      isError: false,
      message: "",
    });
    console.log(resetForm);
    if (
      resetForm.password === "" ||
      resetForm.confirmPassword === "" ||
      resetForm.email === ""
    ) {
      setError({
        isError: true,
        message: "Complete the form",
      });
      setLoading(false);
      return;
    }
    if (resetForm.password !== resetForm.confirmPassword) {
      setError({
        isError: true,
        message: "Password does not match!",
      });
      setLoading(false);
      return;
    }
    console.log(resetForm);
    const res = await resetPassword(resetForm.email, resetForm.password);
    console.log(res);
    setLoading(false);
    setResetForm({
      email: "",
      password: "",
      confirmPassword: "",
    });
    setComponent("signin");
  };

  return (
    <div className="bg-[#0C0C0E] w-[556px] text-white flex flex-col justify-between items-center py-[29px] md:px-[150px] gap-2 relative">
      <GoBack
        onClick={() => {
          setComponent("main");
        }}
        isPath={false}
        label=""
        divClassName=" absolute top-0 left-0 m-4 text-[#858585] text-[12px] font-[400]"
        className="underline underline-offset-4 "
      />
      <div className="text-white text-lg font-[600] mb-4">Reset Password</div>
      {error.isError && (
        <p className="text-center text-red-400 mb-4">{error.message}</p>
      )}
      <form className="flex flex-col">
        <div className="relative">
          <Input
            title="Enter New Password"
            type={showpas ? "password" : "text"}
            className="w-[268px] h-[40px] bg-transparent border-[1px] border-[#3D3D3D] mb-[24px] px-[16px] relatives"
            placeholder="Password"
            onChange={(e: any) => {
              setResetForm((prev: any) => {
                prev.password = e.target.value;
                return prev;
              });
            }}
          />
          {showpas ? (
            <BsEyeFill
              onClick={() => setShowpas(!showpas)}
              className="absolute right-5 top-[35px]"
            />
          ) : (
            <BsEyeSlashFill
              onClick={() => setShowpas(!showpas)}
              className="absolute right-5 top-[35px]"
            />
          )}
        </div>
        <div className="relative ">
          <Input
            title="Re-enter Password"
            type={showre ? "password" : "text"}
            className="w-[268px] h-[40px] bg-transparent border-[1px] border-[#3D3D3D] mb-[24px] px-[16px] "
            placeholder="Password"
            onChange={(e: any) => {
              setResetForm((prev: any) => {
                prev.confirmPassword = e.target.value;
                return prev;
              });
            }}
          />
          {showre ? (
            <BsEyeFill
              onClick={() => setShowre(!showre)}
              className="absolute right-5 top-[35px]"
            />
          ) : (
            <BsEyeSlashFill
              onClick={() => setShowre(!showre)}
              className="absolute right-5 top-[35px]"
            />
          )}
        </div>
        <Button
          onClick={onsubmit}
          title={
            loading ? (
              <div>
                <Spin indicator={antIcon} /> Reseting
              </div>
            ) : (
              "Reset Password"
            )
          }
          className="px-4 py-2 bg-[#A9FF1C] text-black text-base font-[600]"
        />
      </form>
      <div
        onClick={() => setComponent("signin")}
        className="font-[500] text-[12px] mt-[14px] mb-[24px] cursor-pointer "
      >
        Already have an account?&nbsp;
        <span className="text-[#80ED5D] underline">Login</span>
      </div>
    </div>
  );
};

export default ResetPassword;
