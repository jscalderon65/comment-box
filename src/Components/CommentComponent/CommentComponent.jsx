import { Comment, Tooltip, Avatar, Typography, Collapse } from "antd";
import {useFirebaseUser} from 'my-customhook-collection'
import moment from "moment";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
const { Title } = Typography;
const { Panel } = Collapse;
const CommentComponent = ({ children,userInfo,CommentContent,Replies,UserOnlineInfo,Creation }) => {
  const {uid,displayName,photoURL}=userInfo;
  const actions = [
    UserOnlineInfo&&(uid===UserOnlineInfo.uid)&&<Tooltip title={"Editar comentario"}>
      <EditFilled />
    </Tooltip>,
    UserOnlineInfo&&(uid===UserOnlineInfo.uid)&&<Tooltip title={"Eliminar comentario"}>
      <DeleteFilled />
    </Tooltip>,
    <span key="comment-basic-reply-to">Responder</span>,
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
      avatar={
        <Avatar
          src={photoURL}
          alt="Han Solo"
        />
      }
      content={
        <p>
          {CommentContent}
        </p>
      }
      datetime={
        <Tooltip title={Creation}>
          <span>{Creation}</span>
        </Tooltip>
      }
    >
      {children&&<Collapse defaultActiveKey={["Replies"]}>
        <Panel header={`Respuestas ${Replies.length}`} key="Replies">
          {children}
        </Panel>
      </Collapse>}

    </Comment>
  );
};

export default CommentComponent;
