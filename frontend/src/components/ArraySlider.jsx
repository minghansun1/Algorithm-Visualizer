import React, { useState, useEffect } from "react";
import "../styles/ArraySlider.css";

const ArraySlider = ({ max, currentRow, setCurrentRow }) => {
  const [inputValue, setInputValue] = useState(currentRow);

  useEffect(() => {
    setInputValue(currentRow); // Sync input value with currentRow prop changes
  }, [currentRow]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setInputValue(""); // Allow empty state for editing
    } else {
      const numberValue = Number(value);
      if (numberValue >= 0 && numberValue <= max) {
        setInputValue(numberValue);
        setCurrentRow(numberValue);
      }
    }
  };

  const handleBlur = () => {
    if (inputValue === "") {
      setInputValue(currentRow); // Reset to currentRow if input is empty
    }
  };

  return (
    <div>
      <p>
        Current Step: 
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          min="0"
          max={max}
          style={{ width: "40px", marginRight: "10px" }}
        />
        /{max}
      </p>
      <input
        type="range"
        min="0"
        max={max}
        value={currentRow}
        onChange={(e) => {
          setCurrentRow(Number(e.target.value));
          setInputValue(Number(e.target.value)); // Sync input with slider
        }}
        className="slider"
      />
    </div>
  );
};

export default ArraySlider;
