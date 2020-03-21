import React, { useContext, useEffect } from 'react';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState, createContext } from "react";
import { Route, Redirect } from 'react-router-dom';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();  

export const AuthContextProvider = props => {  //main AuthContext.Provides dynamic value and children at a same time 

    const auth =Auth();
    return <AuthContext.Provider value ={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);  //custom hook

const getUserInfo =userObject => {
    const {displayName,email,photoURL} = userObject; //destructuring
    return {name:displayName,email,photo:photoURL};
}


// export const PrivateRoute =({ children, ...rest })=> {
    
//     const auth = useAuth();
//     return (
//       <Route
//         {...rest}
//         render={({ location }) =>
//           auth.user ? (
//             children
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: { from: location }
//               }}
//             />
//           )
//         }
//       />
//     );
//   }


const Auth = () => {

    const[user, setUser] = useState(null); //user state

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
        .then(res => {
            // const {displayName,email,photoURL} = res.user; //destructuring
            // const signInUser = {name:displayName,email,photo:photoURL};
            const signInUser = getUserInfo(res.user);
            setUser(signInUser);
            
            //console.log(res);
            return res.user;
        })
        .catch(err => {
            setUser(null);
            console.log(err);
            return err.message;
        })

        
    }

    const signOut = () => {

        return firebase.auth().signOut()
        .then(() => {
            // Sign-out successful.
            setUser(null);

          })
        .catch(error => {
            // An error happened.
            console.log(error);
          });
    }


    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(userInfo) {
            if (userInfo) {
              // User is signed in.
              const currentUser = getUserInfo(userInfo);
              setUser(currentUser);
            } else {
              // No user is signed in.
            }
          });
    },[])



    return {
        user,
        signInWithGoogle,
        signOut
    }

}

export default Auth;