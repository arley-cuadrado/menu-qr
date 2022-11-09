import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
//import { useEffect, useId } from "react";
import { auth } from "../firebase/firebase";
import { useState } from "react";
//import { userExists } from "../firebase/firebase";

import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";

export default function LoginView() {
   const navigate = useNavigate();
   //const [ currentUser, setCurrentUser ] = useState(null);
   /*
    State:
    0: Initialized
    1: Loading
    2: Full login
    3: Logged but not registered
    4: No one is logged in
   */ 
    const [ state, setCurrentState ] = useState(0);

    /*
    useEffect(() => {
        setCurrentState(1);
        onAuthStateChanged(auth, async(user) => {
            if(user){
                const isRegistered = await userExists( user.uid )
                if( isRegistered ) {
                    // TODO Redirect to Dashboard
                    navigate('/dashboard');
                    setCurrentState(2);
                } else {
                    // TODO Redirect to Choose username
                    navigate('/choose-username');
                    setCurrentState(3);
                }
                //console.log( user.displayName );
            } else {
                setCurrentState(4);
                console.log("Nobody authenticated")
            }
        });
    },[ navigate ])
    */

    async function handleOnClick() {
        const googleProvider = new GoogleAuthProvider();
        await signInWithGoogle(googleProvider)

        async function signInWithGoogle(googleProvider) {
            try {
                const res = await signInWithPopup( auth, googleProvider );
                console.log(res);
            } catch (error) {
                console.error(error);
            }
        }
    }

    function handleUserLoggedIn( user ) {
        navigate('/dashboard');
    }
    function handleUserNotRegistered( user ) {
        navigate('/choose-username');
    }
    function handleUserNotLoggedIn( user ) {
        setCurrentState(4);
    }
    /*
    if ( state === 2 ) {
        return <div> Estás autenticado y registrado... </div>
    }

    if ( state === 3 ) {
        return <div> Estás autenticado pero no registrado... </div>
    }
    */

    if ( state === 4 ) {
        return (
            <>
                <button onClick={ handleOnClick }>Login with Google</button>
            </>
        ) 
    }
        
    return <AuthProvider 
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
        onUserNotLoggedIn={handleUserNotLoggedIn}
    >
        <div>Loading...</div>
    </AuthProvider>

}