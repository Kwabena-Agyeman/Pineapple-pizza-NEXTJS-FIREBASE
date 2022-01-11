/** @format */

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/index";

export default function Home() {
  const votesQuery = collection(db, "votes");
  //Destructure user, loading and error out of the hook
  const [user, loading, error] = useAuthState(auth);
  //Destructure a listening snapshot, loading anf error out of the hook
  //Snapshot is monitoring our DB, and changes when ever there is a change
  const [snapshot, votesLoading, votesError] = useCollection(votesQuery, {});

  //console.log the current user and the loading status
  console.log("Loading :", loading, "|", "Current User :", user);

  // if (!votesLoading && snapshot) {
  //   snapshot.docs.map((doc) => console.log(doc.data()));
  // }

  //Create a document funtion
  const addVoteDocument = async (vote) => {
    const response = await setDoc(doc(db, "votes", user.uid), { vote: vote });
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gridGap: 8,
        background:
          "linear-gradient(180deg,rgba(238,174,202,1) 0%, rgba(146,187,233,1) 100%)",
      }}
    >
      <h1>Pineapple on Pizza?</h1>

      <div style={{ flexDirection: "row", display: "flex" }}>
        <button
          style={{ fontSize: 32, marginRight: 8 }}
          onClick={() => addVoteDocument("yes")}
        >
          ✅🍍🍕
        </button>
        <h3>
          Pineapple Lovers :{" "}
          {snapshot?.docs?.filter((doc) => doc.data().vote === "yes").length}
        </h3>
      </div>
      <div style={{ flexDirection: "row", display: "flex" }}>
        <button
          style={{ fontSize: 32, marginRight: 8 }}
          onClick={() => addVoteDocument("no")}
        >
          ❌🍍🍕
        </button>
        <h3>
          Pineapple Hater :{" "}
          {snapshot?.docs?.filter((doc) => doc.data().vote === "no").length}
        </h3>
      </div>
    </div>
  );
}
