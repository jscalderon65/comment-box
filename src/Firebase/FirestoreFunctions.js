const AddComment = (firebase, CommentContent, userInfo) => {
  const CreationDate = new Date();
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
  });
};
export { AddComment };
