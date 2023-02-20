import AuthProvider from "../components/authProvider";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardWrapper from "../components/dashboardWrapper";
import { v4 as uuidv4 } from 'uuid';
import { getMenus, insertNewLink } from "../firebase/firebase"

export default function DashboardView() {
    const navigate = useNavigate();
    const [ state, setState ] = useState(0);
    const [ currentUser, setCurrentUser ] = useState({});
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ menus, setMenus ] = useState([]);

    async function handleUserLoggedIn( user ) {
        setCurrentUser(user);
        setState(2);
        const resMenus = await getMenus(user.uid);
        setMenus([ ...resMenus ])
    }
    function handleUserNotRegistered( user ) {
        navigate('/login');
    }
    function handleUserNotLoggedIn( user ) {
        navigate('/login');
    }

    if(state === 0){
        return <AuthProvider 
                onUserLoggedIn={handleUserLoggedIn}
                onUserNotRegistered={handleUserNotRegistered}
                onUserNotLoggedIn={handleUserNotLoggedIn}
            >Loading...</AuthProvider>
    }

    function handleOnSubmit(e){
        e.preventDefault();
        addLink();
    }

    function addLink(){
        if(title != '' && description != ''){
            const newMenu = {
                id: uuidv4(),
                title: title,
                description: description,
                uid: currentUser.uid,
            };
            const res = insertNewLink(newMenu);
            newMenu.docId = res.id;
            setTitle('');
            setDescription('');
            setMenus([ ... menus, newMenu ]);
        }
    }

    function handleOnChange(e){
        const value = e.target.value;
        if(e.target.name === 'title'){
            setTitle(value)
        }
        if(e.target.name === 'description'){
            setDescription(value)
        }
    }

    return (
        <DashboardWrapper>
            <div>
                <h1>Dashboard</h1>

                <form action="" onSubmit={handleOnSubmit}>
                    <label htmlFor="title">Título</label>
                    <input type="text" name="title" onChange={handleOnChange} />

                    <label htmlFor="title">Descripción</label>
                    <input type="text" name="description"  onChange={handleOnChange} />

                    <input type="submit" value="Crear nuevo menú" />
                </form>

                <div>
                    {
                        menus.map((menu) => (
                            <div key={menu.id}>
                                {menu.title} - {menu.description}
                            </div>
                        ))
                    }
                </div>
            </div>
        </DashboardWrapper>
    )
    

    
}