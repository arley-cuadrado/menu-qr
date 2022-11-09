import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase/firebase";
import { userExists } from "../firebase/firebase";

import { useNavigate } from "react-router-dom";

export default function AuthProvider( {
    children, 
    onUserLoggedIn, 
    onUserNotLoggedIn,
    onUserNotRegistered,
} ) {
    const navigate = useNavigate();

    useEffect(() => {
        //setCurrentState(1);
        onAuthStateChanged(auth, async(user) => {
            if(user){
                const isRegistered = await userExists( user.uid )
                if( isRegistered ) {
                    // TODO Redirect to Dashboard
                    onUserLoggedIn(user)
                } else {
                    // TODO Redirect to Choose username
                    onUserNotRegistered(user)
                }
                //console.log( user.displayName );
            } else {
                onUserNotLoggedIn(user)
            }
        });
    },[ navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered, ])

    return <div> {children} </div>;
}