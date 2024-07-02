import React, { Dispatch, SetStateAction, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import Button from "../../../Forms/Button";
import Input from "../../../Forms/Input";
import GoBack from "../../../Goback";
import InfoWarning from "../../../InfoWarning";

const ForgotPassword = ({
  nextStep,
  setComponent,
  setResetForm,
  resetForm,
}: {
  nextStep: boolean;
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
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  return (
    <div className="bg-[#0C0C0E] w-[556px] text-white flex flex-col justify-between items-center py-[29px] md:px-[150px] gap-2 relative">
      <GoBack
        onClick={() => setComponent("main")}
        divClassName=" absolute top-0 left-0 m-4 text-[#858585] text-[12px] font-[400]"
        label=""
        isPath={false}
        className="underline underline-offset-4 "
      />
      <div className="text-white text-lg font-[600] mb-4">Forgot Password</div>
      {nextStep ? (
        <form className="flex flex-col ">
          <Input
            title="Registered E-mail"
            type="email"
            placeholder="Enter Registered Email"
            className="w-[268px] h-[40px] bg-transparent border-[1px] border-[#3D3D3D] mb-[16px] px-[16px]"
            onChange={(e: any) => {
              setResetForm({
                email: e.target.value,
                password: "",
                confirmPassword: "",
              });
            }}
          />
          {error.isError && <InfoWarning error={error.message} />}
          <Button
            title="Continue"
            type="submit"
            onClick={(e: any) => {
              e.preventDefault();
              setError({
                isError: false,
                message: "",
              });
              if (resetForm.email === "") {
                setError({
                  isError: true,
                  message: "Enter valid Email Id",
                });
                return;
              }
              setComponent("resetPass");
            }}
            className="px-4 py-2 bg-[#A9FF1C] text-black text-base font-[600]"
          />
        </form>
      ) : (
        <div className="flex flex-col">
          <label className="mb-6   text-center text-[#858585] text-[14px] font-[400] ">
            A password reset link have been sent to the registered E-mail
          </label>

          <Button
            title="Check Inbox"
            icon={<BsArrowUpRight />}
            onClick={() => {
              setComponent("resetPass");
            }}
            className="px-4 py-2 bg-[#A9FF1C] text-black text-base font-[600] flex justify-center items-center "
          />
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
