import React from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import "../styles/Array.css"; // Ensure this path is correct
import PublicNavBar from "../components/PublicNavBar"
import "../styles/AlgorithmList.css"

function ArrayDetail() {
    const location = useLocation();
    const { array } = location.state || { array: null };

    if (!array) return <div>Array not found</div>;

    return (
        <div>
            <PublicNavBar></PublicNavBar>
            <h2>Array Detail</h2>
            <div className="array-container">
                <p className="array-title">{array.name}</p>
                <p className="array-content">{array.values.join(", ")}</p>
            </div>
            <div className="algorithm-list-container">
                <div className="algorithm-container">
                    <p className="algorithm-name">
                        <Link to={`/array/${array.id}/mergesort`} state={{ array }}>Merge Sort</Link>
                    </p>
                </div>
                <div className="algorithm-container">
                    <p className="algorithm-name">
                    <Link to={`/array/${array.id}/quicksort`} state={{ array }}>Quick Sort</Link>
                    </p>
                </div>
                <div className="algorithm-container">
                    <p className="algorithm-name">
                        Binary Search
                    </p>
                </div>
                <div className="algorithm-container">
                    <p className="algorithm-name">
                        Counting Inversions
                    </p>
                </div>
                <div className="algorithm-container">
                    <p className="algorithm-name">
                        Quickselect
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArrayDetail;
