import { useState } from "react";
import { Link } from "react-router-dom";
import style from './publicMenu.module.css'

export default function PublicMenu({docId, description, title, nameId}){

    return(
        <div>
            <Link to={`/u/${nameId}/${docId}`} className={style.publicMenuContainer}>
                <strong>{title}</strong>
                {/*<p>{description}</p>*/}
            </Link>
        </div>
    )
}