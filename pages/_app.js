/** @format */

import { useState, useEffect } from "react";
import "../styles/globals.css";
import { auth } from "../firebase/index";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "../components/Loader/Loader";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [Loading, setIsLoading] = useState(true);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [user, loading]);

  // useEffect(() => {
  //   const handleComplete = () => {
  //     setIsLoading(false);
  //   };
  //   router.events.on("routeChangeComplete", handleComplete);
  //   router.events.on("routeChangeError", handleComplete);

  //   return () => {
  //     router.events.off("routeChangeComplete", handleComplete);
  //     router.events.off("routeChangeError", handleComplete);
  //   };
  // }, [router.events]);

  return loading ? <Loader /> : <Component {...pageProps} />;
};

export default MyApp;
