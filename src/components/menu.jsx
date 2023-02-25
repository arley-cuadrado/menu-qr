import { useEffect } from "react";
import { useState, useRef } from "react";
import style from './menu.module.css'

export default function Menu({ docId, title, description, onDelete, onUpdate }){

    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentDescription, setCurrentDescription] = useState(description);

    const [editTitle, setEditTitle] = useState(false);
    const [editDescription, setEditDescription] = useState(false);

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    useEffect(() => {
        if(titleRef.current){
            titleRef.current.focus();
        } 
    },[editTitle]);
    useEffect(() => {
        if(descriptionRef.current){
            descriptionRef.current.focus();
        }
    },[editDescription])

    function handleEditTitle(){
        setEditTitle(true);
    }

    function handleEditDescription(){
        setEditDescription(true);
    }

    function handleChangeTitle(e){
        setCurrentTitle(e.target.value);
    }

    function handleChangeDescription(e){
        setCurrentDescription(e.target.value)
    }

    function handleBlurTitle(e){
        setEditTitle(false)
        onUpdate(docId, currentTitle, currentDescription);
    } 

    function handleBlurDescription(e){
        setEditDescription(false)
        onUpdate(docId, currentTitle, currentDescription);
    }

    function handleDelete(){
        onDelete(docId);
    }

    return (
        <div className={style.menu}> {/* key={docId} */}
            <div className={style.menuInfo}>
                <div className={style.menuTitle}>
                    {   editTitle 
                        ? 
                        <>
                            <input 
                                ref={titleRef} 
                                value={currentTitle} 
                                onChange={handleChangeTitle} 
                                onBlur={handleBlurTitle}
                            />
                        </> 
                        : 
                        <>
                            <button className={style.btnEdit} onClick={handleEditTitle}>
                                <span className="material-icons">edit</span>
                            </button> 
                            {currentTitle}
                        </>
                    } 
                </div>
                <div className={style.menuDescription}> 
                    {
                        editDescription
                        ? 
                        <>
                            <input 
                                ref={descriptionRef} 
                                value={currentDescription} 
                                onChange={handleChangeDescription}
                                onBlur={handleBlurDescription}
                            />
                        </>
                        :
                        <>
                            <button className={style.btnEdit} onClick={handleEditDescription}>
                                <span className="material-icons">edit</span>
                            </button> 
                            {currentDescription}
                        </>
                    }
                </div>
            </div>

            <div className={style.menuActions}>
                <button className={style.btnDelete} onClick={handleDelete}>
                    <span className="material-icons">delete</span>
                </button>
            </div>
        </div>
    )
}