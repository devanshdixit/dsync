import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { AnimatePresence } from "framer-motion";
import { Provider, useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { store } from "../store/store";
import { jwtDecode } from "jwt-decode";
import AuthWrapper from "../components/AuthWrapper";

export default function App({ Component, pageProps, router }: AppProps) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);


  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <Provider store={store}>
      <AuthWrapper>
        <AnimatePresence mode="wait">
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </AuthWrapper>
    </Provider>
  );
}
