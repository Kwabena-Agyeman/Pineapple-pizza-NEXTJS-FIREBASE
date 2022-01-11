/** @format */

import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/index";
import Loader from "../Loader/Loader";

const VoterList = ({ id, vote }) => {
  const reference = doc(db, "users", `${id}`);

  const [snapshot, loading, error] = useDocument(reference, {});

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return null;
  }

  return (
    <div
      style={{
        maxWidth: "320px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <img
        style={{
          borderRadius: "50%",
          maxHeight: "48px",
          marginTop: "8px",
          marginRight: "8px",
        }}
        src={snapshot?.data()?.photoURL}
      />
      <div>
        <h4 style={{ marginBottom: 0 }}>{snapshot.data().displayName}</h4>
        <h4 style={{ marginTop: 0 }}>
          Voted: {vote === "yes" ? "✅🍍" : "❌🍍"}
        </h4>
      </div>
    </div>
  );
};

export default VoterList;
