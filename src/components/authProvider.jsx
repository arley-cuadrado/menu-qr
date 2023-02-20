import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth, getUserInfo, registerNewUser } from "../firebase/firebase";
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
                //debugger;
                const isRegistered = await userExists( user.uid )
                if( isRegistered ) {
                    const userInfo = await getUserInfo(user.uid)
                    if(userInfo.proccessCompleted){
                        onUserLoggedIn(userInfo)
                    }else{
                        onUserNotRegistered(userInfo);
                    }
                } else {
                    await registerNewUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        profilePicture: '',
                        username: '',
                        proccessCompleted: false
                    });
                    onUserNotRegistered(user);
                }
            } else {
                onUserNotLoggedIn();
            }
        });
    },[ navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered, ])

    return <div> {children} </div>;
}