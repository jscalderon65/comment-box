import React from "react";
import {
  useFirebaseUser,
  useOnSnapshotCollection,
} from "my-customhook-collection";
import { firebase } from "../../Firebase/FirebaseConfig";
import { googleAuth, logout } from "../../Firebase/FirebaseAuth";
import { CommentComponent, AddCommentComponent } from "../index";
import { BackTop, Image, Button } from "antd";
import "antd/dist/antd.css";
const CommentBoxContainer = () => {
  const db = firebase.firestore();
  const refColl = db.collection("CommentsApp");
  const [comments] = useOnSnapshotCollection(refColl);
  const [UserInfo] = useFirebaseUser(firebase);
  comments && console.log(comments);
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      {UserInfo?(
        <>
          <Image
            style={{ borderRadius: "100%" }}
            width={200}
            src={UserInfo.photoURL}
          />
          <Button onClick={logout}>Salir</Button>
        </>
      ):  
      <Button onClick={googleAuth}>Ingresar</Button>
      }
      
      {UserInfo && (
        <AddCommentComponent FirebaseApp={firebase} UserInfo={UserInfo} />
      )}
      {comments &&
        comments.map((comment) => (
          <CommentComponent FirebaseApp={firebase} key={comment.id} {...comment} UserOnlineInfo={UserInfo}/>
        ))}
      <BackTop />
    </div>
  );
};

export default CommentBoxContainer;
