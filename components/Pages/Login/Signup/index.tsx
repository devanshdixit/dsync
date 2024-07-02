import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import Input from "../../../Forms/Input";
import Button from "../../../Forms/Button";
import { UserContext } from "../../../../context/user.context";
import { useRouter } from "next/router";
import { validateEmail } from "../../../../utils/validateEmail";
import GoBack from "../../../Goback";
import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Signup = ({
  showre,
  setShowre,
  showpas,
  setShowpas,
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
}) => {
  const { emailPasswordSignup } = useContext(UserContext);
  const router = useRouter();
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [form, setForm] = useState({
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
    if (
      form.confirmPassword === "" ||
      form.email === "" ||
      form.name === "" ||
      form.password === ""
    ) {
      setError({ isError: true, message: "Complete the form!" });
      return;
    }
    if (form.confirmPassword !== form.password) {
      setError({ isError: true, message: "Password does not match!" });
      return;
    }
    if (!validateEmail(form.email)) {
      setError({ isError: true, message: "Enter valid email!" });
      return;
    }
    try {
      const user = await emailPasswordSignup(
        form.email,
        form.password,
        form.name
      );
      if (user) {
        redirectNow("/");
      }
    } catch (error) {
      console.log("error:", error);
      setError({
        isError: true,
        message: "something went wrong!",
      });
      console.error(error);
    }
  };

  const lowercase = /[a-z]/g;
  const uppercase = /[A-Z]/g;
  const num = /[0-9]/g;
  const sym = /[$-/:-?{-~!"^_`\[\]]/;

  const [low, setLow] = useState(false);
  const [up, setUp] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [len, setLen] = useState(false);

  return (
    <div className="bg-[#0C0C0E] w-[556px] text-white flex flex-col justify-between items-center py-[29px]  md:px-[150px] gap-2 relative">
      <GoBack
        onClick={() => setComponent("main")}
        divClassName=" absolute top-0 left-0 m-4 text-[#858585] text-[12px] font-[400]"
        label="Back"
        className="underline underline-offset-4 "
      />
      <div className="text-white text-lg font-[600] mb-4">
        Signup with E-mail
      </div>
      {error.isError && (
        <div className="border-2 border-red-500 px-4 py-2 w-full rounded-sm">
          <p className="text-red-300">{error.message}</p>
        </div>
      )}
      <form className="flex flex-col">
        <Input
          type="text"
          className="w-[268px] h-[40px] bg-transparent border-[1px] border-[#3D3D3D] mb-[16px] px-[16px]"
          placeholder="Name"
          title="Name"
          onChange={(e: any) => {
            onFormInputChange("name", e.target.value);
          }}
        />
        <Input
          type="email"
          className="w-[268px] h-[40px] bg-transparent border-[1px] border-[#3D3D3D] mb-[16px] px-[16px]"
          placeholder="email@prmsnls.xyz"
          title="E-mail"
          onChange={(e: any) => {
            onFormInputChange("email", e.target.value);
          }}
        />
        <div className="relative">
          <div className=" dropdown dropdown-right dropdown-end">
            <label tabIndex={0} className=" m-1"></label>
            <Input
              type={showre ? "password" : "text"}
              className="w-[268px] h-[40px] bg-transparent border-[1px] border-[#3D3D3D] mb-[16px] px-[16px]"
              placeholder="Enter Password"
              title="Password"
              onChange={(e: any) => {
                e.preventDefault();
                if (e.target.value.match(lowercase)) {
                  setLow(true);
                } else setLow(false);
                if (e.target.value.match(uppercase)) {
                  setUp(true);
                } else setUp(false);
                if (e.target.value.match(sym)) {
                  setSymbol(true);
                } else setSymbol(false);
                if (e.target.value.length > 6) {
                  setLen(true);
                } else setLen(false);
                if (e.target.value.match(num)) {
                  setNumber(true);
                } else setNumber(false);
                onFormInputChange("password", e.target.value);
              }}
            />
            <div
              tabIndex={0}
              className="hidden md:block dropdown-content menu p-3 bg-black shadow rounded-box min-w-max ml-2 z-10  border-[1px] border-[#3D3D3D] "
            >
              <div className=" h-3 w-3   bg-black absolute top-[125px] left-[-6px] -z-10 rotate-45  border-[#3D3D3D] border-b-[1px] border-l-[1px] " />
              <div className="text-[14px] font-[500] font-Inter">
                Must have at least 6 characters
              </div>
              <div className="flex gap-[10px] my-[10px]">
                <div
                  className={`h-[2px] w-[50px] ${
                    low && up ? "bg-[#80ED5D]" : "bg-[#3D3D3D]"
                  } `}
                />
                <div
                  className={`h-[2px] w-[50px] ${
                    number ? "bg-[#80ED5D]" : "bg-[#3D3D3D]"
                  } `}
                />
                <div
                  className={`h-[2px] w-[50px] ${
                    symbol ? "bg-[#80ED5D]" : "bg-[#3D3D3D]"
                  } `}
                />
                <div
                  className={`h-[2px] w-[50px] ${
                    len ? "bg-[#80ED5D]" : "bg-[#3D3D3D]"
                  } `}
                />
              </div>
              <div className="mb-[10px] text-[#858585] text-[14px] font-[400] font-Inter">
                {` It's better to have:`}
              </div>
              <div className="flex gap-[10px] items-center">
                <div>
                  {low && up ? (
                    <MdDone className="text-[#80ED5D]" />
                  ) : (
                    <RxCross2 className="text-[#FF1C1C]" />
                  )}
                </div>
                <div className="text-[#858585] text-[12px] font-[400] font-Inter">
                  Upper & lower case letters
                </div>
              </div>
              <div className="flex gap-[10px] items-center">
                <div>
                  {number ? (
                    <MdDone className="text-[#80ED5D]" />
                  ) : (
                    <RxCross2 className="text-[#FF1C1C]" />
                  )}
                </div>
                <div className="text-[#858585] text-[12px] font-[400] font-Inter">
                  Numeric characters
                </div>
              </div>
              <div className="flex gap-[10px]">
                <div>
                  {symbol ? (
                    <MdDone className="text-[#80ED5D]" />
                  ) : (
                    <RxCross2 className="text-[#FF1C1C]" />
                  )}
                </div>
                <div className="text-[#858585] text-[12px] font-[400] font-Inter">{`A symbol (#$&)`}</div>
              </div>
              <div className="flex gap-[10px]">
                <div>
                  {len ? (
                    <MdDone className="text-[#80ED5D]" />
                  ) : (
                    <RxCross2 className="text-[#FF1C1C]" />
                  )}
                </div>
                <div className="text-[#858585] text-[12px] font-[400] font-Inter">
                  A longer password
                </div>
              </div>
            </div>
          </div>

          {showpas ? (
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
          <Input
            type={showpas ? "password" : "text"}
            className="w-[268px] h-[40px] bg-transparent border-[1px] border-[#3D3D3D] mb-1 px-[16px]"
            placeholder="Confirm Password"
            title="Confirm Password"
            onChange={(e: any) => {
              e.preventDefault();
              onFormInputChange("confirmPassword", e.target.value);
            }}
          />
          {showre ? (
            <BsEyeFill
              onClick={() => setShowpas(!showpas)}
              className="absolute right-5 top-[115px]"
            />
          ) : (
            <BsEyeSlashFill
              onClick={() => setShowpas(!showpas)}
              className="absolute right-5 top-[115px]"
            />
          )}
        </div>

        {form.password !== "" &&
        form.confirmPassword !== "" &&
        form.name !== "" &&
        form.email !== "" ? (
          <Button
            title="Create Account"
            onClick={onSubmit}
            className="px-4 py-2 bg-[#A9FF1C] text-black text-base font-[600] mt-4"
          />
        ) : (
          <Button
            disabled={true}
            title="Create Account"
            className="px-4 py-2 bg-[#101A00] text-[#858585] text-base font-[600] mt-4"
          />
        )}
      </form>
      <div
        onClick={() => setComponent("main")}
        className="font-[500] text-[12px] mt-[14px] mb-[24px] cursor-pointer "
      >
        Already have an accont?&nbsp;
        <span className="text-[#80ED5D] underline">Login</span>
      </div>
    </div>
  );
};

export default Signup;
