import { useRef, useState } from "react";
import { useForm } from "my-customhook-collection";
import {
  Comment,
  Tooltip,
  Image,
  Typography,
  Popconfirm,
  Input,
  Button,
} from "antd";
import { DeleteReply, UpdateReply } from "../../Firebase/FirestoreFunctions";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
const { Title } = Typography;
const ReplyComponent = ({
  id: ReplyId,
  children,
  DocId,
  Creation,
  Reply,
  Replies,
  ReplyTo,
  UserInfo,
  FirebaseApp,
  UserOnlineInfo,
}) => {
  const ReplyScrollHandler = useRef();
  const EditScrollHandler = useRef();
  const { displayName, photoURL, uid } = UserInfo;
  const [{ EditInputValue }, HandleInputChange, setEditInputValues] = useForm({
    EditInputValue: Reply,
  });
  const [SwitchEdit, setSwitchEdit] = useState(false);

  const EditHandler = () => {
    UpdateReply(FirebaseApp, DocId, Replies, ReplyId, EditInputValue);
    setSwitchEdit(!SwitchEdit);
  };

  const SwitchEditHandler = () => {
    setEditInputValues({
      EditInputValue: Reply,
    });
    setSwitchEdit(!SwitchEdit);

    EditScrollHandler.current.scrollIntoView({ behavior: "smooth" });
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
        onConfirm={() => DeleteReply(FirebaseApp, DocId, Replies, ReplyId)}
        okText="Si"
        cancelText="No"
      >
        <Tooltip title={"Eliminar comentario"}>
          <DeleteFilled />
        </Tooltip>
      </Popconfirm>
    ),
    UserOnlineInfo && <span key="comment-basic-reply-to">Responder</span>,
  ];

  return (
    <Comment
      style={{
        borderLeft: "ridge 10px",
        marginTop: "5px",
        padding: "10px",
        borderRadius: "5px",
      }}
      actions={actions}
      author={<Title level={5}>{displayName}</Title>}
      avatar={<Image src={photoURL} alt={displayName} />}
      content={
        <>
          <div ref={EditScrollHandler} />
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
              {EditInputValue !== Reply
                ? EditInputValue && (
                    <Button onClick={EditHandler}>Guardar cambios</Button>
                  )
                : ""}
            </>
          ) : (
            <p>
              <b>Respondiendo a @{ReplyTo} </b>
              {Reply}
            </p>
          )}
        </>
      }
      datetime={
        <Tooltip title={Creation}>
          <span>{Creation}</span>
        </Tooltip>
      }
    >
      <div ref={ReplyScrollHandler} />
    </Comment>
  );
};

export default ReplyComponent;
