import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { existUsername, getProfilePhotoUrl, getUserPublicProfileInfo } from "../firebase/firebase";
import PublicMenu from "../components/publicMenu";
import style from './publicProfileView.module.css';
import styleMenus from '../components/publicMenu.module.css';

export default function PublicProfileView() {
    const params = useParams();
    const [ profile, setProfile ] = useState(null);
    const [ url, setUrl ] = useState('');
    const [ state, setState ] = useState('');
    const [ nameId, setNameId ] = useState(null);

    
    useEffect(() => {
    getProfile();

    async function getProfile(){
        const username = params.username;
        try{
            const userUid = await existUsername(username);

            if(userUid){
                const userInfo = await getUserPublicProfileInfo(userUid);
                setProfile(userInfo);

                const url = await getProfilePhotoUrl(userInfo.profileInfo.profilePicture);
                setUrl(url);
            }else{
                setState(7);
            }
        }catch(error){

        }     
        profileName(username);   
    }
    }, [params]);

    if(state === 7){
        return <div>
            <h1>Username doesn't exist.</h1>
        </div>
    }

    function profileName(username){
        setNameId(username)
    }

    return (
        <div className={style.profileContainer}>
            <div className={style.profilePicture}>
                <img src={url} alt="user photo" />
            </div>
            <h2>{profile?.profileInfo.username}</h2>
            <h3>{profile?.profileInfo.displayName}</h3>

            <div className={styleMenus.publicMenusContainer}>
                {profile?.menusInfo.map((menu) => (
                    <>
                    {/* menu.docId */}
                        <PublicMenu 
                            docId={menu.docId} 
                            description={menu.description} 
                            title={menu.title} 
                            nameId={nameId}
                        />
                    </>
                ))}
            </div>
        </div>
    )
}