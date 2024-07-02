import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import { appConfig } from "../config/appConfig";
import Signup from "../components/Pages/Login/Signup";
import Signin from "../components/Pages/Login/Signin";
import ResetPassword from "../components/Pages/Login/ResetPassword";
import ForgotPassword from "../components/Pages/Login/ForgotPassword";
import Main from "../components/Pages/Login/MainComp";
import { pageBottomToTop } from "../components/Animations/PageSwitch";
import { motion } from "framer-motion";
import AnimateWrapper from "../components/Animations/Wrappers/AnimateWrapper";
export default function Home() {
  const [comp, setComponent] = useState<
    "main" | "signup" | "signin" | "forgotpass" | "resetPass" | "otp" | "login"
  >("main");
  const [showpas, setShowpas] = useState<boolean>(true);
  const [showre, setShowre] = useState<boolean>(true);
  const [nextStep, setNextStep] = useState<boolean>(true);
  const [resetForm, setresetForm] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <>
      <Head>
        <title>Async</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={appConfig.logo} />
      </Head>
      <Header />
      <AnimateWrapper>
        <main className="flex justify-center items-center h-[80vh]">
          {comp === "main" && <Main setComponent={setComponent} />}
          {comp === "signup" && (
            <Signup
              showre={showre}
              setShowre={setShowre}
              showpas={showpas}
              setShowpas={setShowpas}
              setComponent={setComponent}
            />
          )}
          {comp === "signin" && (
            <Signin
              showre={showre}
              setShowre={setShowre}
              setComponent={setComponent}
            />
          )}
          {comp === "forgotpass" && (
            <ForgotPassword
              nextStep={nextStep}
              setComponent={setComponent}
              setResetForm={setresetForm}
              resetForm={resetForm}
            />
          )}
          {comp === "resetPass" && (
            <ResetPassword
              showpas={showpas}
              setShowpas={setShowpas}
              setShowre={setShowre}
              showre={showre}
              setResetForm={setresetForm}
              resetForm={resetForm}
              setComponent={setComponent}
            />
          )}
        </main>
      </AnimateWrapper>
    </>
  );
}
