import { Comment, Tooltip, Avatar, Typography } from "antd";
import moment from "moment";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
const { Title } = Typography;
const ReplyComponent = ({ children }) => {
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
        marginTop:"5px",
        padding: "10px",
        borderRadius: "5px",
      }}
      actions={actions}
      author={<Title level={5}>Han Solo</Title>}
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      }
      content={
        
        <p>
          <b>@Han solo</b> We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus iste dolores in nihil aspernatur quaerat at sunt id, qui illo repellat facilis eveniet molestiae commodi aut officia est fugiat culpa.
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus iste dolores in nihil aspernatur quaerat at sunt id, qui illo repellat facilis eveniet molestiae commodi aut officia est fugiat culpa.
        </p>
      }
      datetime={
        <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    >
      {children}
    </Comment>
  );
};

export default ReplyComponent;
