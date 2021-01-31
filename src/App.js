import React from "react";
import { firebase } from "./Firebase/FirebaseConfig";
import { CommentBoxApp } from "./Components";
const App = () => {
  return (
    <>
      <CommentBoxApp CollectionName={"Example"} firebase={firebase} />
    </>
  );
};
export default App;
