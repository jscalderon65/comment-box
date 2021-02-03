import React from "react";
import { CommentBoxContainer } from "../index";
import { Provider } from "react-redux";
import Store from "../../Redux/Store";
import { PageHeader } from "antd";
import { GithubFilled } from "@ant-design/icons";

const CommentBoxApp = ({ CollectionName, firebase }) => {
  const IconLink = ({ icon }) => (
    <a href="https://github.com/jscalderon65/comment-box">{icon}</a>
  );

  return (
    <>
      <PageHeader
        style={{ background: "white" }}
        title="my-comment-box-app"
        subTitle={
          <IconLink
            icon={<GithubFilled style={{ fontSize: "40px" }} />}
          />
        }
      ></PageHeader>
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
