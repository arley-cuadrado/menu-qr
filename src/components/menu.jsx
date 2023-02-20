import { useEffect } from "react";
import { useState, useRef } from "react";

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
        <div key={docId}>
            <div>
                <div>
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
                            <button onClick={handleEditTitle}>Edit</button> 
                            {currentTitle}
                        </>
                    } 
                </div>
                <div> 
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
                            <button onClick={handleEditDescription}>Edit</button> 
                            {currentDescription}
                        </>
                    }
                </div>
            </div>

            <div>
                <button onClick={handleDelete}>Eliminar</button>
            </div>
        </div>
    )
}