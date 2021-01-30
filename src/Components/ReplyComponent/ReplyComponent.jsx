import { Comment, Tooltip, Image, Typography } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
const { Title } = Typography;
const ReplyComponent = ({ children, Creation, Reply, ReplyTo,UserInfo
}) => {
  const {displayName,photoURL}=UserInfo
  const actions = [
    <Tooltip title={"Editar comentario"}>
      <EditFilled />
    </Tooltip>,
    <Tooltip title={"Eliminar comentario"}>
      <DeleteFilled />
    </Tooltip>,
    <span key="comment-basic-reply-to">Responder</span>,
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
      avatar={
        <Image
          src={photoURL}
          alt={displayName}
        />
      }
      content={
        <p>
          <b>@{ReplyTo}</b> {Reply}
        </p>
      }
      datetime={
        <Tooltip title={Creation}>
          <span>{Creation}</span>
        </Tooltip>
      }
    >
      {children}
    </Comment>
  );
};

export default ReplyComponent;
