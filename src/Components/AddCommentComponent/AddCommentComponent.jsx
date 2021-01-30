import React from "react";
import { useForm } from "my-customhook-collection";
import { AddComment } from "../../Firebase/FirestoreFunctions";
import { message, Input, Button, Divider } from "antd";
import { SendOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { info } = message;
const AddCommentComponent = ({ FirebaseApp, UserInfo }) => {
  const { uid, email, displayName, photoURL } = UserInfo;
  const [{ AddCommentInput }, HandleInputChange, setFormValues] = useForm({
    AddCommentInput: "AddCommentInput",
  });
  const onSubmitHandle = (e) => {
    e.preventDefault();
    if (AddCommentInput.trim() === "") {
      info("¡Ingresa un comentario!");
    } else {
      AddComment(FirebaseApp, AddCommentInput, {
        uid,
        email,
        displayName,
        photoURL,
      });
      setFormValues({
        AddCommentInput: "",
      });
    }
  };
  return (
    <form
      onSubmit={onSubmitHandle}
      style={{
        border: "ridge",
        marginTop: "5px",
        padding: "10px",
      }}
    >
      {/* {JSON.stringify(UserInfo)} */}
      <TextArea
        rows={4}
        name="AddCommentInput"
        onChange={HandleInputChange}
        value={AddCommentInput}
      />
      <Divider />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          htmlType="submit"
          icon={<SendOutlined />}
          type="primary"
          size="large"
        >
          Publicar
        </Button>
      </div>
    </form>
  );
};

export default AddCommentComponent;
