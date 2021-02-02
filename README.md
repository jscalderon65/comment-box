# my-comment-box-app

_my-comment-box-app es una librería de React que permite agregar una sección de comentarios en cualquier proyecto de react que este implementando firebase, los cambios y comentarios nuevos se verán en tiempo real en el componente, también es necesario mencionar que se debe implementar la autenticación de firebase en el proyecto, ya que my-comment-box-app solo permite comentar a usuarios logueados._

## Instalación

```
npm install  my-comment-box-app
```

## Modo de uso
_my-comment-box-app posee dos componentes, el primero 'CommentBoxApp' el cual es aquel que contiene toda la sección de comentarios, recibe dos props, 'CollectionName' string que representa a la colección a la que irán los comentarios en tu proyecto de firebase y la segunda 'firebase' recibe el objeto que inicializa y hace la conexión con el proyecto, el otro componente 'Login' es una pequeña implementación de un login con firebase y Google para probar la sección de comentarios, su uso es opcional._

```js
/*Nombre del componente FirebaseConfig*/
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "########",
  authDomain: "########",
  projectId: "########",
  storageBucket: "########",
  messagingSenderId: "########",
  appId: "########",
  measurementId: "########"
});

export {firebase};
```

```jsx
import {firebase} from './FirebaseConfig'
import {CommentBoxApp,Login} from 'my-comment-box-app'

const App = () => {
    return (
      <>
      <Login firebase={firebase} />
      <CommentBoxApp 
      CollectionName={/*Nombre de la colección en firebase*/} 
      firebase={firebase} />
      </>
    )
}
export default App;
```


## License

MIT © [jscalderon65](https://github.com/jscalderon65)
