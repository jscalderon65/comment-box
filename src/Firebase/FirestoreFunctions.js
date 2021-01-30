import { message as Message } from "antd";
import "antd/dist/antd.css";
const { success, error: Error } = Message;
const Month = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const AddComment = (firebase, CommentContent, userInfo) => {
  const CreationDate = new Date();
  const Creation = `A las ${CreationDate.getHours()}:${CreationDate.getMinutes()}, el dia ${CreationDate.getDate()} de ${
    Month[CreationDate.getMonth()]
  } del ${CreationDate.getFullYear()}`;
  let DocumentRef = firebase
    .firestore()
    .collection("CommentsApp")
    .doc(JSON.stringify(new Date()));
  DocumentRef.set({
    Creation,
    CommentContent,
    userInfo,
    Replies: [],
  })
    .then(() => {
      success("Document successfully added!", 5);
    })
    .catch((error) => {
      Error("Error adding document", 3);
    });
};

const DeleteComment = (firebase, DocId) => {
  let DocumentRef = firebase.firestore().collection("CommentsApp").doc(DocId);
  DocumentRef.delete()
    .then(() => {
      success("Document successfully deleted!", 5);
    })
    .catch((error) => {
      Error("Error removing document", 3);
    });
};

const UpdateComment = (firebase, DocId, NewComment) => {
  let DocumentRef = firebase.firestore().collection("CommentsApp").doc(DocId);
  DocumentRef.update({
    CommentContent: NewComment,
  })
    .then(() => {
      success("Document successfully Edit!", 5);
    })
    .catch((error) => {
      Error("Error edit document", 3);
    });
};

const AddReply = (
  firebase,
  DocId,
  ReplyArray,
  Reply,
  userOnlineInfo,
  ReplyTo
) => {
  const { uid, email, displayName, photoURL } = userOnlineInfo;
  const CreationDate = new Date();
  const Creation = `A las ${CreationDate.getHours()}:${CreationDate.getMinutes()}, el dia ${CreationDate.getDate()} de ${
    Month[CreationDate.getMonth()]
  } del ${CreationDate.getFullYear()}`;
  let DocumentRef = firebase.firestore().collection("CommentsApp").doc(DocId);
  DocumentRef.update({
    Replies: [
      ...ReplyArray,
      {
        id: JSON.stringify(new Date()),
        Creation,
        Reply,
        ReplyTo,
        UserInfo: {
          uid,
          email,
          displayName,
          photoURL,
        },
      },
    ],
  })
    .then(() => {
      success("Reply successfully Added!", 5);
    })
    .catch((error) => {
      Error("Error Adding Reply", 3);
    });
};
const DeleteReply = (firebase, DocId, ReplyArray, ReplyId) => {
  let DocumentRef = firebase.firestore().collection("CommentsApp").doc(DocId);
  DocumentRef.update({
    Replies: ReplyArray.filter((reply) => reply.id !== ReplyId),
  })
    .then(() => {
      success("Reply successfully Added!", 5);
    })
    .catch((error) => {
      Error("Error Adding Reply", 3);
    });
};
const UpdateReply = (firebase, DocId, ReplyArray, ReplyId, ReplyUpdate) => {
  let DocumentRef = firebase.firestore().collection("CommentsApp").doc(DocId);
  DocumentRef.update({
    Replies: ReplyArray.map((item) => {
      if (item.id === ReplyId) {
        item.Reply = ReplyUpdate;
      }
      return item;
    }),
  })
    .then(() => {
      success("Reply successfully Added!", 5);
    })
    .catch((error) => {
      Error("Error Adding Reply", 3);
    });
};

export {
  AddComment,
  DeleteComment,
  UpdateComment,
  AddReply,
  DeleteReply,
  UpdateReply,
};
