import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FC, useContext, useState } from "react";
import Input from "../../../Forms/Input";
import Button from "../../../Forms/Button";
import { UserContext } from "../../../../context/user.context";
import { useRouter } from "next/router";
import { validateEmail } from "../../../../utils/validateEmail";
import GoBack from "../../../Goback";

interface SigninProps {
  showre: boolean;
  setShowre: Function;
  setComponent: Function;
}

const Signin: FC<SigninProps> = ({
  showre,
  setShowre,
  setComponent,
}: {
  showre: boolean;
  setShowre: Function;
  setComponent: Function;
}) => {
  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);
  const router = useRouter();
  const redirectUrl: any = router?.query?.redirect || "";
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [form, setForm] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const onFormInputChange = (name: any, value: any) => {
    setForm({ ...form, [name]: value });
  };

  const redirectNow = (path: string) => {
    router.push(path);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setError({ isError: false, message: "" });
    if (form.email === "" || form.password === "") {
      setError({ isError: true, message: "Complete the form!" });
      return;
    }
    if (!validateEmail(form.email)) {
      setError({ isError: true, message: "Enter valid email!" });
      return;
    }
    try {
      const user = await emailPasswordLogin(form.email, form.password);
      if (user) {
        if (redirectUrl !== "") {
          redirectNow(redirectUrl);
        } else {
          redirectNow("/");
        }
      }
    } catch (error) {
      const { statusCode }: any = error;
      if (statusCode === 401) {
        setError({
          isError: true,
          message: "Invalid username/password. Try again!",
        });
      } else {
        setError({ isError: true, message: "Something went wrong!" });
      }
    }
  };

  return (
    <div className="bg-[#0C0C0E] w-[556px] text-white flex flex-col relative justify-between items-center py-[29px] md:px-[150px] gap-2">
      <GoBack
        onClick={() => {
          setComponent("main");
        }}
        isPath={false}
        label=""
        divClassName=" absolute top-0 left-0 m-4 text-[#858585] text-[12px] font-[400]"
        className="underline underline-offset-4 "
      />
      <div className="text-white text-lg font-[600] mb-4">E-mail Login</div>
      {error.isError && (
        <div className="border-2 border-red-500 px-4 py-2 w-full rounded-sm">
          <p className="text-red-300">{error.message}</p>
        </div>
      )}
      <form className="flex flex-col">
        <Input
          className="w-[268px] h-[40px] bg-transparent border-[1px] border-[#3D3D3D] mb-[16px] px-[16px]"
          title="Username / Email"
          placeholder="Name"
          type="text"
          value={form.email}
          onChange={(e: any) => {
            e.preventDefault();
            onFormInputChange("email", e.target.value);
          }}
        />
        <div className="relative flex flex-col">
          <Input
            className="w-[268px] h-[40px] bg-transparent border-[1px] border-[#3D3D3D] mb-[16px] px-[16px]"
            title="Password"
            placeholder="Password"
            type={showre ? "password" : "text"}
            value={form.password}
            onChange={(e: any) => {
              e.preventDefault();
              onFormInputChange("password", e.target.value);
            }}
          />
          {showre ? (
            <BsEyeFill
              onClick={() => setShowre(!showre)}
              className="absolute right-5 top-[40px]"
            />
          ) : (
            <BsEyeSlashFill
              onClick={() => setShowre(!showre)}
              className="absolute right-5 top-[40px]"
            />
          )}
        </div>
        <Button
          title="Login"
          type="submit"
          onClick={onSubmit}
          className="px-4 py-2 bg-[#A9FF1C] text-black text-base font-[600]"
        />
      </form>
      <Button
        title="Forgot Password?"
        onClick={() => setComponent("forgotpass")}
        className="text-[#858585] text-base font-[400] mt-3 underline flex items-center justify-center cursor-pointer"
      />
      <div
        onClick={() => setComponent("signup")}
        className="font-[500] text-[12px] mt-[14px] mb-[24px] cursor-pointer "
      >
        Dont have an account?&nbsp;
        <span className="text-[#80ED5D] underline">Signup</span>
      </div>
    </div>
  );
};

export default Signin;
