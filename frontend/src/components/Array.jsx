import React from "react"
import { Link } from "react-router-dom";
import "../styles/Array.css"

function Array({array, onDelete}) {
    return (
        <div className="array-container">
            <p className="array-name">
                <Link to={`/array/${array.id}/`} state={{ array }}>{array.name}</Link>
            </p>
            <p className="array-values">{array.values.join(", ")}</p>
            <button className="delete-button" onClick={() => onDelete(array.id)}>
                Delete
            </button>
        </div>
    );
}

export default Array