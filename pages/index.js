/** @format */

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Home() {
  const votesQuery = collection(db, "votes");
  //Destructure user, loading and error out of the hook
  const [user, loading, error] = useAuthState(auth);
  //Destructure a listening snapshot, loading anf error out of the hook
  const [snapshot, votesLoading, votesError] = useCollection(votesQuery, {});

  //console.log the current user and the loading status
  console.log("Loading :", loading, "|", "Current User :", user);

  if (!votesLoading && snapshot) {
    snapshot.docs.map((doc) => console.log(doc.data()));
  }

  //Create a document funtion
  const addVoteDocument = async (vote) => {
    const response = await setDoc(doc(db, "votes", user.uid), { vote: vote });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        onClick={() => {
          addVoteDocument("yes");
        }}
        style={{ fontSize: 32, marginRight: 8 }}
      >
        ✅🍍🍕
      </button>
      <button
        onClick={() => {
          addVoteDocument("no");
        }}
        style={{ fontSize: 32 }}
      >
        ❌🍍🍕
      </button>
    </div>
  );
}
