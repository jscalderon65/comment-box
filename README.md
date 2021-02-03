# my-comment-box-app

## ¿Qué es?
_my-comment-box-app es una librería de React que permite agregar una sección de comentarios en cualquier proyecto de react que este implementando firebase, los cambios y comentarios nuevos se verán en tiempo real en el componente._

## Funcionamiento
_Es necesario mencionar que se debe implementar la autenticación de firebase en el proyecto, ya que my-comment-box-app solo permite comentar a usuarios logueados._

## Estilos
_La librería se construyo usando solo los componentes de Ant Design y las animaciones de animate css, para que estás últimas funcionen es necesario agregar el cdn de animate css, este paso es opcional y no compromete el funcionamiento de la librería._

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>
```

## Instalación

```
npm install  my-comment-box-app
```

## Modo de uso
_my-comment-box-app posee dos componentes:_

## CommentBoxApp 
_contenedor de toda la sección de comentarios, recibe dos props, 'CollectionName' string que representa a la colección a la que irán los comentarios en tu proyecto de firebase y la segunda 'firebase' recibe el objeto que inicializa y hace la conexión con el proyecto._

## Login 
_es una pequeña implementación de un login con firebase y Google para probar la sección de comentarios, su uso es opcional._

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
## [Ejemplo de implementación 👈](https://commentboxtest.netlify.app/)


## License

MIT © [jscalderon65](https://github.com/jscalderon65)
