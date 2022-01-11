/** @format */

import "../styles/globals.css";
import { auth } from "../firebase/index";
import { useAuthState } from "react-firebase-hooks/auth";

const MyApp = ({ Component, pageProps }) => {
  const [user, loading, error] = useAuthState(auth);

  return <Component {...pageProps} />;
};

export default MyApp;
