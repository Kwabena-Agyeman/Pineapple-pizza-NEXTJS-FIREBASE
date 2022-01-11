/** @format */

import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth } from "../firebase/index";
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter, Router } from "next/router";

const Login = () => {
  const router = useRouter();

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",

    // We will display Google as auth providers.
    signInOptions: [GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: (user) => {
        console.log({ user });
        router.push("/");
      },
    },
  };

  return (
    <div
      style={{
        maxWidth: "320px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Pineapple Login</h1>
      <p>please sign in</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
};

export default Login;
