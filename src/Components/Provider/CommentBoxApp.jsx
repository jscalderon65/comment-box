import React from "react";
import { Provider } from "react-redux";
import Store from "../../Redux/Store";
import {Login , CommentBoxContainer } from "../index.js";
import "antd/dist/antd.css";
const CommentBoxApp = ({ CollectionName, firebase }) => {
  return (
    <>
      <Login firebase={firebase} />
      <Provider store={Store}>
        <CommentBoxContainer
          CollectionName={CollectionName}
          firebase={firebase}
        />
      </Provider>
    </>
  );
};

export default CommentBoxApp;
