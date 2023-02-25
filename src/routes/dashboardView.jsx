import AuthProvider from "../components/authProvider";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardWrapper from "../components/dashboardWrapper";
import { v4 as uuidv4 } from 'uuid';
import { deleteMenu, getMenus, insertNewMenu, updateMenu } from "../firebase/firebase";
import Menu from '../components/menu';
import style from './dashboardView.module.css';
import styleMenus from '../components/menu.module.css';

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
        addMenu();
    }

    function addMenu(){
        if(title !== '' && description !== ''){
            const newMenu = {
                id: uuidv4(),
                title: title,
                description: description,
                uid: currentUser.uid,
            };
            const res = insertNewMenu(newMenu);
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

    async function handleDeleteMenu(docId){
        await deleteMenu(docId);
        const tmp = menus.filter((menu) => menu.docId != docId);
        setMenus([ ... tmp ]);
    }

    async function handleUpdateMenu(docId, title, description){
        const menu = menus.find(item => item.docId === docId);
        //console.log(menu, docId, title, description);
        menu.title = title;
        menu.description = description;
        await updateMenu(docId, menu);
        
    }

    return (
        <DashboardWrapper>
            <div>
                <h1>Dashboard</h1>

                <form 
                    className={style.entryContainer} 
                    action="" 
                    onSubmit={handleOnSubmit}
                >
                    <label htmlFor="title">Título</label>
                    <input 
                        className="input" 
                        type="text" 
                        name="title" 
                        onChange={handleOnChange} 
                    />

                    <label htmlFor="title">Descripción</label>
                    <input 
                        className="input" 
                        type="text" 
                        name="description"  
                        onChange={handleOnChange} 
                    />

                    <input
                        className="btn" 
                        type="submit" 
                        value="Crear nuevo menú" 
                    />
                </form>

                <div className={styleMenus.menusContainer}>
                    {
                        menus.map((menu) => (
                            <Menu
                                key={menu.docId} 
                                docId={menu.docId}
                                description={menu.description} 
                                title={menu.title} 
                                onDelete={handleDeleteMenu} 
                                onUpdate={handleUpdateMenu} 
                            />
                            /*<div key={menu.id}>
                                {menu.title} - {menu.description}
                            </div>*/
                        ))
                    }
                </div>
            </div>
        </DashboardWrapper>
    )
    

    
}