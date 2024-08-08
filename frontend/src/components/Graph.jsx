import React from "react"
import { Link } from "react-router-dom";
import "../styles/Graph.css"

function Graph({graph, onDelete}) {
    return (
        <div className="graph-container">
            <p className="graph-name">
                <Link to={`/graphs/${graph.id}/`} state={{ graph }}>{graph.name}</Link>
            </p>
            <p >ID: {graph.id}</p>
            <button className="delete-button" onClick={() => onDelete(graph.id)}>
                Delete
            </button>
        </div>
    );
}

export default Graph