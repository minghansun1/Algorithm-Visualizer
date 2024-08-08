import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PublicNavBar from "../../components/PublicNavBar"
import ArraySlider from "../../components/ArraySlider";

function privateBinarySearch(array, target) {
    const lefts = [];
    const rights = [];
    const middles = [];

    array.sort(function(a, b) {
        return a - b;
    });
    let left = 0;
    let right = array.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        lefts.push(left);
        rights.push(right);
        middles.push(mid);
        if (array[mid] === target) {
            lefts.push(mid);
            rights.push(mid);
            middles.push(mid);
            return { index: mid, lefts, rights, middles };;
        } else if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return { index: -1, lefts, rights, middles }; 
}

function BinarySearch(){
    const location = useLocation();
    const { array } = location.state || { array: null };
    const [result, setResult] = useState([]);
    const [lefts, setLefts] = useState([]);
    const [rights, setRights] = useState([]);
    const [middles, setMiddles] = useState([]);
    const [target, setTarget] = useState("");
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (array) {
            getBinarySearchArray();
        }
    }, []);

    const handleTargetChange = (e) => {
        setTarget(e.target.value);
    };

    const handleSubmit = (e) => {
        setCurrentStep(0);
        e.preventDefault();
        getBinarySearchArray();
    };
    
    const getBinarySearchArray = () => {
        console.log(array);
        console.log(target);
        const { index, lefts, rights, middles } = privateBinarySearch(array.values, parseInt(target));
        setResult(index);
        setLefts(lefts);
        setRights(rights);
        setMiddles(middles);
        console.log(index);
        console.log(lefts);
        console.log(rights);
        console.log(middles);
    };

    return (
        <div>
            <PublicNavBar />
            <div className="container">
                <div className="left-section">
                    <h1>Binary Search</h1>
                    <p>
                        Binary Search Algorithm is a searching algorithm used in a sorted array by repeatedly dividing the search interval in half. The idea of binary search is to use the information that the array is sorted and reduce the time complexity to O(log N). 
                    </p>
                </div>
                <div className="right-section">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Target:
                            <input type="number" value={target} onChange={handleTargetChange} />
                        </label>
                        <button type="submit">Search</button>
                    </form>
                    <div className="slider-section">
                        <ArraySlider
                            max={lefts.length-1}
                            currentRow={currentStep}
                            setCurrentRow={setCurrentStep}
                        />
                    </div>
                    <div className="array-section">
                        {result !== null && result !== -1 && lefts.length>0 ? (
                            <div>
                                <p>Target found at index: {result}</p>
                                <table>
                                    <tbody>
                                        <tr>
                                        <th>Array</th>
                                        {array.values.map((cell, cellIndex) => {
                                                let cellColor = 'black';
                                                if (lefts[currentStep] > cellIndex || rights[currentStep] < cellIndex) {
                                                    cellColor = 'red';
                                                }
                                                if (lefts[currentStep]==rights[currentStep] && cellIndex == result){
                                                    cellColor = 'green';
                                                }
                                                return (
                                                    <td key={cellIndex} style={{ color: cellColor }}>
                                                        {cell}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                        <tr>
                                            <th>Midpoint</th>
                                            {array.values.map((_, cellIndex) => (
                                                <td key={cellIndex} style={{ textAlign: 'center' }}>
                                                    {cellIndex === middles[currentStep] ? '↑' : ''}
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>Target not found in the array</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default BinarySearch