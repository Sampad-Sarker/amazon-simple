import React from 'react';
import Auth from './user-auth';

const LogIn = () => {

    const auth =Auth();
    console.log("Auth in login page",auth);
    return (
        <div>
            <h1>This is logIn page</h1>
            <button onClick={auth.signInWithGoogle}>SignIn(with google)</button>
        </div>
    );
};

export default LogIn;