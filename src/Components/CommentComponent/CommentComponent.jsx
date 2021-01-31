import { useState, useRef } from "react";
import { useForm } from "my-customhook-collection";
import {
  Input,
  Comment,
  Tooltip,
  Typography,
  Collapse,
  Popconfirm,
  Image,
  Button,
  message,
} from "antd";
import {
  DeleteComment,
  UpdateComment,
  AddReply,
} from "../../Firebase/FirestoreFunctions";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
const { Title } = Typography;
const { info } = message;
const { Panel } = Collapse;
const CommentComponent = ({
  children,
  userInfo,
  CommentContent,
  Replies,
  UserOnlineInfo,
  Creation,
  id,
  FirebaseApp,
}) => {
  const ReplyScrollHandler = useRef();
  const EditScrollHandler = useRef();
  const { uid, displayName, photoURL } = userInfo;
  const [
    { ReplyInputValue },
    HandleInputReplyChange,
    setReplyInputValue,
  ] = useForm({
    ReplyInputValue: "",
  });

  const [SwitchReply, setSwitchReply] = useState(false);
  const SwitchReplyHandler = () => {
    setSwitchReply(!SwitchReply);
    ReplyScrollHandler.current.scrollIntoView({ behavior: "smooth" });
  };

  const [{ EditInputValue }, HandleInputChange, setEditInputValues] = useForm({
    EditInputValue: CommentContent,
  });

  const ReplyHandler = () => {
    if (ReplyInputValue.trim() === "") {
      info("¡Ingresa un comentario!");
    } else {
      AddReply(
        FirebaseApp,
        id,
        Replies,
        ReplyInputValue,
        UserOnlineInfo,
        displayName
      );
      SwitchReplyHandler();
      setReplyInputValue({
        ReplyInputValue: "",
      });
    }
  };

  const [SwitchEdit, setSwitchEdit] = useState(false);
  const SwitchEditHandler = () => {
    setEditInputValues({
      EditInputValue: CommentContent,
    });
    setSwitchEdit(!SwitchEdit);
    EditScrollHandler.current.scrollIntoView({ behavior: "smooth" });
  };
  const UpdateHandler = () => {
    UpdateComment(FirebaseApp, id, EditInputValue);
    setSwitchEdit(!SwitchEdit);
  };

  const actions = [
    UserOnlineInfo && uid === UserOnlineInfo.uid && (
      <Tooltip title={"Editar comentario"}>
        <EditFilled onClick={SwitchEditHandler} />
      </Tooltip>
    ),
    UserOnlineInfo && uid === UserOnlineInfo.uid && (
      <Popconfirm
        placement="topLeft"
        title={"¿Quieres eliminar este comentario?"}
        onConfirm={() => DeleteComment(FirebaseApp, id)}
        okText="Si"
        cancelText="No"
      >
        <Tooltip title={"Eliminar comentario"}>
          <DeleteFilled />
        </Tooltip>
      </Popconfirm>
    ),
    UserOnlineInfo && (
      <span key="comment-basic-reply-to" onClick={SwitchReplyHandler}>
        Responder
      </span>
    ),
  ];

  return (
    <Comment
      style={{
        border: "ridge",
        marginTop: "5px",
        padding: "10px",
      }}
      actions={actions}
      author={<Title level={5}>{displayName}</Title>}
      avatar={<Image src={photoURL} alt={displayName} />}
      content={
        <>
          <div ref={EditScrollHandler} />
          <p>
            {SwitchEdit ? (
              <>
                <Input
                  name="EditInputValue"
                  size="large"
                  value={EditInputValue}
                  onChange={HandleInputChange}
                />
                <Button onClick={SwitchEditHandler} danger>
                  Cancelar
                </Button>
                {EditInputValue !== CommentContent
                  ? EditInputValue && (
                      <Button onClick={UpdateHandler}>Guardar cambios</Button>
                    )
                  : ""}
              </>
            ) : (
              CommentContent
            )}
          </p>
        </>
      }
      datetime={
        <Tooltip title={Creation}>
          <span>{Creation}</span>
        </Tooltip>
      }
    >
      <div ref={ReplyScrollHandler} />
      {SwitchReply && (
        <>
          <Input.TextArea
            onChange={HandleInputReplyChange}
            name={"ReplyInputValue"}
            value={ReplyInputValue}
          />
          <Button onClick={SwitchReplyHandler} danger>
            Cancelar
          </Button>
          {ReplyInputValue && <Button onClick={ReplyHandler}>Responder</Button>}
        </>
      )}
      {/* {JSON.stringify(Replies,null,4)} */}
      {Replies.length > 0 ? (
        <Collapse defaultActiveKey={["Replies"]}>
          <Panel header={`Respuestas ${Replies.length}`} key="Replies">
            {children}
          </Panel>
        </Collapse>
      ) : (
        ""
      )}
    </Comment>
  );
};

export default CommentComponent;
