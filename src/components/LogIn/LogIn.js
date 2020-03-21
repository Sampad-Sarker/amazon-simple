import React from 'react';
import Auth from './useAuth';

const LogIn = () => {

    const auth =Auth();
    //console.log("Auth in login page",auth);

    const onClickSignInButton = () => {
        auth.signInWithGoogle()
        .then(res =>{
            //console.log("Redirect now",res);
            window.location.pathname="/order-review";
        })
    }

    const onClickSignOutButton = () =>{
        auth.signOut()
        .then(res =>{

            window.location.pathname="/";
        })
    }
    return (
        <div>
            <h1>This is logIn page</h1>

            {
                auth.user ? <button onClick={onClickSignOutButton}>Sign Out</button> :
                <button onClick={onClickSignInButton}>SignIn(with google)</button>
            }
            
        </div>
    );
};

export default LogIn;