import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({});


  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleSignInGoogle = () => {
    firebase.auth()
      .signInWithPopup(googleProvider)
      .then((result) => {

        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setUser(user);

      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;

      });
  }

  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignInFacebook = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        setUser(user);
        console.log("Fb User", user);

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log("Fb User", errorCode, errorMessage, email, credential);

      });
  }

  const gitProvider = new firebase.auth.GithubAuthProvider();
  const handleSignInGithub = () => {
    firebase
      .auth()
      .signInWithPopup(gitProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setUser(user);
        console.log("GitHub User", user);

      }).catch((error) => {

        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log("GitHub User", errorCode, errorMessage, email, credential);

      });
  }


  return (
    <div className="App">
      <button onClick={handleSignInGoogle}>Sign In Using Google</button>
      <br />
      <button onClick={handleSignInFacebook}>Sign In Using Facebook</button>
      <br />
      <button onClick={handleSignInGithub}>Sign In Using GitHub</button>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <img style={{ width: '50%' }} src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
