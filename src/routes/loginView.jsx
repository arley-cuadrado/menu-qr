import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, userExists } from "../firebase/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
/*import { useEffect } from "react";
import { async } from "@firebase/util";*/

export default function LoginView() {
    const navigate = useNavigate();
    //const [currentUser, setCurrentUser] = useState(null)
    /*
        State
        0: Inicializado
        1: Loading
        2: Login completo
        3: Login pero sin registro
        4: No hay nadie logueado
        5: Ya existe el username
        6: Nuevo username, click para continuar
    */
    const [ state, setCurrentState ] = useState(0);
    
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
        console.log(user.displayName)
        navigate('/choose-username');
    }
    function handleUserNotLoggedIn( user ) {
        setCurrentState(4);
    }
  
        /*if(state === 2 ){
            return <div>Estás autenticado y registrado...</div>
        }

        if(state === 3 ){
            return <div>Estás autenticado pero no registrado...</div>
        }*/

        if ( state === 4 ) {
            return (
                <>
                    <button onClick={ handleOnClick }>Careverga, Sign in with Google here!</button>
                </>
            ) 
        }

        if ( state === 5 ) {
            return (
                <>
                    <button onClick={ handleOnClick }>Careverga, Sign in with Google here!</button>
                </>
            ) 
        }
    
        return ( <AuthProvider 
        
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotRegistered={handleUserNotRegistered}
            onUserNotLoggedIn={handleUserNotLoggedIn}
            
        >
            <div>Loading...</div>
        </AuthProvider>
        );

}