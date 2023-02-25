import { useState } from "react";
import { Link } from "react-router-dom";

export default function PublicMenu({docId, description, title, nameId}){

    return(
        <div>
            <Link to={`/u/${nameId}/${docId}`}>
                <strong>{title}</strong>
                <p>{description}</p>
            </Link>
        </div>
    )
}