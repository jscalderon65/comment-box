import React from "react";
import { firebase } from "./Firebase/FirebaseConfig";
import { CommentBoxApp } from "./Components";
import './App.css'
const App = () => {
  return (
    <>
      <CommentBoxApp CollectionName={"npm"} firebase={firebase} />
    </>
  );
};
export default App;
