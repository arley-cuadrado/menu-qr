import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { existUsername, getProfilePhotoUrl, getUserPublicProfileInfo } from "../firebase/firebase";
import PublicMenu from "../components/publicMenu";

export default function PublicProfileView() {
    const params = useParams();
    const [ profile, setProfile ] = useState(null);
    const [ url, setUrl ] = useState('');
    const [ state, setState ] = useState('');

    
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
    }
    }, [params]);

    if(state === 7){
        return <div>
            <h1>Username doesn't exist.</h1>
        </div>
    }

    return (
        <div>
            <div>
                <img src={url} alt="" />
            </div>
            <h2>{profile?.profileInfo.username}</h2>
            <h3>{profile?.profileInfo.displayName}</h3>
            <div>
                
                {profile?.menusInfo.map((menu) => (
                    <PublicMenu key={menu.docId} description={menu.description} title={menu.title}></PublicMenu>
                ))}
            </div>
        </div>
    )
}