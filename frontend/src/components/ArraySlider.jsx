import React from "react";
import "../styles/ArraySlider.css";

const ArraySlider = ({ max, currentRow, setCurrentRow }) => {
    return (
        <div>
            <p>Current Step: {currentRow}</p>
            <input
                type="range"
                min="0"
                max={max}
                value={currentRow}
                onChange={(e) => setCurrentRow(Number(e.target.value))}
                className="slider"
            />
        </div>
    );
};

export default ArraySlider;
